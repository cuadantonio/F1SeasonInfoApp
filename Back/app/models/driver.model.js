const sql = require("./db.js");

// constructor
const Driver = function(driver) {
    this.name = driver.name;
    this.team = driver.team;
    this.teamkey = driver.teamkey;
    this.seasons = driver.seasons;
    this.championships = driver.championships;
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
    sql.query("SELECT * FROM driver", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("drivers: ", res);
        result(null, res);
    });
};



module.exports = Driver;
