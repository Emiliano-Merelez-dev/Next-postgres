import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signInEmailPassword } from "@/authProviders/actions/auth-actions"


export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    Google,
    GitHub,


    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await signInEmailPassword( credentials!.email, credentials!.password );
 

        if (user) {
          return user
        } 

        return null;
        
      },
    }),


  ],


  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials  }) {

      return true;
    },

    async jwt({token, user, account, profile}) {

      const dbUser = await prisma.user.findUnique({ where: {email: token.email ?? 'no email' } });
      if ( dbUser?.isActive === false) {
        throw Error('User no esta activo');
  
      }

      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';
    
      return token
    },

    async session({session, token, user}) {

      if ( session && session.user ) {
        (session.user as any).roles = token.roles;
        (session.user as any).id = token.id
      }

      return session;
    }

  }


})




