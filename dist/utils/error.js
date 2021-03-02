"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomError = CustomError;
const errorHandler = (error, res) => {
    const { statusCode, message } = error;
    res.status(statusCode || 500).json({
        statusCode,
        message,
    });
};
exports.errorHandler = errorHandler;
