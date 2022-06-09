import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {username: {label: 'username', type: 'text'}, password: {label: 'password', type: 'password'},},
            async authorize(credentials, req) {
                try {
                    const res = await fetch(`${process.env.fetchURL}auth/token/`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"}
                    })
                    const user = await res.json()
                    if (res.ok && user) {return user} else {return null;}
                } catch (e) {
                    // @ts-ignore
                    const errorMessage = e.response.data.message;
                    // @ts-ignore
                    throw new Error(errorMessage + '&login=' + credentials.login)
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {signIn: "/auth", error: "/auth", signOut: "/",},
    session: {strategy: 'jwt', maxAge: 60 * 60,},
    callbacks: {
        jwt: async ({token, user}) => {if (user) {token.access = user?.access;}
            return Promise.resolve(token);},
        session: async ({session, token}) => {
            session.jwt = token.jwt;
            // @ts-ignore
            session.accessToken = token.access ? token.access : '';
            // @ts-ignore
            session.user = token.user ? token.user : '';
            return Promise.resolve(session);
        },
    }
})