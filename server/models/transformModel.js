import mongoose from "mongoose"

const transformSchema = mongoose.Schema({
    transX: String,
    transY: String,
    transZ: String,
});

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;