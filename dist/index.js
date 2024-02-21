"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://my-app-topaz-gamma.vercel.app",
    allowedHeaders: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cookie_parser_1.default)());
app.get("/login", (req, res) => {
    res.cookie("authed-user", "abdus samad", {
        signed: true,
        httpOnly: true,
        secure: true,
        maxAge: Date.now() + 5 * 1000,
        sameSite: "strict",
    });
    res.json({
        cookie: "set",
    });
});
app.get("/secure", (req, res) => {
    res.json({
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
