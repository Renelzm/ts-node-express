import { envs } from '../../config/envs';
import { MongoDatabase } from '../mongo/mongo-database';


export class dbConnection {
    constructor() {}

    static async Mongo (){
        await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
          });
    }
}