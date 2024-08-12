import { CHAT_TIMEOUT_MS } from "../config/constants"

export default class ControlService {
    checkTimeOut = (chat) => {
        return chat.startingTime - Date.now() < CHAT_TIMEOUT_MS
    }

    internalError = () => {

    }
}