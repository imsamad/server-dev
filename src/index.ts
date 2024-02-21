import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "https://my-app-topaz-gamma.vercel.app",
    allowedHeaders: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.text());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../", "public")));

app.post("/login", (req, res) => {
  res.cookie("authed-user" + Date.now(), "abdus samad", {
    // signed: true,
    httpOnly: true,
    secure: true,
    maxAge: Date.now() + 5 * 1000,
    sameSite: "strict",
  });

  res.json({
    cookies: req.cookies,
  });
});

app.get("/secure", (req, res) => {
  res.json({
    set: "true",
    cookies: req.cookies,
  });
});

app.get("/", (req, res) => {
  res.json({
    cookies: req.cookies,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT);
