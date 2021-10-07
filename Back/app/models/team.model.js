const sql = require("./db.js");

// constructor
const Team = function(team) {
    this.name = team.name;
    this.driver1 = team.driver1;
    this.driver2 = team.driver2;
    this.seasons = team.seasons;
    this.championships = team.championships;
    this.points = team.points;
    this.driver1id = team.driver1id;
    this.driver2id = team.driver2id;
};

Team.create = (newTeam, result) => {
    sql.query("INSERT INTO team SET ?", newTeam, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created team: ", { id: res.insertId, ...newTeam });
        result(null, { id: res.insertId, ...newTeam });
    });
};


Team.getAll = result => {
    sql.query("SELECT * FROM team ORDER BY points DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("teams: ", res);
        result(null, res);
    });
};


Team.findById = (teamId, result) => {
    sql.query(`SELECT * FROM team WHERE id = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Team.updateById = (id, team, result) => {
    sql.query(
        "UPDATE team SET points = ? WHERE id = ?",
        [team.points, id],
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

            console.log("updated team: ", { id: id, ...team });
            result(null, { id: id, ...team });
        }
    );
};



module.exports = Team;
