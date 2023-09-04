const express = require('express');
const app = express();
const pool = require('../db')
const queries = require('./queries')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
let time = new Date()
app.use(cookieParser())
const addNewUser = (req,res) =>{
    const {id,name,password,photo} = req.body;
    //res.send("Печенька поставлена") 
   /* res.cookie('username',"Roman", { maxAge: 900000, httpOnly: true })
    res.cookie('id',"322342", { maxAge: 900000, httpOnly: true })*/
    //диструктуризация
    const token = jwt.sign({ id: id,name:name }, 'password', { expiresIn: '1y' });
    pool.query(queries.addNewUser,[id,name,photo,password,token],(err, result) => {
        if(err){ console.error(err)}
        else{
          res.cookie("token",token,{
            maxAge:new Date("26 July 2021"),
          path:'/',
        httpOnly:false})
          res.status(201).json(token)
          console.log(`Good request(post) создан пользователь ${id}  ${time} token ${token}`)
        }
// Добавление токена в заголовок ответа
// ошибка в том что типо рес.сенд отправляется 2 раза нужно помещать все в один запрос все что хочешь
//console.log(Добавлен пользователь ${username} токен: ${token}; ${time})
     });
    }
     const takeAllbyToken = (req,res) => {
      const token  = req.params.token
        pool.query(queries.takeAllbyToken,[token],(err,result)=>{
          if (err) {
          throw console.log (` Ошибка ${err}`)
          }
          else{
            res.status(200).json(result.rows[0])
        console.log('dano po tokenp')
          }
        } )
      }

      const login = (req,res)  =>{
        const {id,password} =  req.body
        //const result = pool.query(queries.checkUsers,[id])
        pool.query(queries.checkAllInfo,[id],(err, result) => {
          const data  = result.rows[0]
          //console.log(data)
          //const token = jwt.sign({ id: id,username:username }, 'super', { expiresIn: '1y' });
          if (!data) {
            res.sendStatus(500);
            console.log("no data")
            return;
          }
          const passwordMatch =  bcrypt.compare(password, data.password);
          if (!passwordMatch) {
    res.sendStatus(500);
            console.log("pass err")
            return;
          }
          if(err){ console.log(err)}
          res.cookie("token",data.token,{
            maxAge:new Date("26 July 2021"),
          path:'/',
        httpOnly:false})
          res.status(200).send( 'Успешный вход' );
          console.log(`Успешный логин под айди  ${data.id}`)
      }
        )}
        const findUserById = (req,res) => {
          const id = req.params.id
            pool.query(queries.checkAllInfo,[id],(err,result)=>{
              if (err) {
              throw console.error(err)
              }
              else{
                res.status(200).json(result.rows)
              }
            } )
          }


     module.exports={
        addNewUser,
        takeAllbyToken,
        login,
        findUserById
     }