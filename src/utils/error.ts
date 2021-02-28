import { Response } from "express";

export class CustomError extends Error {
    public statusCode?: number;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorHandler = (error: CustomError, res: Response): void => {
    const { statusCode, message } = error;

    res.status(statusCode || 500).json({
        statusCode,
        message,
    });
};
