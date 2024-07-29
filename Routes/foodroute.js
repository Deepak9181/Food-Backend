const express = require("express");
const router = express.Router();

router.route('/').post((req,res)=>{
    try{
        res.send({
            data:[global.food_Items,global.food_Category]
        })
    }
    catch(err){
        res.send(err);
    }
})

module.exports =router;