const { pool } = require('../conexao.js')

module.exports = {

    salvar_produto: async (produto) => {
        const client = await pool.connect();
        let query = ''

        produto.productid = produto.id

        let materiais = produto.materials
        let values = [produto.description, produto.sale_price, produto.productid]

        try {
            
            if (produto.productid) {
                query = `UPDATE products SET description=$1, sale_price=$2 WHERE id = $3 RETURNING *`
            }else{
                query = `INSERT INTO products (description, sale_price) VALUES ($1, $2) RETURNING *`
                values.pop()
            }
            
            let result = await client.query(query, values);
            
            if (result.rows.length > 0) {
                
                let productId = result.rows[0].id
                
                values = [productId]
                query = `DELETE FROM productmaterials WHERE productid = $1 RETURNING *`
                
                result = await client.query(query, values);
                
                if (result) {
                    
                    for (const material of materiais) {
                        values = [productId, material.materialid, material.quantity]
                        query = `INSERT INTO productmaterials (productid, materialid, quantity) VALUES ($1, $2, $3) RETURNING *`
                        result = await client.query(query, values);
                    }
                    
                    return {
                        id: productId,
                        description: produto.description,
                        materials: produto.materials
                    }

                }
                    
            } else {
                throw new Error('Erro ao salvar produto!')
            }

            client.release();
            
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deletar_produto: async (id)=>{

        const client = await pool.connect();
        let query = ''

        try {
            
            console.log('chegou na query')
            query = `DELETE FROM products WHERE id=$1 RETURNING *`
            const result = await client.query(query, [id]);
            console.log('passou da query')
            
            if (result.rows.length > 0) {
                return result.rows
            } else {
                throw new Error('Erro ao deletar produto!')
            }

            client.release();
            
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }

    },

    listar_produtos: async () => {
        const client = await pool.connect();
        let query = '';
    
        try {
            query = `SELECT products.ID,
                            products.DESCRIPTION,
                            products.SALE_PRICE,
                            productmaterials.MATERIALID,
                            materials.NAME,
                            productmaterials.QUANTITY,
                            materials.UM,
                            materials.PRICE
                        FROM products
                        JOIN productmaterials ON products.ID = productmaterials.PRODUCTID
                        JOIN materials ON materials.ID = productmaterials.MATERIALID`;
    
            const result = await client.query(query);
            client.release();
    
            if (result.rows.length > 0) {
                let produtos = [];
    
                result.rows.forEach((row) => {
                    let existingProduct = produtos.find((p) => p.id === row.id);
    
                    if (!existingProduct) {
                        existingProduct = {
                            id: row.id,
                            description: row.description,
                            sale_price: row.sale_price,
                            materials: []
                        };
                        produtos.push(existingProduct);
                    }
    
                    existingProduct.materials.push({
                        materialid: row.materialid,
                        quantity: row.quantity
                    });
                });
    
                return produtos;
            } else {
                throw new Error('Nenhum produto encontrado!');
            }
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await client.end();
        }
    }
    

}