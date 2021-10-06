module.exports = app => {
    const driver = require("../controllers/driver.controller.js");

    // Create a new Customer
    app.post("/api/drivers", driver.create);

    // Retrieve all Customers
    app.get("/api/drivers", driver.findAll);
/*
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", customers.findOne);

    // Update a Customer with customerId
    app.put("/customers/:customerId", customers.update);

    // Delete a Customer with customerId
    app.delete("/customers/:customerId", customers.delete);

    // Create a new Customer
    app.delete("/customers", customers.deleteAll);*/
};
