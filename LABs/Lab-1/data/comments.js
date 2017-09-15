const mongoCollections = require("../config/mongoCollections");

const uuidv4 = require('uuid/v4');
const tasks = mongoCollections.tasks;


let exportedMethods = {
    getAllCommentsFromtaskId(id) {
        if (id === undefined) return Promise.reject("You must provide an ID");
        return tasks().then((tasksCollection) => {
            return tasksCollection.findOne({ _id: id }).then((data) => {
                if (data === 'undefined') throw "Comment not found from TaskID";
                let taskdata = data.comments;
                taskdata.forEach(function (task) {
                    task.taskId = data._id;
                    task.taskTitle = data.title;
                    task.description= data.description;
                    task.hoursEstimated= data.hoursEstimated;
                    task.completed= data.completed;
                    return task;
                });
                return taskdata;
            });
        });
    },

    gettasksFromCommentId(commentid) {
        if (commentid === undefined) return Promise.reject("You must provide an CommentID");
        return tasks().then((tasksCollection) => {
            return tasksCollection.findOne({ $where: "this.comments.id = '" + commentid + "'" }).then((data) => {
                if (data === 'undefined') throw "Task not found from CommentID";
                let taskdata = data.comments.filter(function (comments) {
                    return comments._id == commentid;
                })[0];
                taskdata.taskId = data._id;
                taskdata.taskTitle = data.title;
                taskdata.description = data.description;
                taskdata.hoursEstimated= data.hoursEstimated;
                taskdata.completed= data.completed;
                return taskdata;
            });
        });
    },
    addComment(id, name, comment) {
        if (name === undefined || comment === undefined) return Promise.reject("You must provide an name and comment");
        return tasks().then((tasksCollection) => {
            commentid = uuidv4()
            let addComment = {
                _id: commentid,
                name: name,
                comment: comment
            };
            return tasksCollection.updateOne({ _id: id }, { $push: { "comments": addComment } }).then(function () {
                return exportedMethods.gettasksFromCommentId(commentid).then((commentdata) => {
                    return commentdata;
                }, (err) => {
                    return Promise.reject("Cannot add this comment");
                });
            });
        });
    },
    removeComment(commentId) {
        return recipe().then((recipeCollection) => {
            return recipeCollection.updateOne(
                { "comments._id": commentId },
                { $unset: { "comments.$._id": commentId } }
            ).then((deletionInfo) => {
                if (deletionInfo.updatedCount === 0) {
                    throw (`Could not comment with id of ${commentId}`)
                }
            });
        });
    },
    updateComment(recipeId, commentId, updateddata) {
        return this.getCommentsFromCommentId(commentId).then((currentComment) => {
            if (!currentComment) throw "Comment is not found";

            let commentInfo = currentComment;
            if ('poster' in updateddata) {
                commentInfo.poster = updateddata.poster;
            }
            if ('comment' in updateddata) {
                commentInfo.comment = updateddata.comment;
            }
            delete commentInfo['recipeId'];
            delete commentInfo['reciipeTitle'];
            let updateCommentdata = {
                $set: { "comments.$": commentInfo }
            };
            return recipe().then((recipeCollection) => {
                return recipeCollection.updateOne({ "comments._id": commentId }, updateCommentdata).then(() => {
                    return this.getCommentsFromCommentId(commentId);
                });
            });
        });
    }

}

module.exports = exportedMethods;

exportedMethods.addComment("7bd982ca-f0bb-40ca-9de6-44a3d273c288", "hhhhhh", "hhhhhhh")
    .then(function (get) {
        console.log("----AddOne---");
        console.log(get);
    })

/*exportedMethods.getAllComments("a763ec62-239c-4f52-8cf0-3deec8cfffde")
        .then(function(get){
              console.log("----AllComments---");
              console.log(get);
        })
   
exportedMethods.removeComment("a763ec62-239c-4f52-8cf0-3deec8cfffde")
        .then(function(get){
              console.log("----RemoveComment---");
              console.log(get);
        })
   
exportedMethods.getCommentByCommentId("")
        .then(function(get){
              console.log("----GetComment---");
              console.log(get);
        })
   */
