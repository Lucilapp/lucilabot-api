import express from"express"; 
import cors from"cors";
import MsgRouter from "./src/controllers/message-controller.js";

const app = express(); 
const port = 3000; 

app.use(cors()); 
app.use(express.json());
app.use('/front', express.static('public'));
app.use("/api/msg", MsgRouter); 

app.listen(port, () => { 
    console.log(`Example app listening on port: ${port}`) 
})

