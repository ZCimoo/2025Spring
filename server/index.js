const express = require("express");
const productsController = require("./controllers/products");
const PORT = 8000;

const app = express();

app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })
  .use("/api/v1/products", productsController);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const error = {
    status,
    message: err.message || "Internal Server Error",
  };
  res.status(status).send(error);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
/*
Asynchronous Patterns in Node.js
1. Callbacks
2. Pipelines
3. Promises
4. Async/Await
*/

console.log("Hello World!");

/*
Ways to send data to the server
1. Path parameters: /users/123
2. Query parameters: ?name=John&age=30
3. Headers
    3.5. Cookies
4. Request body
    4.0. Form data: name=John&age=30
    4.5. JSON data: { "name": "John", "age": 30 }
*/
/*
parts of a url
1. Protocol: http:// or https://
2. Domain: www.example.com
3. Port :80 or :443
4. Path: /path/to/resource
5. Query parameters: ?name=John&age=30
6. Fragment: #section1

example: https://www.example.com:80:path/to/resource?name=John&age=30#section1
*/
/*
Module Types
1. CommonJS: 
    import: require('module')
    export: module.exports={ functions, variables, etc. }
2. ES6: 
    import: import { module } from 'module'
    export: export { module }

*/
