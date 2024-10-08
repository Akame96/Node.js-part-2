const express = require("express");
const app = express();
const port = 3000;

const todos = [];
app.use(express.json());

app.get("/todos", (req, res) => res.send(todos));


app.put("/todos", (req, res) => res.end("Hai chiamato una put"));

app.post("/todos", (req, res) => res.end("Hai chiamato una post"));

app.delete("/todos", (req, res) => res.end("Hai chiamato una delete"));

app.listen(port, () =>
  console.log(`il server è in ascolto su http://localhost:${port}!`)
);
