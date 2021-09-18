const express= require('express')
const router = express.Router()
const Users = require('../model/user')

router.post('/user/signup',async(req,res)=>{
   const user = new Users(req.body)
    try{
       await user.save()
       res.status(201).send('User created successfully.')
    }catch(e){
       res.status(400).send(e)
    }
})    

router.post('/user/login',async(req,res)=>{
    try{
       const user = await Users.findByCredentials(req.body.email,req.body.password)
       res.send({user})
    }catch(e){
       res.status(400).send(e.toString())
    }
})

module.exports = router