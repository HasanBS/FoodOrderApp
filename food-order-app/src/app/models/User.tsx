import bcrypt from 'bcrypt';
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return value.length >= 6;
            },
            message: 'Password must be at least 6 characters long',
        },
    },
}, { timestamps: true });

UserSchema.post('validate', function (user) {
    const notHashPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashPassword, salt);
}
);

export const User = models?.User || model('User', UserSchema);