"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var error_1 = require("./utils/error");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var _a = process.env, PORT = _a.PORT, ATLAS_USER = _a.ATLAS_USER, ATLAS_PASSWORD = _a.ATLAS_PASSWORD, ATLAS_DB_NAME = _a.ATLAS_DB_NAME;
var app = express_1.default();
// TODO: CORS Header Settings...
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/api", function (req, res) {
    res.json("API Endpoints...");
});
/**
 * 404 Not Found Handling
 */
app.use(function (req, res, next) {
    next(new error_1.CustomError(404, "Not Found"));
});
/**
 * Global Error Handler.
 * This takes all errors occured in the previous middlewares.
 * It must have 4 arguments.
 **/
app.use(function (err, req, res, next) {
    error_1.errorHandler(err, res);
});
/**
 * Connect to MongoDB Atlas and Start Lisening.
 */
mongoose_1.default
    .connect("mongodb+srv://" + ATLAS_USER + ":" + ATLAS_PASSWORD + "@practice01.po4lb.mongodb.net/" + ATLAS_DB_NAME + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log("[INFO] Successfully connected to MongoDB ATLAS");
    // Start Server
    app.listen(PORT, function () {
        console.log("[INFO] Web Server is now listening on Port " + PORT);
    });
})
    .catch(function (error) { return console.log(error); });
