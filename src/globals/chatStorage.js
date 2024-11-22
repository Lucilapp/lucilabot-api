class ChatStore {
    constructor() {
        if (!ChatStore.instance) {
            this.chatArray = [{
                number: 'example',
                startingTime: 'example',
                lastMessage: 'example'
            }];
            ChatStore.instance = this;
        }
        return ChatStore.instance;
    }

    getChatArray() {
        return this.chatArray;
    }

    addChatToArray(chat) {
        this.chatArray.push(chat);
    }

    getChatsByPhoneNumber(phoneNumber) {
        const chats = this.chatArray.filter(chat => chat.number === phoneNumber);
        let reply;
        if(chats.length > 0){
            reply = chats
        }
        else{
            reply = null;
        }
        return reply;
    }

    refreshChatTimeout(phoneNumber) {
        let reply;
        const index = this.chatArray.findIndex(chat => chat.number === phoneNumber);
        if (index === -1) {
            reply = false;
        } else {
            let updatedChat = this.chatArray.splice(index,1)[0];
            updatedChat.startingTime = Date.now();
            this.addChatToArray(updatedChat)
            reply = true;
        }
        return reply;
    }

    updateChatByPhoneNumber(updatedChat) {
        let reply;
        let phoneNumber = updatedChat.number;
        const index = this.chatArray.findIndex(chat => chat.number === phoneNumber);
        if (index === -1) {
            reply = false;
        } else {
            this.chatArray.splice(index,1);
            this.addChatToArray(updatedChat)
            reply = true;
        }
    
        return reply;
    }
    
    removeChatsByPhoneNumber(numberToRemove){
        const modifArray = this.chatArray.filter(item => item.number !== numberToRemove);
        const arrayLength = this.chatArray.length;
        for (let index = 0; index < arrayLength; index++) {
            this.chatArray.pop()
        }
        const noUndefinedArray = modifArray.filter(item => item !== undefined);
        for (let index = 0; index < noUndefinedArray.length; index++) {
            this.chatArray.push(noUndefinedArray[index])
        }
    }
}

const instance = new ChatStore();
Object.freeze(instance);

export default instance;