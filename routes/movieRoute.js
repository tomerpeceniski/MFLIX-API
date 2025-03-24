import express from "express";
import movieService from "../services/moviesService.js";
import appLogger from "../logger/appLogger.js";
import movieSchemas from "../schemas/movieSchemas.js";
import { validator } from "../middlewares/validation.js";
import authRules from "../security/authRules.js";
import { auth } from "../middlewares/auth.js";

const movieRoute = express.Router();

movieRoute.get("/most-rated", auth(authRules.movies.get), validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most rated movies requested");
    const movies = await movieService.getMostRatedMovies(req.body);
    res.send(movies);
})

movieRoute.get("/most-commented", auth(authRules.movies.get), validator(movieSchemas.filterMoviesSchema), async (req, res) => {
    appLogger.info("Get most commented movies requested");
    const filters = req.body;
    const movies = await movieService.getMostCommentedMovies(filters);
    res.send(movies);
})

movieRoute.get("/:id", auth(authRules.movies.get), validator(movieSchemas.movieIdSchema, "params"), async (req, res, next) => {
    try {
        appLogger.info("Get movie from ID requested");
        const movie = await movieService.getMovieById(req.params.id)
        res.send(movie);
    } catch (e) {
        next(e);
    }
})

movieRoute.post("/rating", auth(authRules.movies.post), validator(movieSchemas.ratingMovieSchema), async (req, res) => {
    appLogger.info("Post new rate requested");
    const ratingInfo = req.body;
    const changedMovies = await movieService.addRate(ratingInfo);
    res.status(200).json({
        message: "Rating updated successfully",
        modifiedCount: changedMovies
    });
})

export default movieRoute;