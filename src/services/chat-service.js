import { getChatsByPhoneNumber, updateChatByPhoneNumber, getChatArray } from "../globals/chatsArray.js";

export default class ChatService {

    getChatByPhoneNumber = (phoneNumber) => {
        const chat = getChatsByPhoneNumber(phoneNumber);
        return chat;
    }

    getChatArray = () => {
        const chats = getChatArray();
        return chats;
    }

    updateChatLastMessage = (phoneNumber, lastMessageID) => {
        let oldChat = getChatsByPhoneNumber(phoneNumber);
        let updatedChat = new Chat(phoneNumber, oldChat.startingTime, lastMessageID);
        updateChatByPhoneNumber(updatedChat);
    }
}