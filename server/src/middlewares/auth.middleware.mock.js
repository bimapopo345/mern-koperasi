import jwt from "jsonwebtoken";
import { findUserById } from "../db/mockData.js";

// Middleware untuk verifikasi JWT Token dengan Mock Data
export const verifyToken = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan, akses ditolak",
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "koperasi-secret-key-2024"
    );

    // Cari user berdasarkan ID dari token di mock data
    const user = findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid, user tidak ditemukan",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Akun tidak aktif",
      });
    }

    // Attach user info ke request
    req.user = {
      userId: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token sudah expired, silakan login ulang",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Middleware untuk cek role admin
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak, hanya admin yang diizinkan",
    });
  }
};

// Middleware untuk cek role admin atau staff
export const requireAdminOrStaff = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "staff")) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak, hanya admin atau staff yang diizinkan",
    });
  }
};
