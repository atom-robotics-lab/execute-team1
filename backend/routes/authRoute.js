const { Router } = require("express");
const User=require("../models/user")
const router=Router()



router.post("/signup", async (req,res)=>{
console.log("Received Request Body:", req.body);
  const {name,email,password}=req.body
  console.log(name,email,password)

  await User.create({
   name:name,
   email:email,
   password:password,

  })
  res.send("bhejdia")
})



router.post("/login",async (req,res)=>{
const {email,password}=req.body

const user= await User.matchpassword(email,password)
res.cookie("token", user, {
 httpOnly: true, // Prevents client-side access
 secure: false,  // Set `true` in production with HTTPS
 sameSite: "Lax",
});

return res.json("send hogya")
})

module.exports = router;