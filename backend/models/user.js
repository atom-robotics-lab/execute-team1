const mongoose = require('mongoose');
const { createHmac,randomBytes } = require('node:crypto');
const { generateToken } = require('../services/authentication');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  salt:{
    type:String,

  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  }
}, { timestamps: true });

userSchema.pre("save", function(next){
  const user=this;
  if(!user.isModified("password")) return;
  
  const secret = randomBytes(16).toString();


  const hashpassword = createHmac('sha256', secret)
                 .update(user.password)
                 .digest('hex');
  user.salt=secret
  user.password=hashpassword
  
  next()
})

userSchema.static("matchpassword",async function (email,password){
  const user = await this.findOne({email})
  
  
  if(!user)throw new Error('USER NOT FOUND  INVALID EMAIL')
  const salt=user.salt
  const hashpassword=user.password
  
  const userProvidedpassword=createHmac('sha256', salt).update(password).digest('hex');
  
  if(hashpassword !==userProvidedpassword) throw new Error('Invalid password')
  

  const token=generateToken(user) 
  console.log(token)
  return token
})

const User=mongoose.model('User', userSchema);

module.exports = User