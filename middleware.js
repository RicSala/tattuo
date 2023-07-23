import { withAuth } from 'next-auth/middleware'

export default withAuth(

    function middleware(req) {
        console.log("⏭ MIDDLEWARE")
    },

    {
        // Options
        pages: {
            signIn: '/', // so that users are redirected to / when they are not signed in
            signIn: '/?signinmodal=true', // we could do something like this to force the sign in modal to open
        },
    }
)

// TODO: Role base auth:
// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
// https://authjs.dev/guides/basics/role-based-access-control



// this is nextauth config, not the native nextjs config
export const config = {
    matcher: [
        '/users/:path*',
        '/conversations/:path*',
        '/profile/:path*',
        '/admin/:path*',
    ]
}

// REVIEW: Not sure if we can implement the "isOwner" middleware here, because we would probably need database access to check if the user is the owner of the resource
// and the middleware is run on the edge... not sure if we can access the database from the edge

// TODO: we also need to protect the api routes, so that only the owner of the resource can access them