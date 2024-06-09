const comprasPersistence = require('../persistencia/compras_persistencia.js') 

module.exports = {
    
    lista_compras: async ()=>{
        
        try {
	  
            return await comprasPersistence.lista_compras();
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

}