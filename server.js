//Para iniciar o server no browser
// npm start

//Para finalizar o server
//ctrl + c 


//Configurando o servidor
const express = require("express")
const server = express()


//Configurando o srvidor para arquivos estaticos
server.use(express.static('public'))


//Habilitar o body do formulario
server.use(express.urlencoded({ extended:true }))


//Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


//Lista de doadores: vetor ou array
const donors = [
    {
        name: "Suellen Souza",
        blood: "AB+"
    },
    {
        name: "Natanael",
        blood: "O+"
    },
    {
        name: "Cacau Souza",
        blood: "B+"
    },
    {
        name: "Natsu Souza",
        blood: "A-"
    }
]


//Configurar a apresentação da pagina
server.get("/", function(req, res){ //get pegar dados
    return res.render("index.html", { donors })
})

server.post("/", function(req, res){ //post guardar dados
    //pegar dados do formularios usando o req
    const name  = req.body.name
    const email  = req.body.email
    const blood  = req.body.blood

    //colonaod valores dentro de um array
    donors.push({
        name: name,
        blood: blood,
    })

    //Resposta de redirecionamento
    return res.redirect("/")
})


//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado!")
})