const express = require('express');
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;

router.post("/tasks/:id/comments", (req, res) => {
    let data=req.body;
    commentsData.addComment(req.params.recipeId,data.poster,data.comment)
    .then((addcomment)=>{
        res.json(addcomment);
    }).catch((e) => {
            res.status(500).json({ error: e });
    });
    
});

router.delete("/tasks/:taskId/:commentId", (req, res) => {
    return commentsData.removeComment(req.params.id)
        .then((data)=>
        {
            res.sendStatus(200);
        }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Comment not found"});
    });
});

module.exports = router;