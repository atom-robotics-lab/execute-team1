const { Router } = require("express");

const router=Router()

router.get("/review",(req,res)=>{
  res.send("review")
})

module.exports = router;