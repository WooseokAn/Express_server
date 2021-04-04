"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const error_1 = require("./utils/error");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const camera_1 = __importDefault(require("./routes/camera"));
const record_1 = __importDefault(require("./routes/record"));
const section_1 = __importDefault(require("./routes/section"));
const { PORT, ATLAS_USER, ATLAS_PASSWORD, ATLAS_DB_NAME } = process.env;
const app = express_1.default();
// TODO: CORS Header Settings...
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/camera", camera_1.default);
app.use("/api/record", record_1.default);
app.use("/api/section", section_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_jsdoc_1.default(swagger_1.default)));
app.get("/welcome", (req, res) => {
    res.json("Welocme, This is an API Server for CSID-DGU Graduation Project");
});
/**
 * 404 Not Found Handling
 */
app.use((req, res, next) => {
    next(new error_1.CustomError(404, "Not Found"));
});
/**
 * Global Error Handler.
 * This takes all errors occured in the previous middlewares.
 * It must have 4 arguments.
 **/
app.use((err, req, res, _next) => {
    error_1.errorHandler(err, res);
});
/**
 * Connect to MongoDB Atlas and Start Lisening.
 */
mongoose_1.default
    .connect(`mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@practice01.po4lb.mongodb.net/${ATLAS_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("[INFO] Successfully connected to MongoDB ATLAS");
    // Start Server
    app.listen(PORT, () => {
        console.log(`[INFO] Web Server is now listening on Port ${PORT}`);
    });
})
    .catch(error => console.log(error));
