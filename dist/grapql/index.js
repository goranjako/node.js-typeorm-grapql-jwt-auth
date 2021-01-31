"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_resolver_1 = __importDefault(require("./user.resolver"));
exports.default = {
    Query: Object.assign({}, user_resolver_1.default.Query),
    Mutation: Object.assign({}, user_resolver_1.default.Mutation)
};
//# sourceMappingURL=index.js.map