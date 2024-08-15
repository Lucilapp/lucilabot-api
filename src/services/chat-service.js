import { getChatsByPhoneNumber, updateChatByPhoneNumber } from "../globals/chatsArray.js";

export default class ChatService {

    getChatByPhoneNumber = (phoneNumber) => {
        const chat = getChatsByPhoneNumber(phoneNumber)[0];
        return chat;
    }

    updateChatLastMessage = (phoneNumber, lastMessageID) => {
        let oldChat = getChatsByPhoneNumber(phoneNumber);
        let updatedChat = new Chat(phoneNumber, oldChat.startingTime, lastMessageID);
        updateChatByPhoneNumber(updatedChat);
    }
}