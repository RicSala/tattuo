import { withAuth } from 'next-auth/middleware'

export default withAuth(

    //REVIEW: Why this does not work?
    function middleware(req) {
        console.log("FROM MIDDLEWARE", req.nextauth.token)
    },

    {
        // Options
        pages: {
            signIn: '/', // so that users are redirected to / when they are not signed in
            signIn: '/?signinmodal=true', // we could do something like this to force the sign in modal to open
        },
    }
)



// this is nextauth config, not the native nextjs config
export const config = {
    matcher: [
        '/users/:path*',
        '/conversations/:path*',
        '/profile/:path*',
    ]
}

// REVIEW: Not sure if we can implement the "isOwner" middleware here, because we would probably need database access to check if the user is the owner of the resource
// and the middleware is run on the edge... not sure if we can access the database from the edge

// TODO: we also need to protect the api routes, so that only the owner of the resource can access them