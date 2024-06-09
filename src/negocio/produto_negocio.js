const produtoPersistence = require('../persistencia/produto_persistencia.js') 

module.exports = {
    
    salvar_produto: async (produto)=>{

        if (!produto.description) {
            throw new Error('Informar a descrição é obrigatório!');
        }
        
        // if (material.quantity <= 0) {
        //     throw new Error('Quantidade deve ser positiva!');
        // }

        // if (material.quantity <= 0) {
        //     throw new Error('Preço deve ser positiva!');
        // }

        try {
	  
            return await produtoPersistence.salvar_produto(produto);
          
        } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

    deletar_produto: async (id)=>{

        if (!id) {
            throw new Error('Nenhum ID selecionado para a deleção!');
        }
        
        try {
	  
            await produtoPersistence.deletar_produto(id);
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

    listar_produtos: async ()=>{
        
        try {
	  
            return await produtoPersistence.listar_produtos();
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    },

}