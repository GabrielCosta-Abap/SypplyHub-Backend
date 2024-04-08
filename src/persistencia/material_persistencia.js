const { pool } = require('../conexao.js')

module.exports = {

    salvar_material: async (material) => {
        const client = await pool.connect();
        let query = ''
        let values = [material.name, material.quantity, material.um, material.price, material.id]
        try {
            
            if (material.id) {
                query = `UPDATE materials SET name=$1, quantity=$2, um=$3, price=$4 WHERE id = $5 RETURNING *`
            }else{
                query = `INSERT INTO materials (name,quantity,um,price) VALUES ($1, $2, $3, $4) RETURNING *`
                values.pop(4)
            }

            const result = await client.query(query, values);
            
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Erro ao salvar dados!')
            }

            client.release();
            
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }
    },

    deletar_material: async (id)=>{

        const client = await pool.connect();
        let query = ''

        try {
            
            query = `DELETE FROM materials WHERE id=$1 RETURNING *`
            const result = await client.query(query, [id]);
            
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Erro ao deletar material!')
            }

            client.release();
            
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }

    },

    listar_materiais: async ()=>{

        const client = await pool.connect();
        let query = ''

        try {
            
            query = `SELECT * FROM materials`
            const result = await client.query(query);
            
            console.log('passou da query')
            console.log(result)
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Nenhum material encontrado!')
            }

            client.release();
            
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }

    },

}