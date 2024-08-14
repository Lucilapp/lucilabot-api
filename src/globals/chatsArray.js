let chatArray = [];

const getChatArray = () => chatArray;
const addChatToArray = (chat) => chatArray.push(chat);
const getChatsByPhoneNumber = (phoneNumber) => {
    const chats = chatArray.filter(chat => chat.phoneNumber === phoneNumber);
    return chats.length > 0 ? chats : null;
};

const updateChatByPhoneNumber = (updatedChat) => {
    let phoneNumber = updatedChat.phoneNumber;
    const index = chatArray.findIndex(chat => chat.phoneNumber === phoneNumber);
    if (index === -1) {
        return false;
    }
    chatArray[index] = { ...chatArray[index], ...updatedChat };
    return true;
};


module.exports = {
    getChatArray,
    addChatToArray,
    updateChatByPhoneNumber,
    getChatsByPhoneNumber,
};

