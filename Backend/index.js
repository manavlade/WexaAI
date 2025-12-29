import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import settingsRoutes from "./routes/settings.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [
        'http://localhost:5173',
        "https://wexa-ai-xi.vercel.app/"
    ],
    
    credentials: true
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/settings", settingsRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})


