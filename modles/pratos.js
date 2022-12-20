const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pratosSchema = new Schema({
    Nome_Prato: {
        type: String,
        uniqueitem:true,
        required:true
      },
      Preco: {
        type: Number
      },
      Regime: {
        type: String
      },
      Ingredientes: {
        type: Array
      }
    
},{
    "timestamps":true
});

module.exports = mongoose.model("menu_do_dia",pratosSchema,"menu_do_dia")