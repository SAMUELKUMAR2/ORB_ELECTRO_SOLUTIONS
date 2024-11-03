const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ItemDetailsSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemCategory:{
    type:String,
  },
  price: {
    type:Number,
  },
  discount:{
    type:Number,
  },
  netPrice:{
    type:Number,
  },
  description:{
    type:String,
  },

  productImage: {
    url: String,
    filename: String,
  },

  imagePath:{
    type:String,
    
  }
})
const ItemDetails =mongoose.model("ItemDetails",ItemDetailsSchema);

module.exports = ItemDetails;

