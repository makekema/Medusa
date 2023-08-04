"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const url_1 = require("url");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const path_2 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
dotenv_1.default.config({ path: path_2.default.resolve(__dirname, "../../.env") });
const connectionString = process.env.DB_CONNECTION_STRING;
mongoose_1.default.connect(connectionString, {
    // the following two lines help to avoid
    // a write error related to Atlas
    writeConcern: {
        w: 1
    },
    // writeConcern:
    // "w: 1 means that MongoDB will acknowledge
    //write operations after they have been written
    //to the primary only.
    //This is less safe than w: 'majority',
    // but it might help you avoid the error if you are not able
    //to configure your MongoDB Atlas cluster
    // to support majority write concern."
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('database connected');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
