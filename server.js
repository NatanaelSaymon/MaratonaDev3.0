//Configurando o servidor
const express = require("express")
const server = express()


//Configurando o srvidor para arquivos estaticos
server.use(express.static('public'))


//Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})


//Configurar a apresentação da pagina
server.get("/", function(req, res){
    return res.render("index.html")
})


//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado!")
})