const express = require("express")
const app = express()
const todosRoutes = require("./routes.js")

app.use(express.json())
app.use(todosRoutes)

app.get("/health", (req, res) => {
    return res.json("up")
})

app.listen(3333, () => console.log("Server up in 3333"));