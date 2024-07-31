import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: any) {
    const data = await req.json();
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const session = await getServerSession(authOptions as any) as any;
    const email = session?.user?.email;
    await User.updateOne({ email }, data);
    return Response.json(true);
}

export async function GET(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const session = await getServerSession(authOptions as any) as any;
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    return Response.json(user);
}
