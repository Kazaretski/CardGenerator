import express, { Express } from "express";
import ejs from "ejs";
import path from "path";
// -------------------------------------------------------
const app: Express = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("port", 3000);
// -------------------------------------------------------
interface Card {
    letter: string,
    number: number,
    color: string
} let cardAmount: number = 100;
let deck: Card[] = [];
let startingNumber = 0;
for (let i = 0; i < cardAmount; i++) {
    let allLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let allColors: string[] = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "white"];
    deck.push({
        letter: allLetters[Math.round(Math.random() * allLetters.length) - 1],
        number: startingNumber += Math.round(Math.random() * 3) + 1,
        color: allColors[Math.round(Math.random() * allColors.length) - 1]
    });
}
// -------------------------------------------------------
app.get("/", (req, res) => {
    res.render("mainPage", {cards: deck});
});
// -------------------------------------------------------
app.listen(app.get("port"), async() => {
    console.log(`[STATUS] Server started on http://localhost:${app.get("port")}`);
});