import express from 'express';
import messageRouter from './src/routers/message-router.js';
import whatsappclient from './src/services/WhatsappClient.js';

whatsappclient.initialize()
const app = express()
app.use(express.json())
app.use(messageRouter)

app.listen(3001, () => console.log('Server Ready'))