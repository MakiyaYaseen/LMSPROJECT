import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createReview, getReviews } from "../controller/reviewController.js"
const reviewRouter = express.Router()
reviewRouter.post("/createReview" ,isAuth , createReview )
reviewRouter.get("/getreview", getReviews);    
reviewRouter.get("/getreview/:id", getReviews);
export default reviewRouter;