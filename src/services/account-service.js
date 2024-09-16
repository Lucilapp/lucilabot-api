import AccountRepository from "../repositories/account-repository.js"

export default class AccountService {
    getAccount = async (phoneNumber) => {
        const repo = new AccountRepository();
        const accountArray = await repo.getAccount(phoneNumber);
        let reply = false;
        if(accountArray.length > 0){
            reply = accountArray[0];
        }
        return reply;
    }

    createAccount = (userObj) => {
        const repo = new AccountRepository();
        let reply = repo.createAccount(userObj);
    }

    formatPhone = (phoneNumber) => {
        return phoneNumber.replace(/\D/g, '');

    }
}