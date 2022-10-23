const router = require("express").Router();
const MovieController = require("../controllers/MovieController");

router.get("/", MovieController.getMovies);
router.post("/", MovieController.createMovie);
router.put("/:imdbID", MovieController.editMovie);
router.put("/favorite/:imdbID", MovieController.addToFavorites);
router.delete("/:imdbID", MovieController.deleteMovie);

module.exports = router;
