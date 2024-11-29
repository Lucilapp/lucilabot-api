import pkg from 'whatsapp-web.js';
import { io } from "socket.io-client";
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import ReplyService from './reply-service.js';
import MessageService from './message-service.js';
import ChatService from './chat-service.js';
import Validation from '../helpers/validation.js'
import { CatArray, ID_INGRESO_ERROR, ID_MENSAJE_CONEXION_CHAT, ID_MENSAJE_ERROR_INTERNO, ID_MENSAJE_FIN_REGISTRO, ID_MENSAJE_INPUT_AYUDA_APPS, ID_MENSAJE_INPUT_DNI, ID_MENSAJE_INPUT_EDAD, ID_MENSAJE_INPUT_GENERO, ID_MENSAJE_INPUT_NOMBRE, ID_MENSAJE_RESPUESTA_INVALIDA, ID_MENSAJE_TIMEOUT, SOCKET_API_IP, ID_MENSAJE_INPUT_SOPORTE, ID_MENSAJE_CHAT_TERMINADO_EXITOSO, ID_MENSAJE_CHAT_TERMINADO_NO_EXITOSO, ID_CATEGORIA_PAGINAS_WEB, ID_MENSAJE_INPUT_AYUDA_WEB } from '../config/constants.js';
import AccountService from './account-service.js';
import HistoryService from './history-service.js';
import TaskService from './task-service.js';
import ReportService from './report-service.js';

var chatAlreadyConnected = false;
var chatFinished = false;
var answering = false;
const whatsappClient = new Client({
    authStrategy: new LocalAuth
})
var rerun = false;
var reinicio = false;
var socket = null;
var senderID = null;
var clientId = null;
var user = {
    Id: 0,
    Nombre: '',
    Telefono: 0,
    Edad: 0,
    Genero: ''
}

const msgInvalido = async (wppChat, wppContact) => {
    const msgsvc = new MessageService();
    const histsvc = new HistoryService();
    const chatsvc = new ChatService();

    //1 MANDA EL MSG ESTA MAL
    let msg = await msgsvc.getMessageById(ID_INGRESO_ERROR);
    await wppChat.sendMessage(msg.text);
    //2 ROLLBACK DE MENSAJE
    let history = histsvc.getChatHistory(wppContact.number);
    let msgId = history[history.length - 1].messageId;
    console.log(msgId);
    chatsvc.updateChatLastMessage(wppContact.number, (await msgsvc.getPrevMessage(msgId)).Id);
    //3 REINICIO DEL BOT
    reinicio = true
}

whatsappClient.on('qr', (qr) => {
    qrcode.generate(qr, {small:true})
})
whatsappClient.on('ready', () => console.log('Client Ready'))

whatsappClient.on("message", async(msg) =>{
    
    try {
        if(msg.from != 'status@broadcast' && !answering){
            answering = true;
            const wppContact = await msg.getContact();
            const wppChat = await msg.getChat();
            const replysvc = new ReplyService();
            const msgsvc = new MessageService();
            const chatsvc = new ChatService();
            const accsvc = new AccountService();
            const histsvc = new HistoryService();
            const tasksvc = new TaskService();
            const repsvc = new ReportService();
            const vali = new Validation();
            console.log("Conected with:" + wppContact.number)
            if (wppContact.number === '5491149394221' || wppContact.number === '5491126447860' || wppContact.number === '5491153743509'|| wppContact.number === '5491170205952' || wppContact.number === '5491126215005' || wppContact.number === '5491131172583'|| wppContact.number === '5491124609835') {
                
                (async () => {
                    const bot = async () => {
                        try {
                            if(!chatAlreadyConnected){
                                // Fase 2: Decidir el siguiente mensaje
                                let reply = await replysvc.checkChat(wppContact.number, msg.body);
                                
                                // Fase 1: Verificar si se debe guardar la respuesta
                                const chat = chatsvc.getChatByPhoneNumber(wppContact.number)[0];
                                let lastMessage = chat.lastMessage ? await msgsvc.getMessageById(chat.lastMessage) : null; 
                                if (lastMessage !== null && !rerun) {
                                    if(lastMessage.saveAnswer) {
                                        switch(parseInt(lastMessage.Id)){
                                            case ID_MENSAJE_INPUT_NOMBRE:
                                                if(vali.validarNombre(msg.body))
                                                {
                                                    user.Nombre = msg.body;
                                                }
                                                else
                                                {
                                                    await msgInvalido(wppChat, wppContact);
                                                }
                                                    break;
                                            case ID_MENSAJE_INPUT_EDAD:
                                                if(vali.validarAno(msg.body)){
                                                    user.Edad = msg.body;
                                                }
                                                else {
                                                    await msgInvalido(wppChat, wppContact);
                                                }
                                                break;
                                            case ID_MENSAJE_INPUT_DNI:
                                                if(vali.validarDNI(msg.body)){
                                                }
                                                else{
                                                    await msgInvalido(wppChat, wppContact);
                                                }
                                                break;
                                            case ID_MENSAJE_INPUT_GENERO:
                                                if(vali.validarGenero(msg.body)){
                                                    user.Genero = msg.body;
                                                    user.Telefono = accsvc.formatPhone(msg.from);
                                                    accsvc.createAccount(user);
                                                }
                                                else{
                                                    await msgInvalido(wppChat, wppContact);
                                                }
                                                break;
                                            // case ID_MENSAJE_INPUT_SOPORTE:
                                            //     clientId = (await accsvc.getAccounts(wppContact.number))[0].Id;
                                            //     repsvc.createReport(reply.Id, clientId, msg.body)
                                            //     break;
                                            case ID_MENSAJE_INPUT_AYUDA_APPS:
                                                let history = histsvc.getChatHistory(wppContact.number);
                                                let optMsg = history[history.length - 2];
                                                let msgHist = CatArray.find(obj => obj.idMsg === parseInt(optMsg.messageId))
                                                let catId = msgHist.answers.find(ans => ans.letter === optMsg.reply).catId
                                                clientId = (await accsvc.getAccounts(wppContact.number))[0].Id;
                                                socket = io(SOCKET_API_IP);
                                                socket.on("connect", () => {
                                                    tasksvc.createTask(msg.body, catId, clientId, socket.id);
                                                })
                                                socket.on('recieveMessage', (msg, senderId) => {
                                                    senderID = senderId;
                                                    wppChat.sendMessage(msg)
                                                })
                                                socket.on('chatDisconnect', () => {
                                                    chatAlreadyConnected = false;
                                                    bot();
                                                }) 
                                                break;

                                            case ID_MENSAJE_INPUT_AYUDA_WEB:
                                                clientId = (await accsvc.getAccounts(wppContact.number))[0].Id;
                                                socket = io(SOCKET_API_IP);
                                                socket.on("connect", () => {
                                                    tasksvc.createTask(msg.body, ID_CATEGORIA_PAGINAS_WEB, clientId, socket.id);
                                                })
                                                socket.on('recieveMessage', (msg, senderId) => {
                                                    senderID = senderId;
                                                    wppChat.sendMessage(msg)
                                                })
                                                socket.on('chatDisconnect', () => {
                                                    chatAlreadyConnected = false;
                                                    bot();
                                                }) 
                                                break;
                                        }
                                    }
                                }
                                rerun = false;
                                if(!reinicio){
                                    // Fase 3: Mandar el siguiente mensaje
                                    await wppChat.sendMessage(reply.text);
                                    // Fase 4: Actualizar el último mensaje en el chat
                                    await chatsvc.updateChatLastMessage(wppContact.number, reply.Id);
                                    if(reply.Id.toString() === ID_MENSAJE_CONEXION_CHAT.toString()){
                                        chatAlreadyConnected = true;
                                        bot();
                                    }
                                    else if(!reply.replyable && reply.Id !== ID_MENSAJE_ERROR_INTERNO.toString() && reply.Id !== ID_MENSAJE_TIMEOUT.toString() && reply.Id !== ID_MENSAJE_FIN_REGISTRO.toString() && reply.Id.toString() !== ID_MENSAJE_CHAT_TERMINADO_EXITOSO.toString() && reply.Id !== ID_MENSAJE_CHAT_TERMINADO_NO_EXITOSO.toString()){
                                        bot();
                                    }
                                    else if(reply.Id === ID_MENSAJE_ERROR_INTERNO.toString() || reply.Id === ID_MENSAJE_TIMEOUT.toString() || reply.Id === ID_MENSAJE_FIN_REGISTRO.toString()){
                                        chatsvc.removeChatsByPhoneNumber(wppContact.number);
                                    }
                                    else if(reply.Id.toString() === ID_MENSAJE_CHAT_TERMINADO_EXITOSO.toString() || reply.Id === ID_MENSAJE_CHAT_TERMINADO_NO_EXITOSO.toString()){
                                        //momento donde guarda todo el chat
                                        chatsvc.removeChatsByPhoneNumber(wppContact.number);
                                    }
                                }
                                else {
                                    reinicio = false;
                                    rerun = true;
                                    bot();
                                }
                            }
                            else if (chatAlreadyConnected) {
                                if (chatAlreadyConnected){
                                    //Inserte en la tarea el socketID
                                    socket.emit('messageSend', socket.id, msg.body, senderID);
                                } 
                            }
                            answering = false;
                        } catch (error) {
                            console.error("Error en alguna de las fases:", error);
                            answering = false;
                        }
                    }
                    bot();
                })();

            }
            
            
        }
    } catch (error) {
        console.log(error)
    }
})


export default whatsappClient;
