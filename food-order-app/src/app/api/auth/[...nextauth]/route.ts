import client from "@/app/libs/mongoConnect";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  callbacks: {
    async session({ session, user, token }: { session: any, user: any, token: any }) {
    console.log("Session:", session);
    console.log("User:", user);
    console.log("Token:", token);
    session.user.id = user?.id || token?.sub;
    return session;
  },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.name = user.name || undefined;
        token.picture = user.picture || undefined;
        token.id = user.id || token.sub;
      }
      return token;
    },
     
  },
  allowDangerousEmailAccountLinking: true,
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
        
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGODB_URI??'');
        console.log('connection made');


        const user = await User.findOne({email});
        console.log('User',user);

        const passwordOk = user && bcrypt.compareSync(password ?? '', user.password);
        console.log('passwordOk',passwordOk);

        if (passwordOk) {
          return user;
        }

        return null;
      }
    })
  ],
};

export async function isAdmin() {    
  const session = await getServerSession(authOptions as any) as any;
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST }