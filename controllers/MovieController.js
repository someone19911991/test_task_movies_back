const axios = require('axios');
const { pool } = require("../db");
const MovieService = require("../services/MovieService");
const UserService = require("../services/UserService");
const {OMDB_URL} = process.env

class MovieController {
    async getMovies(req, res, next){
        try{
            let response;
            if(Number(req.query?.i)){
                response = await pool.query(`SELECT * FROM movies WHERE id = $1`, [req.query.i]);
                response = response.rows[0];
            }else{
                const result = await axios.get(OMDB_URL, {params: req.query});
                response = result.data.Search || result.data || null;
            }
            return res.json(response);
        }catch(err){
            console.log(err)
            next(err);
        }
    }

    async createMovie(req, res, next) {
        let { title, year, runtime, genre, director, username, type, is_favorite, imdbid, poster } = req.body;
        imdbid = imdbid || null;
        is_favorite = !!is_favorite;
        poster = poster || null;

        try {
            const movieExists = await MovieService.checkIfMovieExists(title);
            if(movieExists){
                throw new Error('A movie with the same name already exists')
            }
            const result = await MovieService.createMovie(
                title,
                year,
                runtime,
                genre,
                director,
                imdbid,
                is_favorite,
                username,
                type,
                poster
            );

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteMovie(req, res, next){
        try{
            const { imdbID } = req.params;
            await pool.query(`DELETE FROM movies WHERE imdbid = $1`, [imdbID]);
            return res.json({imdbID});
        }catch(err){
            next(err);
        }
    }

    async addToFavorites(req, res, next){
        const {imdbid} = req.params;
        try{
            await pool.query(`UPDATE movies SET is_favorite = $1 WHERE imdbid = $2`, [req.body.is_favorite, imdbid]);
            return res.json({imdbid});
        }catch(err){
            next(err);
        }
    }

    async editMovie(req, res, next) {
        let { title, year, runtime, genre, director, name, type, is_favorite, imdbid, poster } = req.body;
        is_favorite = !!is_favorite;

        try {
            await UserService.createUserIfNotExists(name);
            const movieToHandle = await MovieService.checkIfMovieExists(title, imdbid);
            let result;

            if (!movieToHandle) {
                result = await MovieService.createMovie(
                    title,
                    year,
                    runtime,
                    genre,
                    director,
                    imdbid,
                    is_favorite,
                    name,
                    type,
                    poster
                );
            } else {
                result = await MovieService.updateMovie(
                    title,
                    year,
                    runtime,
                    genre,
                    director,
                    imdbid,
                    is_favorite,
                    name,
                    type,
                    poster
                );
            }

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MovieController();
