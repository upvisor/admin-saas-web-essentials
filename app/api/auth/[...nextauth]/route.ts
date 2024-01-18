import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import ShopLogin from '../../../../models/ShopLogin'
import bcrypt from 'bcrypt'
import { connectDB } from '../../../../database/db'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: '******' }
      },
      async authorize(credentials) {
        connectDB()

        const shopFound = await ShopLogin.findOne({ email: credentials?.email.toLowerCase() }).select('+password')
        if (!shopFound) throw new Error('Credenciales invalidas')

        const passwordMatch = await bcrypt.compare(credentials!.password, shopFound.password)
        if (!passwordMatch) throw new Error('Credenciales invalidas')

        return shopFound
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    session({ session, token }) {
      session.user = token.user as any
      return session
        }
  },
  pages: {
    signIn: '/ingresar'
  }
})

export { handler as GET, handler as POST }