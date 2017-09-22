const constructorMethod = (app) => {
   app.get("/", (req, response) => {
        response.render("home", { pageTitle: "Top 10 Apple Products" });
    });

    app.use("*", (req, response) => {
        response.status(400).render("error", { pageTitle: "404: Not Found" });
    });
}

module.exports = constructorMethod;