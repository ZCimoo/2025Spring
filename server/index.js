const express = require("express");
const productsController = require("./controllers/products");
const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/products", productsController);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

console.log("Hello World!");
