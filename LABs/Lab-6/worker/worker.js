const redisConnection = require("./redis-connection");
const jsonFileObject = require("jsonfile");
const fs=require("fs");
const axios = require("axios");
let isData = null;
let inc = 1;
getData = async () => {
    if(isData){
        return isData;}
    let gistUrl =
    "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json";
    let gist = await axios.get(gistUrl);
    isData = gist.data;
    return isData;
};


redisConnection.on('Get:request:*', async (message, channel) => {
    let gistresults = await getData();
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let user = gistresults.filter(function (user) {
        return user.id == message.data.id;
    });
    let resposeData;
    if (user.length > 0) {
        resposeData = user[0];
    }
    else {
        resposeData = { error: "Sorry ! Not Found " };
    }
    
    if (resposeData) {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: resposeData,
            eventName: eventName
        });
    } else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: { message: "Sorry! Not found User!" },
            eventName: eventName
        });
    }
    
});

redisConnection.on('Delete:request:*',async (message, channel) => {
    let gistresults = await getData();
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let index = gistresults.findIndex(function (user) {
        return user.id == message.data.id;
    });
    let resposeData;
    if (index > -1) {
        resposeData = { details: "User removed!" };
    }
    else {
        resposeData = { error: "Sorry ! User Not Found " };
    }

    if (index > -1) {
        gistresults.splice(index, 1);
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: resposeData,
            eventName: eventName
        });
    } else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: { message: "Sorry ! Not Found User!" },
            eventName: eventName
        });
    }
});

redisConnection.on('Create:request:*', async (message, channel) => {
    let gistresults = await getData();
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    message.data.id = "cust_"+inc;
    inc++;

    gistresults.push(message.data);

    let user = gistresults.filter(function (user) {
        return user.id == message.data.id;
    });
    

    if (user) {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: user[0],
            eventName: eventName
        });
    } else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: { message: "Sorry! Not Found ! Can't add this User" },
            eventName: eventName
        });
    }
});

redisConnection.on('Update:request:*', async (message, channel) => {
    let gistresults = await getData();
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let index = gistresults.findIndex(function (user) {
        return user.id == message.data.id;
    });
    
    if(index>-1)
    {
        gistresults[index].first_name = message.data.user.first_name;
        gistresults[index].last_name = message.data.user.last_name;
        gistresults[index].email = message.data.user.email;
        gistresults[index].gender = message.data.user.gender;
        gistresults[index].ip_address = message.data.user.ip_address;

        let user = gistresults.filter(function (user) {
            return user.id == message.data.id;
        });
        
    
        if (user) {
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: user[0],
                eventName: eventName
            })};

    }else {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: { message: "Sorry! Not Found ! Can't Update this User" },
            eventName: eventName
        });
    }
});




