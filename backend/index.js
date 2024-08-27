const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const postRouter = require("./routes/postRoutes");
const bookRouter = require("./routes/bookRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://rentspot-j45m.onrender.com/"],
    credentials: true,
    sameSite: "none",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(userRouter);
app.use(profileRouter);
app.use(postRouter);
app.use(bookRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
