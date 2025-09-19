import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/auth.js";
import questionRouter from "./routes/questions/questions.js";
import { swaggerSpec, swaggerUi } from "./swagger.js";
import { connectDB } from "./db.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.set("trust proxy", true); // agar proxy ortida bo‘lsa shart

// ✅ CORS barcha domenlarga ruxsat
app.use(cors({
    origin: "*",      // barcha URL’lar
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);
app.use("/questions", questionRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on http://localhost:3000");
        console.log("Swagger docs at http://localhost:3000/api-docs");
    });
}).catch((err: Error) => {
    console.log("Databasega ulanishda xatolik: ", err);
});
