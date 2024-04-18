const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

//middleware-----------
const animals = require("./zoo/animals");
const employees = require("./zoo/employees");
const food = require("./zoo/food");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// DATA FOR ANIMALS
// ----------------------> Gets all data
app.get("/api/animals", (req, res) => {
    res.json(animals);
  });
  // ----------------------> Gets speicific data
  
  app.get("/api/animals/:breed", (req, res) => {
    const animal = animals.find((b) => b.breed == req.params.breed);
    if (animal) res.json(animal);
    // res.send(req.params.breed)
  });
// DATA FOR EMPLOYEES
  app.get("/api/employees", (req, res) => {
    res.json(employees);
  });

  app.get("/api/employees/:id", (req, res) => {
    const employee = employees.find((e) => e.id == req.params.id);
    if (employee) res.json(employee);
  });

//   DATA FOR FOOD SCHEDULE 
  app.get("/api/food", (req, res) => {
    res.json(food);
  });

  app.get("/api/food/:breed1", (req, res) => {
    const foods = food.find((f) => f.breed1 == req.params.breed1);
    if (foods) res.json(foods);
  });
















app.listen(PORT, () => {
    console.log(`Listening on Port: 3002`);
  });