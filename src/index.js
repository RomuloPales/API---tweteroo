import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users =[]

const tweet = []

app.post("/sign-up", (req,res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
        res.status(400).send({ error: "Todos os campos são obrigatórios" });
        return;
    }

    const userExist = users.find((user) => user.username === username)
    if (userExist) {
        res.status(409).send({ error: "Usuário já existe." });
        return;
    }
    users.push({ username, avatar });
    res.status(201).send({ message: "OK" });
});



app.listen(5000, () => {
  console.log("server running in port 5000");
});
