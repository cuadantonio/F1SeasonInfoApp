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
        teamid: req.body.teamid,
        seasons: req.body.seasons,
        championships: req.body.championships,
        points: req.body.points
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

exports.findOne = (req, res) => {
    Driver.findById(req.params.driverId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.driverId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.driverId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Driver.updateById(
        req.params.driverId,
        new Driver(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found driver with id ${req.params.driverId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating driver with id " + req.params.driverId
                    });
                }
            } else res.send(data);
        }
    );
};
