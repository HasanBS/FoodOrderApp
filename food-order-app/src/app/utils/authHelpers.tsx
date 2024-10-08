import { getServerSession } from "next-auth";
import { UserInfo } from "@/app/models/UserInfo";
import { authOptions } from "../api/auth/authOptions";

export async function isAdmin() {
    const session = await getServerSession(authOptions as any) as any;
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({ email: userEmail });
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
};
