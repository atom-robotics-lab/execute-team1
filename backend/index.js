const express = require('express')
const reviewRouter=require("./routes/review")
const authRouter=require("./routes/authRoute")
const productRouter=require("./routes/product")
const connectDB = require("./connect");

const app = express()
const port = 3000



const url = "mongodb://127.0.0.1:27017/execute";
connectDB(url);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/review",reviewRouter)
app.use("/auth",authRouter)
app.use("/product",productRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`the link is http://localhost:3000/`)
})