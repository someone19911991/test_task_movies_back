require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const { pool, createDBTables } = require("./db");
const app = express();
const errorMiddleware = require("./middlewares/error-handler");

const { PORT } = process.env;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
    res.json('Here you are!');
});
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
    try {
        pool.connect();
        createDBTables();
        app.listen(PORT || 5000, () =>
            console.log(`App running on port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
