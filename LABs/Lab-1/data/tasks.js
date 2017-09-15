const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const comments = require("./comments");
const uuidv4 = require('uuid/v4');

let exportedMethods = {
    getAlltasks() {
        return tasks().then((tasksCollection) => {
            return tasksCollection.find({}).project({ _id: 1, title: 1,description: 1,hoursEstimated: 1,completed:1,comments:1 }).toArray()
        })
    },
    gettaskById(id) {
        if(!id) return Promise.reject("No id provided");
        return tasks().then((tasksCollection) => {
            return tasksCollection.findOne({ _id: id }).then((tasks) => {
                if (!tasks) throw "Task not found";
                return tasks;
            });
        });
    },
    addtask(title, description, hoursEstimated,completed,comments) {
        return tasks().then((tasksCollection) => {
            let newtask = {
                 title: title,
                 description: description,
                 hoursEstimated: hoursEstimated,
                 completed:completed,
                 comments:[],
                 _id: uuidv4()
            };

            return tasksCollection.insertOne(newtask).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.gettaskById(newId);
            });
        });
    },
   
    updatetask(id, updateddata) {
           if(!id && !updateddata) 
                return Promise.reject("You have to provide id and data");
            return this.gettaskById(id).then((currenttask)=> {
            let taskdata = {};
            if ('title' in updateddata) {
                taskdata.title = updateddata.title;
            }
             if ('description' in updateddata) {
                taskdata.description = updateddata.description;
            }
            if ('hoursEstimated' in updateddata) {
                taskdata.hoursEstimated = updateddata.hoursEstimated;
            }
            if ('completed' in updateddata) {
                taskdata.completed = updateddata.completed;
            }
            
            let updateCommand = {
                $set: taskdata
            };
              return tasks().then((tasksCollection) => {
                return tasksCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.gettaskById(id);
                });
            });
        });
    }
}

module.exports = exportedMethods;

/*
exportedMethods.addtask("Go To Gym", "I love to gym","5","false").then(function (data) {
        console.log("----Add-");
        console.log(data);
    })/*
exportedMethods.getAlltasks()
        .then(function(all){
              console.log("----GetAll---");
            console.log(all);
        })

*/exportedMethods.gettaskById("7bd982ca-f0bb-40ca-9de6-44a3d273c288")
        .then(function(get){
              console.log("----GetOne---");
              console.log(get);
        })
   
 let data = {
    title: "RRRR",
    description: "description",
    hoursEstimated: "hoursEstimated",
    completed:"completed"
   
};
/*exportedMethods.updatetask("7bd982ca-f0bb-40ca-9de6-44a3d273c288",data)
        .then(function(newtask){
             console.log("----Update---");
            console.log(newtask);
       
    });
*/
