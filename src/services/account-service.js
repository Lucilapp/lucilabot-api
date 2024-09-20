import AccountRepository from "../repositories/account-repository.js"

export default class AccountService {
    getAccounts = async (phoneNumber) => {
        const repo = new AccountRepository();
        const accountArray = await repo.getAccount(phoneNumber);
        return accountArray;
    }

    createAccount = (userObj) => {
        const repo = new AccountRepository();
        let reply = repo.createAccount(userObj);
    }

    formatPhone = (phoneNumber) => {
        return phoneNumber.replace(/\D/g, '');

    }
}