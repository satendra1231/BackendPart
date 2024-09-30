const express = require('express');
const app = express();
const port = 5000;
const connection = require('./db')
connection()
const cors = require('cors')


// let userRouter = require('./routes/userRouter')
// let postRouter = require('./routes/postRouter')
let userRouter=require('./routes/userRouter')
let postRouter=require('./routes/postRouter')

app.use(cors());
app.set('view engine','ejs')
app.use(express.json({limit:"50mb"}))

app.get('/',(req,res)=>{
    res.send('welcome page')
})

app.use('/users',userRouter)
app.use('/posts',postRouter)


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})