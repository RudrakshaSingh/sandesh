import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
   if (err instanceof ApiError) {
      if (process.env.NODE_ENV === "development") {
         console.error(err.stack);
      }
      return res.status(err.statusCode).json(err.toJSON());
   }

   console.error(err.stack);
   return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
};

export default errorHandler;