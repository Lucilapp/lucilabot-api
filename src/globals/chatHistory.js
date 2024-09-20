class ChatHistory {
    constructor() {
        if (!ChatHistory.instance) {
            this.chatHistoryArray = [{
                phoneNumber: 'example',
                messages: [
                    {
                    messageId: 'example',
                    reply: 'example'
                    }
                ]
            }];
            ChatHistory.instance = this;
        }
        return ChatHistory.instance;
    }
    getChatHistory(phoneNumber) {
        let reply = this.chatHistoryArray.find(obj => obj.phoneNumber === phoneNumber);
        reply !== undefined ? reply = reply.messages : null
        return reply;
    }

    newChatHistory(phoneNumber, messageId, reply) {
        this.chatHistoryArray.push({
            phoneNumber: phoneNumber,
            messages: [
                {
                    messageId: messageId,
                    reply: reply.toUpperCase()
                }
            ]
        })
    }

    updateChatHistory(phoneNumber, messageId, reply) {
        let historyIndex = this.chatHistoryArray.findIndex(obj => obj.phoneNumber === phoneNumber);
        this.chatHistoryArray[historyIndex].messages.push({
            messageId: messageId,
            reply: reply.toUpperCase()
        })
    }

    getReplyToMessageId(phoneNumber, messageId) {
        let historyIndex = this.chatHistoryArray.findIndex(obj => obj.phoneNumber === phoneNumber);
        return this.chatHistoryArray[historyIndex].messages.find(obj => obj.messageId === messageId).reply;

    }

}
const instance = new ChatHistory();
Object.freeze(instance);

export default instance;