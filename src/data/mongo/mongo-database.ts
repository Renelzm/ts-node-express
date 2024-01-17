import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { mongoUrl, dbName } = options;
        try {
            const db = await mongoose.connect(mongoUrl, {
            dbName,
        });
        console.log('Mongo connected');
        console.log('DB:', dbName);
        console.log('DB-version:', db.version);
        return true
        } catch (error) {
            console.log('Mongo error connection', error);
        }
        
    
    }
}