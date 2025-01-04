import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        console.log("authorizing");
        const { email } = credentials as {
          email: string;
          password: string;
        };
        try {
          const userRes = await fetch(
            `${process.env.SERVER_HOST}/auth/get-user`,
            {
              method: "POST",
              body: JSON.stringify({ email }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await userRes.json();
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
