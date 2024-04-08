const express = require('express')
const controllerLogin = require('./controller/login_controller')
const controllerMaterial = require('./controller/material_controller')
const routes = express.Router()

routes.post('/login', controllerLogin.login)
routes.post('/material', controllerMaterial.salvar_material)
routes.get('/material', controllerMaterial.listar_materiais)
routes.delete('/material/:id', controllerMaterial.deletar_material)


module.exports = routes