const { Router } = require("express");

const router=Router()

router.get("/product",(req,res)=>{
  res.send("product")
})

module.exports = router;