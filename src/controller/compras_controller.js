const comprasNegocio = require('../negocio/compras_negocio.js') 

module.exports = {

    lista_compras: async (req, res) =>{
    
        let materiais = null

        try {
            
            materiais = await comprasNegocio.lista_compras()
            
            if (materiais) {
                res.status(200).json(materiais)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

}