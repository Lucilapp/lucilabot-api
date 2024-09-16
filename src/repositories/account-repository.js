import PgHelper from "../helpers/pg-helper.js";

export default class AccountRepository {
    getAccount = async (phoneNumber) => {
        const pgHelper = new PgHelper();
        const ret = await pgHelper.sqlQuery(`Select * from "Cliente" where "Telefono" = ${phoneNumber}`);
        console.log(ret)
        return ret;
    }

    createAccount = async (user) => {
        const pgHelper = new PgHelper();
        let success = true;
        try {
            await pgHelper.sqlQuery(`INSERT INTO "Cliente" ("Nombre", "Telefono", "Edad", "Genero") VALUES ('${user.Nombre}', '${user.Telefono}', '${user.Edad}', '${user.Genero}')`);
        } catch (error) {
            console.log(error);
            success = false;
        }
        return success;
    }
}