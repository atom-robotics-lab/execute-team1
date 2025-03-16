const { Router } = require("express");
const Product = require('../models/product'); 
const Review = require("../models/review");

const router=Router()

router.get("/review",(req,res)=>{
  res.send("review")
})

router.post("/add-review", async (req, res) => {
  try {
    const { product, user, rating, comment } = req.body;

    const review = await Review.create({
      product,
      user,
      rating,
      comment,

    });

    
    const productDoc = await Product.findById(product);
    if (productDoc) {
      productDoc.numReviews += 1;
      productDoc.averageRating =
        (productDoc.averageRating * (productDoc.numReviews - 1) + rating) /
        productDoc.numReviews;
      await productDoc.save();
    }

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
});

module.exports = router;