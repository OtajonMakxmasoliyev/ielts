import express from "express";
import authRouter from "./routes/auth/auth.js";
import questionRouter from "./routes/questions/questions.js";
import { swaggerSpec, swaggerUi } from "./swagger.js";
import { connectDB } from "./db.js"
const app = express();

app.use(express.json());
app.set("trust proxy", true); // agar proxy ortida bo‘lsa shart

// Swagger UI

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);
app.use("/questions", questionRouter);



connectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
        console.log("Swagger docs at http://localhost:3000/api-docs");
    });

}).catch((err: Error) => {
    console.log("Databasega ulanishda xatolik: ", err);

})
