const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
  console.log('Server is up and running on port ' + port)
})

/*API Documention
url : https://documenter.getpostman.com/view/17571132/UUxtDpkh

*/
