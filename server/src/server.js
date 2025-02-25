const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(
    cors()
  );
app.use(express.json());
app.use(cookieParser());

connectDB();




app.get("/", (req, res) => {
    res.send("Welcome to the Recipe API!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
