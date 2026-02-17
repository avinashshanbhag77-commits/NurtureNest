import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found with this email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password || "");

                if (!isValid) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    subscriptionTier: user.subscriptionTier
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.subscriptionTier = (user as any).subscriptionTier;
            }
            if (trigger === "update" && session?.subscriptionTier) {
                token.subscriptionTier = session.subscriptionTier;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).subscriptionTier = token.subscriptionTier;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
