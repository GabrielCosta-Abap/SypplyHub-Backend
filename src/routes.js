const express = require('express')
const controllerLogin = require('./controller/login_controller')
const controllerMaterial = require('./controller/material_controller')
const controllerProduto = require('./controller/produto_controller')
const controllerVenda = require('./controller/venda_controller')
const controllerCompras = require('./controller/compras_controller')
const routes = express.Router()

routes.post('/login', controllerLogin.login)

routes.post('/material', controllerMaterial.salvar_material)
routes.get('/material', controllerMaterial.listar_materiais)
routes.delete('/material/:id', controllerMaterial.deletar_material)

routes.post('/produto', controllerProduto.salvar_produto)
routes.get('/produto', controllerProduto.listar_produtos)
routes.delete('/produto/:id', controllerProduto.deletar_produto)

routes.post('/venda', controllerVenda.registrar_venda)

routes.get('/compras', controllerCompras.lista_compras)

module.exports = routes