var express = require('express');
var router = express.Router();
const pratos = require ("../modles/pratos");

router.get("/", (req, res) => {
    pratos.find().then(result => {
        if(result!=null){
            return res.send(result)
        }else{

        }
        
        })
    })

router.get(':id', (req, res) => {
    Pratos.find({"Nome_do_prato":req.params.id })
    .then(result => {
        res.send(result)
        })
        .catch(error => console.error(error))
        
})

router.post("/", (req, res) => {
    let nome = req.body.Nome_do_prato;     
    let preco = req.body.Preco;    
    let regime = req.body.Regime;    
    let ingredientes = req.body.Ingredientes; 
    let novo_prato = {     
    "Nome_do_prato":nome,    
    "Preco":preco,      
    "Regime":regime,      
    "Ingredientes": ingredientes   
    } 
    Pratos.insertOne(novo_prato)
    .then(result => {
        res.status(200).send("Novo prato adicionado");
    })
    .catch(error => console.error(error))
    
})


router.put("/:id",(req,res)=>{
    let novos_valores = req.body
    Pratos.findOneAndUpdate(
        { "Nome_do_prato":req.params.id},
        {
          $set: {
            novos_valores
          }
        },
        {
            upsert: false
        }
      )
        .then(result => {res.status(200).send("Prato atualizado");})
        .catch(error => console.error(error))
})

router.delete("/:id",(req,res)=>{
    Pratos.deleteOne(
        { "Nome_do_prato":req.params.id},
      )
        .then(result => {res.status(200).send("Prato eliminado")})
        .catch(error => console.error(error))
})

router.delete("/",(req,res)=>{
    Pratos.deleteMany({})
        
   
})


module.exports = router;
