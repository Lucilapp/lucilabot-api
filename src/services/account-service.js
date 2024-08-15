import AccountRepository from "../repositories/account-repository.js"

export default class AccountService {
    getAccount = (phoneNumber) => {
        const repo = new AccountRepository();
        const accountArray = repo.getAccount(phoneNumber);
        let reply = false;
        if(accountArray.length === 1){
            reply = accountArray;
        }
        return reply;
    }

    createAccount = () => {
        
    }
}