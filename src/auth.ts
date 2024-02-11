import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import GitHub from "@auth/core/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
// console.log(GITHUB_CLIENT_ID);
// console.log(GITHUB_CLIENT_SECRET);
// console.log("hurray");



// if process environment is pulled typescript
// thinks it string or undefined

if(!GITHUB_CLIENT_ID||!GITHUB_CLIENT_SECRET){
    throw new Error("Missing github oauth credentials");
}


// handlers - realted to our oauth setup // so call us req handlers 
//auth  - auth function is going to allow us to figure out whether or noyt
// a user is signed into our application 

export const {
    handlers:{GET,POST},
    auth,
    signOut,
    signIn}=NextAuth({
   adapter:PrismaAdapter(db),
   providers:[
    GitHub({
        clientId:GITHUB_CLIENT_ID,
        clientSecret:GITHUB_CLIENT_SECRET
    })
   ],
   callbacks:{
    //usually not needed,here we are fixing a bug in nextauth
    async session({session,user}:any){
        if(session&&user){
            session.user.id = user.id;
        }
        return session
    }
   }
   
})