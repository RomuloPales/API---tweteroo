import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users =[];
const tweets = [];

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

app.post("/tweets" ,(req,res) => {
    const { username , tweet } = req.body
    const userExists = users.find((user) => user.username === username)
    if(!userExists){
            res.status(401).send({ message: "UNAUTHORIZED" });
            return;
    }
    if(!tweet){
        res.status(400).send({ error: "Todos os campos são obrigatórios" });
        return;
    }
    tweets.push({username, tweet})
    res.status(201).send({ message: "OK" });
})

app.get("/tweets", (req, res) => {
    const lastTen = tweets.slice(-10)

    tweets.forEach((tweet) => {
        const { avatar } = users.find((user) => user.username === tweet.username);
        tweet.avatar = avatar;
      });
      
    res.send(lastTen)
})

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params

    const tweetsUser = tweets.filter(
        (tweet) => tweet.username.toLowerCase() === username.toLowerCase()
      );
    
      res.send(tweetsUser);
    });

app.listen(5000, () => {
  console.log("server running in port 5000");
});
