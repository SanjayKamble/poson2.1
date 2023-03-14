import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            //to ask for signin EVERYTIME
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            
        }),




        //  CredentialsProvider({
        //     name :"Custom Provider",
        //     credentials:{
        //         username:{label:"Email",type:"text",placeholder:"arya@major.com"},
        //         password:{label:"password",type:"password"}
        //     },
        //     async authorize(credentials,req){
        //             const user = {name : "arya kamble", email:"arya@major.com"}
        //             return user;
        //     }
        // })

    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token to the token right after signin

            if (account) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.id_token = token.id_token;
            return session;
        },
    },
})