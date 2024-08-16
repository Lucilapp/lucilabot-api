import { Chat } from '../dto/chatDto.js';
import ChatStore from '../globals/chatStorage.js';

export default class ChatService {

    getChatByPhoneNumber = (phoneNumber) => {
        const chat = ChatStore.getChatsByPhoneNumber(phoneNumber);
        return chat;
    }

    getChatArray = () => {
        const chats = ChatStore.getChatArray();
        return chats;
    }

    updateChatLastMessage = async (phoneNumber, lastMessageID) => {
        console.log(`lo que se manda para updatear: ${phoneNumber} ${lastMessageID}`)
        let oldChat = ChatStore.getChatsByPhoneNumber(phoneNumber)[0];
        console.log(`oldchat ${JSON.stringify(oldChat)}`)
        let updatedChat = new Chat(phoneNumber, oldChat.startingTime, lastMessageID);
        console.log(`lo que quiere mandar a updatear: ${JSON.stringify(updatedChat)}`)
        ChatStore.updateChatByPhoneNumber(updatedChat);
    }

    addChatToArray = (phoneNumber, startingTime, lastMessage) => {
        const chat = new Chat(phoneNumber, startingTime, lastMessage);
        ChatStore.addChatToArray(chat);
    }
}