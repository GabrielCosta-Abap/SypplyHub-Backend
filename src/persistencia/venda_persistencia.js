const { pool } = require('../conexao.js');
const materialPersistence = require('./material_persistencia');

module.exports = {

    registrar_venda: async (dados) => {
        const self = module.exports;
        const client = await pool.connect();
        const currentDate = new Date();
        const formattedTime = self.formatTime(currentDate);
    
        try {
            await client.query('BEGIN'); // Iniciar a transação
    
            // Inserir cabeçalho de venda
            let query = 'INSERT INTO sales_header (sale_date, sale_time, total_value) VALUES ($1, $2, $3) RETURNING *';
            let oHeader = await client.query(query, [currentDate, formattedTime, dados.valor_total]);
            oHeader = oHeader.rows[0];
    
            // Preparar dados para inserções em lote
            const salesItemsData = [];
            const productMaterialsIds = [];
            dados.itens.forEach((item, index) => {
                salesItemsData.push([
                    oHeader.sale_id,
                    index + 1,
                    item.product_id,
                    item.quantity,
                    item.unit_value,
                    item.total_value
                ]);
                productMaterialsIds.push(item.product_id);
            });
    
            // Criar a consulta de inserção em lote com parâmetros numerados corretamente
            const valuesString = salesItemsData.map((_, i) => 
                `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`
            ).join(', ');
    
            query = `
                INSERT INTO sales_item (sale_id, item_num, product_id, quantity, unit_value, total_value)
                VALUES ${valuesString}
                RETURNING *
            `;
    
            console.log(query);
    
            const salesItemsFlatData = salesItemsData.flat();
    
            console.log(salesItemsFlatData);
            
            let oItems = await client.query(query, salesItemsFlatData);
            oItems = oItems.rows;
    
            // Buscar materiais dos produtos em lote
            query = `SELECT * FROM productmaterials WHERE productid = ANY($1)`;
            let oProductMaterials = await client.query(query, [productMaterialsIds]);
            oProductMaterials = oProductMaterials.rows;
    
            // Preparar dados para atualização de materiais
            const materialsToUpdate = {};
            dados.itens.forEach(item => {
                oProductMaterials.forEach(material => {
                    if (material.productid === item.product_id) {
                        const sQuantidadeConsumida = material.quantity * item.quantity;
                        if (!materialsToUpdate[material.materialid]) {
                            materialsToUpdate[material.materialid] = 0;
                        }
                        materialsToUpdate[material.materialid] += sQuantidadeConsumida;
                    }
                });
            });
    
            // Buscar materiais para atualizar as quantidades
            const materialIds = Object.keys(materialsToUpdate);
            query = `SELECT * FROM materials WHERE id = ANY($1)`;
            let materials = await client.query(query, [materialIds]);
            materials = materials.rows;
    
            // Atualizar quantidades dos materiais
            materials.forEach(material => {
                material.quantity -= materialsToUpdate[material.id];
            });
    
            // Salvar materiais atualizados
            await Promise.all(materials.map(material => materialPersistence.salvar_material(material)));
    
            await client.query('COMMIT'); // Confirmar a transação
    
            oHeader.itens = oItems;
            return oHeader;
    
        } catch (error) {
            await client.query('ROLLBACK'); // Reverter a transação em caso de erro
            throw new Error(error.message);
        } finally {
            client.release();
        }
    },
    
    formatTime: (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
};
