import client from "@/app/libs/mongoConnect";
import { User } from "@/app/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID??'',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET??''
  }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGODB_URL??'');

        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password ?? '', user.password);

        if (passwordOk) {
          return user;
        }

        console.log(passwordOk)

        return null
      }
    })
  ],
};

// export async function isAdmin() {
//   const session = await getServerSession(authOptions as any);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   // const userInfo = await UserInfo.findOne({email:userEmail});
//   // if (!userInfo) {
//   //   return false;
//   // }
//   // return userInfo.admin;
// }

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST }