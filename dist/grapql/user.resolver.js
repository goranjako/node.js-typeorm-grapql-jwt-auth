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
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const auth_1 = __importDefault(require("../config/auth"));
const verify_1 = require("../config/verify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = {
    Query: {
        users: (parent, args, { req, User }) => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User);
            try {
                const user = auth_1.default(req);
                const users = yield userRepository.find({});
                ;
                return users;
            }
            catch (error) {
                throw error;
            }
        }),
        userId: (parent, args, { req, User }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = auth_1.default(req);
            const userRepository = typeorm_1.getRepository(User);
            try {
                const user = yield userRepository.findOne({ where: { id: args.id } });
                return user;
            }
            catch (error) {
                throw error;
            }
        }),
        login: (paren, { input }, { User }) => __awaiter(void 0, void 0, void 0, function* () {
            yield verify_1.signIn.validate(input, { abortEarly: false });
            const userRepository = typeorm_1.getRepository(User);
            try {
                const finduser = yield userRepository.findOne({ email: input.email });
                if (!finduser) {
                    throw new apollo_server_express_1.UserInputError('User  not found');
                }
                const isEqual = yield bcrypt_nodejs_1.default.compareSync(input.password, finduser.password);
                if (!isEqual) {
                    throw new apollo_server_express_1.UserInputError('Wrong credentials!');
                }
                const token = jsonwebtoken_1.default.sign({ finduser }, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60,
                });
                return { token };
            }
            catch (error) {
                throw error;
            }
        })
    },
    Mutation: {
        register: (paren, { input }, { User }) => __awaiter(void 0, void 0, void 0, function* () {
            yield verify_1.signUp.validate(input, { abortEarly: false });
            const userRepository = typeorm_1.getRepository(User);
            try {
                const finduser = yield userRepository.findOne({ email: input.email });
                if (finduser) {
                    throw new apollo_server_express_1.UserInputError('User already Exists');
                }
                const newuser = new User();
                newuser.fullName = input.fullName,
                    newuser.email = input.email,
                    newuser.password = input.password,
                    newuser.hashPassword();
                const saveduser = yield typeorm_1.getRepository(User).save(newuser);
                const token = jsonwebtoken_1.default.sign({ saveduser }, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60,
                });
                return { token };
            }
            catch (error) {
                throw error;
            }
        })
    }
};
exports.default = user;
//# sourceMappingURL=user.resolver.js.map