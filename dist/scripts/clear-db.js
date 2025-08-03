"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const clearDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        const collections = await mongoose_1.default.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
            console.log(`Cleared collection: ${collection.collectionName}`);
        }
        console.log('All collections cleared.');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error('Error clearing DB:', err);
        process.exit(1);
    }
};
clearDB();
