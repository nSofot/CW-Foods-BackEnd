import mongoose from "mongoose";

const locationSchema = new mongoose.Schema ({
    locationId: {
        type: String,
        required: true, 
        unique: true
    },
    locationName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Location = mongoose.model("Location", locationSchema);

export default Location;