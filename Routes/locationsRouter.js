import express from "express";
import { addLocation } from "../controllers/locationsController.js";
import { getLocations } from "../controllers/locationsController.js";
import { getLocationById } from "../controllers/locationsController.js";
import { deleteLocation } from "../controllers/locationsController.js";
import { updateLocation } from "../controllers/locationsController.js"; 

const locationsRouter = express.Router();

locationsRouter.post("/", addLocation);
locationsRouter.get("/", getLocations);
locationsRouter.get("/:locationId", getLocationById);
locationsRouter.delete("/:locationId", deleteLocation);
locationsRouter.put("/:locationId", updateLocation);

export default locationsRouter;