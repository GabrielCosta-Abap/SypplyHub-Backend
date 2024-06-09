const produtoNegocio = require('../negocio/produto_negocio.js') 

module.exports = {
    
    salvar_produto: async (req, res) =>{
    
        let produto = null

        try {

            produto = await produtoNegocio.salvar_produto(req.body)
            
            if (produto) {
                res.status(200).json(produto)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

    listar_produtos: async (req, res) =>{
    
        let produtos = null

        try {
            
            produtos = await produtoNegocio.listar_produtos()
            
            if (produtos) {
                res.status(200).json(produtos)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },
   
    deletar_produto: async (req, res) =>{
    
        let id = req.params.id
        
        try {
            await produtoNegocio.deletar_produto(id)
            
            if (id) {
                res.status(200).json(id)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

}