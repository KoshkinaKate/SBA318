const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

//middleware------------
const animals = require("./zoo/animals");
const employees = require("./zoo/employees");
const food = require("./zoo/food");
const bodyParser = require("body-parser");
app.use('/public', express.static('public'));

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

// Error-handling middleware
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

// POST route
app.post("/api/animals", (req, res) => {
    const newAnimal = req.body; 

    animals.push(newAnimal); 
    res.status(201).json(newAnimal); 
});
//in order to work with postman - open it GET + localhost.. -SEND
//1. change GET to POST --- body --- raw --- JSON - add data - SEND

// PUT 

app.put("/api/animals/:breed", (req, res) => {
    const breedToUpdate = req.params.breed;
    const updatedAnimalData = req.body; 


    const index = animals.findIndex(animal => animal.breed === breedToUpdate); // Find the index of the animal to update

    animals[index] = updatedAnimalData;

    res.json(animals[index] || { error: "Animal not found" });
});


// app.put("/api/animals", (req, res) => {
//     const updatedAnimalData = req.body; 

//     animals.forEach((animal, index) => {
//         animals[index] = updatedAnimalData;
//     });

//     res.json(animals); 

// DELETE
app.delete("/api/animals/:breed", (req, res) => {
    const breedToDelete = req.params.breed;

    const index = animals.findIndex(animal => animal.breed === breedToDelete);
    if (index !== -1) {
        const deletedAnimal = animals.splice(index, 1)[0];
        res.json(deletedAnimal);
    } else {
        res.status(404).json({ error: "Animal not found" });
    }
});
// React template engine
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())


  app.set("views", "./views"); // specify the views directory


app.get("/", (req, res) => { // can chenge directore like /api/animals
  let options = {
    title: " This is Zoo",
    content:
      " this is very important content",
  };
  res.render("Index", options); // important line jsx rander when user hits the touter 
}); // can chenge then "index" to file it should be linked to, like "animals"









app.listen(PORT, () => {
    console.log(`Listening on Port: 3002`);
  });