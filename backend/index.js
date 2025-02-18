const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    next()
})

app.get('/test',(req,res)=>{
    try {
        res.status(200).json({message:'Working'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/users',async (req,res)=>{
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/users/:id',async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/users', async (req,res)=>{
    try {
        const user = await prisma.user.create({
            data : {
                name : req.body.name,
                email : req.body.email
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})

    }
})

app.delete('/users/:id',async (req,res)=>{
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>console.log(`SERVER IS RUNNING ON ${PORT}`))