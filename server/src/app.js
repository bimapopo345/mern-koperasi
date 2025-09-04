import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import conf from "./conf/conf.js";

const app = express();
app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: conf.CORS_ORIGIN.replace(/\/$/, ""),
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [conf.corsOrigin1, conf.corsOrigin2, conf.corsOrigin3].filter(Boolean);
      
      // In production, also allow the EC2 host without port for Nginx
      if (process.env.NODE_ENV === 'production') {
        const ec2Host = process.env.EC2_HOST || conf.corsOrigin1?.replace(':5000', '');
        if (ec2Host) {
          allowedOrigins.push(`http://${ec2Host}`);
          allowedOrigins.push(`https://${ec2Host}`);
        }
      }
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        console.log('Allowed origins:', allowedOrigins);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve uploads folder
app.use(cookieParser());

import Routes from "./routes/index.js";
import adminRoutes from "./routes/admin.routes.js";
app.use("/api", Routes);
app.use("/api", adminRoutes);

app.post("/testing", (req, res) => {
  console.log("Testing");
  res.send("Hello testing completed");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

export { app };
