const redisConnection = require("./redis-connection");
const axios = require("axios");


redisConnection.on('SearchImg:request:*', async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    let requestData = message.data;
    console.log(requestData);
        getURL = async () => {
              let API_KEY = '6996404-66ef219c8c3288fc48c407058';
              let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(requestData.query);
              let request = await axios.get(URL);
              return request;
          };
          
        let request = await getURL();
        responsedata = request.data;
        let hits = responsedata.hits.map(function(obj) {
        return obj.previewURL;
});

        let successEvent = `${eventName}:success:${requestId}`;
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: { 
                response: hits,
                message: requestData.message,
                username: requestData.username
            },
            eventName: eventName
            });
      
});