const express = require('express');
const router = express.Router();
const data = require("../data");
const tasksData = data.tasks;

router.get("/tasks", (req, res) => {
    tasksData.getAlltasks().then((taskList) => {
        res.json(taskList);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Task not found"});
    });
});

router.get("/tasks/:id", (req, res) => {
    tasksData.gettaskById(req.params.id).then((tasks) => {
        res.json(tasks)
    }).catch((error) => {
        res.status(404).json({message: "Task not found"});
    });
});


router.post("/tasks", (req, res) => {
    let data=req.body;
    tasksData.addTask(data.title,data.description,data.hoursEstimated,data.completed,data.comments)
        .then((newTask)=>{
             res.json(newTask);   
        }).catch((error)=>{
            res.status(500).send();
        });
});

router.put("/tasks/:id", (req, res) => {
    let data=req.body;
    let gettaskdata = tasksData.gettaskById(req.params.id);
    gettaskdata.then((taskdata) => {
        if (!taskdata) {
            return res.status(404).json({ message: "Recipe not found" });
        }
    });
    return tasksData.updateRecipe(req.params.id, data)
        .then((updateddata) => {
            res.json(updateddata);
        }, () => {
            res.sendStatus(500).send();
        });
});

router.patch("/tasks/:id", (req, res) => {
    let data=req.body;
    let getrecipedata = recipesData.getRecipeById(req.params.id);
    getrecipedata.then((recipedata) => {
        if (!recipedata) {
            return res.status(404).json({ message: "Recipe not found" });
        }
    });
    return recipesData.updateRecipe(req.params.id, data)
        .then((updateddata) => {
            res.json(updateddata);
        }, () => {
            res.sendStatus(500).send();
        });
});


module.exports = router;