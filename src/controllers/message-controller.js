import {Router} from 'express';
import MessageService from './../services/message-service.js'
const router = Router();
const svc = new MessageService();

router.get('', async (req, res) => {
    if ("a" != null) {
        res.status(200).json("Todo Ok");
    } else {
        res.status(500).send(`Error Interno`);
    }
});



export default router;