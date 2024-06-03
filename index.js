const express = require("express")
const messageRouter = require('./src/routers/messageRouter')
const whatsappclient = require('./src/services/WhatsappClient')

whatsappclient.initialize()
const app = express()
app.use(express.json())
app.use(messageRouter)

app.listen(3000, () => console.log('Server Ready'))