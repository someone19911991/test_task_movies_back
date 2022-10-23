const { Client } = require("pg");
const {PG_URL} = process.env

const pool = new Client(
    "postgres://orfzrpew:YC8aAFCiRS666coHjV5_kRCfLewzAX-u@mouse.db.elephantsql.com/orfzrpew"
);

const createDBTables = () => {
    pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL UNIQUE
    )`, [], (err) => {
        if(err){
            console.log(err.message);
            return;
        }
        pool.query(`CREATE TABLE IF NOT EXISTS movies(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        type VARCHAR(50) NOT NULL,
        year SMALLINT NOT NULL,
        runtime VARCHAR(20) NOT NULL,
        genre VARCHAR(255),
        director VARCHAR(255),
        is_favorite BOOLEAN DEFAULT FALSE,
        imdbid VARCHAR(12),
        poster TEXT,
        username VARCHAR(255),
        
    FOREIGN KEY (username) REFERENCES users (name)
        )`);
    });
};

module.exports = {pool, createDBTables};
