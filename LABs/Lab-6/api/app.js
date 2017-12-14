const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

const redis = require('redis');
const client = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


app.use(bodyParser.json());

app.get("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "Get",
            data: {
                id: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/api/people", async (req, res) => {
    try {
        // if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.ip_address )
        //     throw {message: "Please give information of person like first_name, last_name, email, gender and ip_address"};

        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "Create",
            data: req.body
        });

        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


app.put("/api/people/:id", async (req, res) => {
    try {
        // if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.ip_address )
        //     throw {message: "Please give information of person like first_name, last_name, email, gender and ip_address"};

        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "Update",
            data: 
            {
                id: req.params.id,
                user:req.body
            }
        });

        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



app.delete("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "Delete",
            data: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});