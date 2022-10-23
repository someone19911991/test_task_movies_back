const { pool } = require("../db");

class MovieService {
    async checkIfMovieExists(title, imdbID = null) {
        let queryText = `SELECT * FROM movies WHERE title = $1`;
        let queryDependencies = [title];
        if (imdbID) {
            queryText += `OR imdbid = $2`;
            queryDependencies.push(imdbID);
        }
        let result = await pool.query(queryText, queryDependencies);
        return result.rows.length ? result.rows[0] : false;
    }

    async createMovie(...props) {
        const result = await pool.query(
            `INSERT INTO movies(title, year, runtime, genre, director, imdbid, is_favorite, username, type, poster) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            props
        );
        return result.rows[0];
    }

    async updateMovie(...props){
        const result = await pool.query(
            `UPDATE movies SET title = $1, year = $2, runtime = $3, genre = $4, director = $5, username = $6, is_favorite = $7, type = $8, poster = $9 WHERE imdbID = $10 RETURNING *`,
            props
        );

        return result.rows[0];
    }
}

module.exports = new MovieService();
