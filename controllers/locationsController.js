import Location from "../models/locations.js";
import { isAdmin } from "./userController.js";

export async function addLocation(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "You are not authorized to add location" });
  }

  try {
    const existing = await Location.findOne({ locationName: req.body.locationName });
    if (existing) return res.status(400).json({ message: "Location name already exists" });

    const lastLocation = await Location.findOne().sort({ locationId: -1 });
    const newId = lastLocation ? parseInt(lastLocation.locationId) + 1 : 1;
    const locationId = String(newId).padStart(3, "0");

    const location = new Location({ ...req.body, locationId });
    await location.save();

    res.json({ message: "Location added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding location", error: err.message });
  }
}


export async function getLocations(req,res) {
    try{
        const location = await Location.find()
        res.json(location)
    }
    catch(err){
        res.status(500).json({
            message : "Error getting location",
            error: err
        })
    }
}

export async function getLocationById(req, res) {
    const locationId = req.params.locationId;
    try {
        const location = await Location.findOne({ locationId: locationId });
        if (location == null) {
            res.status(404).json({
                message: "Location not found",
            });
            return;
        }
        res.json(location);
    } catch (err) {
        res.status(500).json({
            message: "Error getting location",
            error: err,
        });
    }
};

export async function deleteLocation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to delete location",
        });
    }
    try {
        const locationId = req.params.locationId;
        await Location.deleteOne({ locationId: locationId });
        res.json({ message: "Location deleted" });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting location",
            error: err,
        });
    }
};

export async function updateLocation(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "You are not authorized to update location",
        });
    }
    try {
        const locationId = req.params.locationId;
        await Location.updateOne({ locationId: locationId }, { $set: req.body });
        res.json({ message: "Location updated" });
    } catch (err) {
        res.status(500).json({
            message: "Error updating location",
            error: err,
        });
    }
};