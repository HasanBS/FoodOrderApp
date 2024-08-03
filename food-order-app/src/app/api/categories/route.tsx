import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { name, image, icon } = await req.json();
    const categoryDoc = await Category.create({ name, image, icon });
    return Response.json(categoryDoc);
}

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true);
}

export async function GET(req: any) {
    const categories = await Category.find();
    return Response.json(categories);
}