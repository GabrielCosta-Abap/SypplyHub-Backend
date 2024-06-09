const vendaPersistence = require('../persistencia/venda_persistencia.js') 

module.exports = {
    
    registrar_venda: async (dados)=>{

        try {
	  
            return await vendaPersistence.registrar_venda(dados);
          
        } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

}