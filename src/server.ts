import express from "express";

const app = express();

app.get("/test", (request, response) => {
    return response.send("Retorno método GET")
});
app.post("/test", (request, response) => {
    return response.send("Retorno método POST")
});

app.listen(3000, () => console.log(`🍺 Server is running`))