const Team = require("../models/team.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const team = new Team({
        name: req.body.name,
        driver1: req.body.driver1,
        driver2: req.body.driver2,
        seasons: req.body.seasons,
        championships: req.body.championships,
        points: req.body.points,
        driver1id: req.body.driver1id,
        driver2id: req.body.driver2id
    });

    // Save Customer in the database
    Team.create(team, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Team.findById(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.teamId
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

    Team.updateById(
        req.params.teamId,
        new Team(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found driver with id ${req.params.teamId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating driver with id " + req.params.teamId
                    });
                }
            } else res.send(data);
        }
    );
};
