const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Ensure we check if the user exists in DB

const authMiddleware = async (req, res, next) => {
    try {
        // ✅ Check for token in both cookies and headers
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // ✅ Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = authMiddleware;
