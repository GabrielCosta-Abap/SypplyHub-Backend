const vendaNegocio = require('../negocio/venda_negocio.js') 

module.exports = {
    
    registrar_venda: async (req, res) =>{
    
        let venda = null

        try {

            venda = await vendaNegocio.registrar_venda(req.body)
            
            if (venda) {
                res.status(200).json(venda)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

}