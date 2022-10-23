const {pool} = require("../db");

class UserService{
    async createUserIfNotExists(username) {
        let result = await pool.query(`SELECT * FROM users WHERE name = $1`, [
            username,
        ]);

        if(result.rows.length){
            return result.rows[0];
        }

        result = await pool.query(`INSERT INTO users(name) values($1) RETURNING *`, [username]);
        return result.rows[0];
    }
}

module.exports = new UserService()