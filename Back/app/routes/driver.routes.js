module.exports = app => {
    const driver = require("../controllers/driver.controller.js");

    // Create a new Driver
    app.post("/api/drivers", driver.create);

    // Retrieve all Drivers
    app.get("/api/drivers", driver.findAll);

    // Retrieve a single Driver with driverId
    app.get("/api/drivers/:driverId", driver.findOne);

    // Update a Driver with driverId
    app.put("/api/drivers/:driverId", driver.update);

};
