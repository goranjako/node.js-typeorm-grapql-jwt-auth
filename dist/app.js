"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const User_1 = require("./entity/User");
const user_resolver_1 = __importDefault(require("./grapql/user.resolver"));
const shema_1 = __importDefault(require("./grapql/shema"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
//createConnection();
function intializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection();
        return connection;
    });
}
intializeDB().then(connected => { console.log('Connected to DB'); })
    .catch((err) => {
    console.log(`DB connection error. Please make sure DB is running. ${err}`);
    // process.exit();
});
// Middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: shema_1.default,
    resolvers: user_resolver_1.default,
    context: req => ({ req, User: User_1.User })
});
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=app.js.map