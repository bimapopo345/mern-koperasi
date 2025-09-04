import dotenv from "dotenv";
dotenv.config();

const conf = {
  mongodbUri: String(process.env.MONGO_DB_URL),
  jwtSecret: String(process.env.JWT_SECRET),
  stripeSecretKey: String(process.env.STRIPE_SECRET_KEY),
  port: String(process.env.PORT),
  corsOrigin1: String(process.env.CORS_ORIGIN1),
  corsOrigin2: String(process.env.CORS_ORIGIN2),
  corsOrigin3: String(process.env.CORS_ORIGIN3),
  serverUrl: String(process.env.SERVER_URL || `http://localhost:${process.env.PORT || 8000}`),
  clientUrl: String(process.env.CLIENT_URL || "http://localhost:5173"),
};

export default conf;
