const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition : {
      info :{
          title:'User API',
          description:'API for user login/signup',
          server: ['http://localhost:3000']
      }
    },
    apis : ['./routes/user.js']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions)

const app = express()
const port = process.env.PORT || 3000

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
  console.log('Server is up and running on port ' + port)
})