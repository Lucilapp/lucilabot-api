import PgHelper from "../helpers/pg-helper";

export default class AccountRepository {
    getAccount = async (phoneNumber) => {
        const pgHelper = new PgHelper();
        return await pgHelper.sqlQuery(/*Un query que busque la cuenta por el numero de telefono*/);
    }
}