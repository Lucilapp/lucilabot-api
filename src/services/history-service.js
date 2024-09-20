import ChatHistory from "../globals/chatHistory.js"

export default class HistoryService {
    saveChatHistory = (phoneNumber, lastMessage, reply) => {
        if(ChatHistory.getChatHistory(phoneNumber) === undefined) {
            ChatHistory.newChatHistory(phoneNumber, lastMessage, reply);
        }
        else {
            ChatHistory.updateChatHistory(phoneNumber, lastMessage, reply);
        }
    }

    getChatHistory = (phoneNumber) => {
        return ChatHistory.getChatHistory(phoneNumber);
    }
}
