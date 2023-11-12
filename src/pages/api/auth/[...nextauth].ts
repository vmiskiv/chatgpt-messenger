import NextAuth from "next-auth"
import GoogleProdiver from "next-auth/providers/google"
export const authOptions = {
  providers: [
    GoogleProdiver({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
}
export default NextAuth(authOptions)