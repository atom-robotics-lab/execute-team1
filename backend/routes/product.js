const { Router } = require("express");
const Product = require('../models/product'); 
const router=Router()

router.get("/view/:id",async (req,res)=>{
  const {id}=req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
  res.send("product")
})

router.get("/all-product",async(req,res)=>{
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
})

router.post("/post",async (req,res)=>{
  const {name,description, imageUrl,category,stock,averageRating,numReviews,price}=req.body
  await Product.create({
    name:name,
    description:description, 
    imageUrl:imageUrl,
    category:category,
    stock:stock,
    averageRating:averageRating,
    numReviews:numReviews,
    price:price
  })
  res.send("product saved")
})
module.exports = router;



