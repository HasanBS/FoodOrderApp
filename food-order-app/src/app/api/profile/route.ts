import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from '../../models/UserInfo';

export async function PUT(req: any) {
    const data = await req.json();
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const session = await getServerSession(authOptions as any) as any;
    const email = session?.user?.email;
    const {name , image , ...userInfo} = data;
    if (!email) {
        return Response.json(false);
    }
    
    await User.updateOne({ email }, {name:name, image: image});
    await UserInfo.findOneAndUpdate({ email }, userInfo, { upsert: true });

    return Response.json(true);
}

export async function GET(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const session = await getServerSession(authOptions as any) as any;
    const email = session?.user?.email;
    if (!email) {
        return Response.json({});
    }
    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();
    return Response.json({...user,...userInfo,});
}
