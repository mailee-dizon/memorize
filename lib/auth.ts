import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import prisma from "./prisma";

export const authConfig: NextAuthOptions = {
    providers: [
      CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
            
                const dbUser:any = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                if (dbUser && dbUser.password === credentials.password) {
                    const { createdAt, id, avatar, updatedAt, ...dbUserWithoutPassword } = dbUser;
                    return dbUserWithoutPassword as User;
                }

                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        
    ],
};