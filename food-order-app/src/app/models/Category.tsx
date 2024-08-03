import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    icon: {
        type: String,
    },
}, { timestamps: true });

export const Category = models?.Category || model('Category', CategorySchema);