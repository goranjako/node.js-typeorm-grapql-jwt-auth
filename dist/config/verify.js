"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.signIn = exports.signUp = void 0;
const yup = __importStar(require("yup"));
/**
 * USER MODEL Validation Rules
 */
const fullName = yup
    .string()
    .required('Username is required.')
    .min(5, 'Username should have atleast 5 characters.')
    .max(20, 'Username should have atmost 10 characters.')
    .matches(/^\w+$/, 'Should be alphanumeric.');
const password = yup
    .string()
    .required('password is required.')
    .min(3, 'password should have atleast 5 characters.')
    .max(20, 'Username should have atmost 10 characters.');
const email = yup
    .string()
    .required('Email is required.')
    .email('This is invalid email.');
const userId = yup
    .string()
    .required('userId is required.');
const item = yup
    .string()
    .required('item is required.');
// User Registeration Validation Schema
exports.signUp = yup.object().shape({
    email,
    fullName,
    password
});
exports.signIn = yup.object().shape({
    email,
    password
});
exports.user = yup.object().shape({
    userId,
    item
});
//# sourceMappingURL=verify.js.map