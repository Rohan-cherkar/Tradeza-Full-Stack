const {model}= require("mongoose")
const { positionsSchema } = require("../schema/positionsSchema")

const positionsModel=new model("Position",positionsSchema)

module.exports={positionsModel}