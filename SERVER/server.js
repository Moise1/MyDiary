import express from "express";
import router from "./routes/routeIndex";
import ResponseHandler from "../SERVER/utils/responseHandler";


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => res
.status(200)
.json(new ResponseHandler(200, "Welcome to My Diary!", null).result()));


app.use("*", (req, res) => res
.status(405)
.json(new ResponseHandler(405, "Method Not Allowed!", null).result()));


// eslint-disable-next-line
const port = process.env.PORT || 3000;
app.listen(port);

export default app;