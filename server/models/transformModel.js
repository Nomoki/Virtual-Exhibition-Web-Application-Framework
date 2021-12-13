import mongoose from "mongoose"

const transformSchema = mongoose.Schema({
    transX: Number,
    transY: Number,
    transZ: Number,
});

var TransformPosition = mongoose.model("position", transformSchema);

export default TransformPosition;