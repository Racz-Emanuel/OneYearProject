// api/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// Let's use a hardcoded fallback string for local testing to guarantee they match!
const JWT_SECRET = process.env.JWT_SECRET || "MY_TOTAL_SECRET_KEY_12345";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    // Verifies using the secret key string
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
