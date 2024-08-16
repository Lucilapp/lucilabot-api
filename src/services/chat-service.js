import { Chat } from '../dto/chatDto.js';
import ChatStore from '../globals/chatStorage.js';

export default class ChatService {

    getChatByPhoneNumber = (phoneNumber) => {
        const chat = ChatStore.getChatsByPhoneNumber(phoneNumber);
        console.log(chat)
        return chat;
    }

    getChatArray = () => {
        const chats = ChatStore.getChatArray();
        return chats;
    }

    updateChatLastMessage = async (phoneNumber, lastMessageID) => {
        let oldChat = ChatStore.getChatsByPhoneNumber(phoneNumber)[0];
        let updatedChat = new Chat(phoneNumber, oldChat.startingTime, lastMessageID);
        ChatStore.updateChatByPhoneNumber(updatedChat);
    }

    addChatToArray = (phoneNumber, startingTime, lastMessage) => {
        const chat = new Chat(phoneNumber, startingTime, lastMessage);
        ChatStore.addChatToArray(chat);
    }
}