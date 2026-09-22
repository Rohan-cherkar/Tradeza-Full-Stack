const {model} =require("mongoose")
const {holdingSchema}=require("../schema/holdingSchema")

const holdingModel=new model("Holding",holdingSchema)

module.exports={holdingModel}