
import express from 'express';
import whatsappClient from '../services/WhatsappClient.js';
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", (req, res) => {
  whatsappClient.sendMessage(req.body.phoneNumber, req.body.message);
  res.send();
})

export default router