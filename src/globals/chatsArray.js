let chatArray = [];

export const getChatArray = () => chatArray;

export const addChatToArray = (chat) => chatArray.push(chat);

export const getChatsByPhoneNumber = (phoneNumber) => {
    const chats = chatArray.filter(chat => chat.phoneNumber === phoneNumber);
    console.log(`chats que saca de chatarray: ${chats}`)
    return chats.length > 0 ? chats : null;
};

export const updateChatByPhoneNumber = (updatedChat) => {
    let phoneNumber = updatedChat.phoneNumber;
    const index = chatArray.findIndex(chat => chat.phoneNumber === phoneNumber);
    if (index === -1) {
        return false;
    }
    chatArray[index] = { ...chatArray[index], ...updatedChat };
    return true;
};
