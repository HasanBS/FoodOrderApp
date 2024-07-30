import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req: any) {
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}