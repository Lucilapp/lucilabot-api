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
        console.log(`se añadira este chat ${JSON.stringify(chat)}`)
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

    updateChatByPhoneNumber(updatedChat) {
        let reply;
        console.log(`update: ${JSON.stringify(updatedChat)}`)
        console.log(`array 1 : ${JSON.stringify(this.getChatArray())}`)
        let phoneNumber = updatedChat.phoneNumber;
        const index = this.chatArray.findIndex(chat => chat.phoneNumber === phoneNumber);
        if (index === -1) { 
            reply = false;
        }else{
            this.chatArray[index].number = updatedChat.number;
            this.chatArray[index].lastMessage = updatedChat.lastMessage;
            this.chatArray[index].startingTime = updatedChat.startingTime;
            console.log(`array 2 : ${JSON.stringify(this.getChatArray())}`)
            reply = true;
        }
        
        return reply;
    }
}

const instance = new ChatStore();
Object.freeze(instance);

export default instance;
