"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req) => {
    // context = { ...headers }
    const authHeader = req.req.headers.authorization;
    if (authHeader) {
        // convention for tokens: "Bearer ..."
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            }
            catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]'");
    }
    // error handling
    throw new Error('Authorization header must be provided');
};
exports.default = auth;
//# sourceMappingURL=auth.js.map