const sql = require("./db.js");

// constructor
const Driver = function(driver) {
    this.name = driver.name;
    this.team = driver.team;
    this.teamid = driver.teamid;
    this.seasons = driver.seasons;
    this.championships = driver.championships;
    this.points = driver.points;
};

Driver.create = (newDriver, result) => {
    sql.query("INSERT INTO driver SET ?", newDriver, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created driver: ", { id: res.insertId, ...newDriver });
        result(null, { id: res.insertId, ...newDriver });
    });
};


Driver.getAll = result => {
    sql.query("SELECT * FROM driver ORDER BY points DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("drivers: ", res);
        result(null, res);
    });
};


Driver.findById = (driverId, result) => {
    sql.query(`SELECT * FROM driver WHERE id = ${driverId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found driver: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Driver.updateById = (id, driver, result) => {
    sql.query(
        "UPDATE driver SET points = ? WHERE id = ?",
        [driver.points, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated driver: ", { id: id, ...driver });
            result(null, { id: id, ...driver });
        }
    );
};



module.exports = Driver;
