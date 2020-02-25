//Para iniciar o server no browser
// npm start
//http://127.0.0.1:3000/

//Para finalizar o server
//ctrl + c 

//Banco de dados doe
//log: postgres
//senha: 22142203


//Configurando o servidor
const express = require("express")
const server = express()


//Configurando o srvidor para arquivos estaticos
server.use(express.static('public'))


//Habilitar o body do formulario
server.use(express.urlencoded({ extended:true }))


//confugirar a conexao com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '22142203',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})


//Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


//Configurar a apresentação da pagina
server.get("/", function(req, res){ //get pegar dados
    db.query(`SELECT * FROM donors`, function(err, result){
        if(err) return res.send("erro no banco de dados.")

        const donors = result.rows;
        return res.render("index.html", { donors })
    })

})


server.post("/", function(req, res){ //post guardar dados
    //pegar dados do formularios usando o req
    const name  = req.body.name
    const email  = req.body.email
    const blood  = req.body.blood

    //regra de negocio para não enviar dados em branco
    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    //colocando valores dentro do banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err){
        //fluxo de erro
        if(err) return res.send("erro no banco de dados.")

        //Fluxo ideal. Resposta de redirecionamento
        return res.redirect("/")

    })

})


//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado!")
})