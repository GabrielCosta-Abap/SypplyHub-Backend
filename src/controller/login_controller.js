const loginNegocio = require('../negocio/login_negocio.js') 

module.exports = {
    
    login: async (req, res) =>{
    
        let user = null
        const { email, password } = req.body
    
        try {
            user = await loginNegocio.login({email: email, password: password})
            
            if (user) {
                res.status(200).json(user)
                // res.status(200).json([{id: '1', name: 'gabriel', email: 'oie', password:'123'}])
            }
        
        } catch (error) {
            res.status(401).send(error.message);
        }
    
    }

}