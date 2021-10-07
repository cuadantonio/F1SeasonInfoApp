module.exports = app => {
    const team = require("../controllers/team.controller.js");

    // Create a new Driver
    app.post("/api/teams", team.create);

    // Retrieve all Drivers
    app.get("/api/teams", team.findAll);

    // Retrieve a single Driver with driverId
    app.get("/api/teams/:teamId", team.findOne);

    // Update a Driver with driverId
    app.put("/api/teams/:teamId", team.update);

};

