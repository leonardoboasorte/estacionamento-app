require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//config json response
app.use(express.json())

//models
const User = require('./models/User')

//public route
app.get('/', (req, res) => {
    res.status(200).json({msg:'bem vindo a nossa API!'})
})

//Private route
app.get("/user/:id", CheckToken , async (req, res) => {
    const id = req.params.id

    //check if user exists
    const user = await user.findById(id, '-password')

    if(!user) {
        return res.status(404).json({msg:"Usuário não encontrado"})
    }
    res.status(200).json({user})
})
function CheckToken (req, res, next) {
    
    const authHeader = req.headers['autorization']
    const token = authHeader && authHeader.split(" ")[1]
    console.log(req.headers)
    if(!token) {
        return res.status(401).json({msg:'acesso negado'})
    }
    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    }catch(error) {
       res.status (400).json({msg:"token inválido"})
    }
}

//register user
app.post('/auth/register', async(req, res) =>{
     const {name, email, password,} = req.body

     //validations
     if(!name) {
        return res.status(422).json({msg:"O nome é obrigatório"})
     }
     if(!email) {
        return res.status(422).json({msg:"O email é obrigatório"})
     }
     if(!password) {
        return res.status(422).json({msg:"A senha é obrigatória"})
     }
     
     //check if user exist
    const userExist = await User.findOne({email: email})

    if(userExist) {
        return res.status(422).json({msg:"Ultilize um email diferente"})
    }

    //creat password
    const salt = await bcrypt.genSalt(12)
    const passwordhash = await bcrypt.hash(password,salt)

    //create user
    const user = new User({
        name,
        email,
        password: passwordhash,
    })
    try {
        await user.save()
        res.status(201).json({msg: "usuário criado com sucesso"})

    }catch(error) {
        console.log(error)
    res.status(500).json({msg: error})

    }
})

//login user
app.post("/auth/Login", async (req, res) =>{

    const {email, password} = req.body

    //validations
    if(!email) {
        return res.status(422).json({msg:"O email é obrigatório"})
     }
     if(!password) {
        return res.status(422).json({msg:"A senha é obrigatória"})
     }

     //check if user exist
     const user = await User.findOne({email: email})
     if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
     }

     //Check if password exist
     const checkPassword = await bcrypt.compare(password, user.password)

     if(!checkPassword) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
     }

     try{
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
            id: user._id,
            },
            secret,
        )
        res.status(200).json({msg: "Autenticação realizada com sucesso!", token})

     }catch(error) {
        console.log(error)
    res.status(500).json({msg: error})
    }

})

//credenciais
const dbuser = process.env.DB_USER
const dbpassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbuser}:${dbpassword}@cluster0.gwxc1bk.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(3000)
    console.log('Conectou ao banco!')
})
.catch((err) => console.log(err))

