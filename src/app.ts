import "dotenv/config";
import { CustomError, errorHandler } from "./utils/error";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const { PORT, ATLAS_USER, ATLAS_PASSWORD, ATLAS_DB_NAME } = process.env;
const app = express();

// TODO: CORS Header Settings...
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json("API Endpoints...");
});

/**
 * 404 Not Found Handling
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(404, "Not Found"));
});

/**
 * Global Error Handler.
 * This takes all errors occured in the previous middlewares.
 * It must have 4 arguments.
 **/
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, res);
});

/**
 * Connect to MongoDB Atlas and Start Lisening.
 */
mongoose
  .connect(
    `mongodb+srv://${ATLAS_USER as string}:${ATLAS_PASSWORD as string}@practice01.po4lb.mongodb.net/${
      ATLAS_DB_NAME as string
    }?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("[INFO] Successfully connected to MongoDB ATLAS");

    // Start Server
    app.listen(PORT, () => {
      console.log(`[INFO] Web Server is now listening on Port ${PORT as string}`);
    });
  })
  .catch(error => console.log(error));
