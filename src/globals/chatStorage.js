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
        console.log(this.chatArray);
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
        console.log("Entro en remove")
        const modifArray = this.chatArray.filter(item => item.number !== numberToRemove);
        const arrayLength = this.chatArray.length;
        for (let index = 0; index < arrayLength; index++) {
            this.chatArray.pop()
        }
        const noUndefinedArray = modifArray.filter(item => item !== undefined);
        console.log(noUndefinedArray)
        for (let index = 0; index < noUndefinedArray.length; index++) {
            this.chatArray.push(noUndefinedArray[index])
        }
        console.log(this.chatArray)
    }
}

const instance = new ChatStore();
Object.freeze(instance);

export default instance;