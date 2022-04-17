const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 7000;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const colors = require("colors");
const cors = require('cors');
const connectDb = require('./config/db');
connectDb();
// const product = require('./models/productModel');
// product.insertMany()
// const {daysales} = require('./utils/reportsutil')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/expenses', require('./routes/expensesRoutes'));
app.use('/api/org', require('./routes/orgRoute'))
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
