import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    address: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);