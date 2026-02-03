import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "User not authenticated: Token is missing" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "User not authenticated: Invalid token" });
        }

        // --- YE LINE YAHAN ADD KAREIN ---
        console.log("Token Decoded Data:", verifyToken); 
        // -------------------------------

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.error("isAuth Middleware Error:", error.message);
        return res.status(401).json({ message: "Authentication Failed: Please log in again" });
    }
};

export default isAuth;