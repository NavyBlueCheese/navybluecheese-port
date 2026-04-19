// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
          console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in environment');
          return null;
        }

        if (credentials.username !== adminUsername) return null;

        // Support both plain-text password (for dev) and bcrypt hash
        let passwordValid = false;
        if (adminPassword.startsWith('$2')) {
          // It's a bcrypt hash
          passwordValid = await bcrypt.compare(credentials.password, adminPassword);
        } else {
          // Plain text comparison (set ADMIN_PASSWORD to a bcrypt hash in production)
          passwordValid = credentials.password === adminPassword;
        }

        if (!passwordValid) return null;

        return {
          id: '1',
          name: 'Navy',
          email: 'admin@navy.works',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
