const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5173", "https://foodrecipe-one-peach.vercel.app"], // ✅ Allow frontend URLs
    })
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
