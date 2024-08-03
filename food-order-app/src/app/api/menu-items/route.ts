import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

const uri = process.env.MONGO_URL ?? '';

export async function POST(req : any) {
  mongoose.connect(uri);
  const data = await req.json();
  if (true) {
    const menuItemDoc = await MenuItem.create(data);
  console.log('menuItemDoc', menuItemDoc);    

    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req : any) {
  mongoose.connect(uri);
  if (await isAdmin()) {
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(uri);
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req : any) {
  mongoose.connect(uri);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}