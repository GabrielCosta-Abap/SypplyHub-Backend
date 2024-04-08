const loginPersistence = require('../persistencia/user_persistencia.js') 

module.exports = {
    
    login: async (user)=>{
        try {
            console.log('chegou no negócio')

            return await loginPersistence.login(user);
          
          } catch (error) {

            throw new Error('Erro: ' + error.message);
          
        }
    }

}