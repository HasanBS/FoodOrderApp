import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export async function POST(req: any) {
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI ?? '');

    const pass = body.password;
    if (pass.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }
    const notHashPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(notHashPassword, salt);
    body.password = hashPassword;
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}