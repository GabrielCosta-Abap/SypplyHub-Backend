const materialPersistence = require('../persistencia/material_persistencia.js') 

module.exports = {
    
    salvar_material: async (material)=>{

        if (!material.name
        ||  !material.quantity
        ||  !material.um
        ||  !material.price) {
            throw new Error('Todos os campos são obrigatórios!');
        }
        
        if (material.quantity <= 0) {
            throw new Error('Quantidade deve ser positiva!');
        }

        if (material.quantity <= 0) {
            throw new Error('Preço deve ser positiva!');
        }

        try {
	  
            return await materialPersistence.salvar_material(material);
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

    deletar_material: async (id)=>{

        if (!id) {
            throw new Error('Nenhum ID selecionado para a deleção!');
        }
        
        try {
	  
            await materialPersistence.deletar_material(id);
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

    listar_materiais: async ()=>{
        
        try {
	  
            return await materialPersistence.listar_materiais();
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

}