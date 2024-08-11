import client from "@/app/libs/mongoConnect";
import { User } from "@/app/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    callbacks: {
        async session({ session, user, token }: { session: any, user: any, token: any }) {
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
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
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

                await mongoose.connect(process.env.MONGODB_URI ?? '');

                const user = await User.findOne({ email });

                const passwordOk = user && bcrypt.compareSync(password ?? '', user.password);

                if (passwordOk) {
                    return user;
                }

                return null;
            }
        })
    ],
};
