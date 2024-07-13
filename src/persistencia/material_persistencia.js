const { pool } = require('../conexao.js')

module.exports = {

    salvar_material: async (material) => {
        const client = await pool.connect();
        let query = ''
        let values = [material.name, material.quantity, material.um, material.price, material.neededQuantity, material.id]
        try {
            
            if (material.id) {
                query = `UPDATE materials SET name=$1, quantity=$2, um=$3, price=$4, neededquantity=$5 WHERE id = $6 RETURNING *`
            }else{
                query = `INSERT INTO materials (name,quantity,um,price, neededquantity) VALUES ($1, $2, $3, $4, $5) RETURNING *`
                values.pop(5)
            }

            const result = await client.query(query, values);
            
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Erro ao salvar dados!')
            }

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
            
            console.log('chegou na query')
            query = `DELETE FROM materials WHERE id=$1 RETURNING *`
            const result = await client.query(query, [id]);
            console.log('passou da query')
            
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

    atualiza_materiais: async (materiais) => {
        const client = await pool.connect();
        try {
            // Inicia uma transação
            await client.query('BEGIN');
            const results = [];
    
            for (const material of materiais) {
                let query = '';
                let values = [material.name, material.quantity, material.um, material.price, material.neededquantity, material.id];

                query = `UPDATE materials SET name=$1, quantity=$2, um=$3, price=$4, neededquantity=$5 WHERE id=$6 RETURNING *`;
    
                const result = await client.query(query, values);
                if (result.rows.length > 0) {
                    results.push(result.rows[0]);
                } else {
                    throw new Error('Erro ao salvar dados!');
                }
            }
    
            // Confirma a transação
            await client.query('COMMIT');
            return results;
    
        } catch (error) {
            // Desfaz a transação em caso de erro
            await client.query('ROLLBACK');
            throw new Error(error.message);
        } finally {
            // Libera a conexão
            await client.release();
        }
    }
    

}