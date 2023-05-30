const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

app.use(cors())

const credenciales={
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'sistemaviajes'
}

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})

app.get('/productos',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from sv_productos',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

app.get('/productos/incluye',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from incluye_detalle',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//peticion de usuarios a la BD
app.get('/usuarios-get',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from usuarios',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//peticion de clientes a la BD
app.get('/clientes-get',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from clientes',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//insercion de usuarios a la BD
app.post('/usuarios-post', (req, res)=>{
    var conexion=mysql.createConnection(credenciales)
    const values = [
        req.body.usuario,
        req.body.email,
        req.body.password,
        req.body.tipo
    ]
    conexion.query('INSERT INTO usuarios (`usuario`, `email`, `password`, `tipo`) VALUES (?)',[values], (err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
    conexion.end()
})

app.listen(4000, ()=>console.log('Bienvenido al Backend'))