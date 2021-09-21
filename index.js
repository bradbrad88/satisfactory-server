const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = require("./router");
const corsOptions = {
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
router(app);

const port = parseInt(process.env.PORT) || 5000;

app.listen(port);

console.log("App listening on port", port);

// const models = require('./models')

// const items = models.Item.findAll()

// console.log('Items', items);
