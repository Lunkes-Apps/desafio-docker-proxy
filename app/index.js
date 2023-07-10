const express = require('express')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
// const connection = mysql.createConnection(config)

// const sql = `INSERT INTO pessoas(name) values('Alexandre')`
// connection.query(sql)
// connection.end()

const inserirNome = (nome) => {
    console.log('inserindo nome')
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO nomes(nome) values('${nome}')`
    connection.query(sql)
    connection.end()
    console.log('nome foi inserido')
}

const consultarNomes = (res) => {
    let page = '<h1>Full Cycle Rocks!</h1>'
    console.log('lendo nome')
    const connection = mysql.createConnection(config)
    const sql = `SELECT * FROM nomes`
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                mysql.end();
                res.send(`<h1>${error}</h1>`);
            }
            if(results.length > 0) {
                console.log(results);
                results.forEach(element => {
                   page += `\n<h1>nome: ${element['nome']}</h1>`
                });
                
                res.send(page);
            } else {
               res.send(page);
            }
        }
    )
    connection.end()
}


app.get('/', (req, res) => {
    inserirNome('Alexandre')
    consultarNomes(res)
})

app.listen(port, () => {
    console.log('rodando na porta sim  ' + port)
})