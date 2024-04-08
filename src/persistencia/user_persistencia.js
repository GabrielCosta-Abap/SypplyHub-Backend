const { pool } = require('../conexao.js')

module.exports = {

    login: async (user) => {

        console.log('entrou na função pelo menos')
        const client = await pool.connect();
        console.log('chegou na persistencia')
        try {
            
            const query = `SELECT * FROM users WHERE email = $1 AND password = $2`
            console.log(query)
            const result = await client.query(query, [user.email, user.password]);
            
            console.log(user.email, user.password)
            console.log(result.rows)
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Credenciais inválidas!')
            }

            // client.release();
            
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
          }

    }

}