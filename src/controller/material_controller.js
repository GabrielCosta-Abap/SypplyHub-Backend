const materialNegocio = require('../negocio/material_negocio.js') 

module.exports = {
    
    salvar_material: async (req, res) =>{
    
        let material = null

        try {
            
            material = await materialNegocio.salvar_material(req.body)
            
            if (material) {
                res.status(200).json(material)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

    listar_materiais: async (req, res) =>{
    
        let materiais = null

        try {
            
            materiais = await materialNegocio.listar_materiais()
            
            if (materiais) {
                res.status(200).json(materiais)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },
   
    deletar_material: async (req, res) =>{
    
        let id = req.params.id
        
        try {
            console.log()
            await materialNegocio.deletar_material(id)
            
            if (id) {
                res.status(200).json(id)
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    },

}