const Driver = require("../models/driver.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const driver = new Driver({
        name: req.body.name,
        team: req.body.team,
        teamkey: req.body.teamkey,
        seasons: req.body.seasons,
        championships: req.body.championships
    });

    // Save Customer in the database
    Driver.create(driver, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Driver.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
