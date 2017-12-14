const fs = require("fs");
const path = "lab5.json";

module.exports = {
  getById: function(id) {
    let data = fs.readFileSync(path);
    result = JSON.parse(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = result.filter(function(user) {
          return user.id == id;
        });
        // find User
        if (user[0]) {
            //console.log(user[0]);
          resolve(user[0]);
         
        } else {
          reject("Sorry ! User is not found.");
        }
      }, 5000);
    });
  }
};


//module.exports.getById(1001);
