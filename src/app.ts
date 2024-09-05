import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/", router);

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hurrah server is running!");
});

//Global Error Handler
app.use(globalErrorHandler);

//Not Found erroor handler
app.use(notFound);

export default app;
