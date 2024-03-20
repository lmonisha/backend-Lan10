const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models/db')
const routes=require('./routes/index')
var morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use('/',routes)

app.get('/', async (req, res) => {
    res.send('HelloWorld!!!!!!!!!!!!')
})
models().then(()=>{
    app.listen(7000, () => console.log('server is running on the port'))

}).catch((err)=>{
console.error('some error in db connection',err)
})
