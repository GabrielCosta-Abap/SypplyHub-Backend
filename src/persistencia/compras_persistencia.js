const { pool } = require('../conexao.js')

module.exports = {

    lista_compras: async ()=>{

        const client = await pool.connect();
        let query = ''

        try {
            
            query = `SELECT * FROM materials WHERE materials.quantity < materials.neededquantity`
            const result = await client.query(query);
            
            console.log('passou da query')
            console.log(result.rows)
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Nenhum material encontrado!')
            }

        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }

    },

}