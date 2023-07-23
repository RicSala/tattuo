TATTUO
============

## What is Tattuo? 
Tattoo inspiration (and booking platform in the future)

## Stack
Framework: Nextjs 13
Authentication: Authjs
DB: Prisma + MongoDB
Toas: React Hot Toast
Forms: React Hook Form
Storage: Cloudinary
http req: Axios
Maps: Leaflet?
 
Other: Tailwind



## DATABASE STRUCTURE:

User:
- Can be ARTIST, CLIENT or ADMIN
- Can save and like tattoos and artists, an create "Boards" to tattoos in (like Pinterest)

ArtistProfile: Added to users whose role is ARTIST (They have both user and artist profile)
- Can add tattoos to their profile
- 1 to 1 relationship with user

Tattoo:
- Can be liked and saved by users and added to boards
- 1 to many relationship with artist (1 artist can have many tattoos)

Board:
- Can be created by users to save tattoos in
- Many to 1 relationship with user (1 user can have many boards)

Other models:

- Style
- City
- Tags
- ...and join tables: savedTattoos, likedTattoos, savedArtists, likedArtists, boardTattoos, etc.



## FEATURES:

Filtering & search

Browsing:
Artist by city
Artist by style
Tattoos by style
Tattoos by content

Artist Like & Save
Tattoo Like & Save

Share tattoo
Share artist
...

Blog

## Pages:

### Frontend /(front)
- Home
- Browse Artists
- Saved Artists
- Artist by city
- Artist Profile Page
- Browse Tattoos
- Saved Tattoos (Boards)
- Tattoo Details Page
- Tattoos by style

### Admin area /admin
This is the admin area for the tattoo artists to manage their profile and tattoos, not ours
- Dashboard
- Artist Profile (to edit their profile)
- Tattoos list
- Tattoo edit page

### Blog /blog
- Blog Home
- Blog Post --> [slug]
- "blogposts"--> .mdx files
- Components: custom jsx components for the blog posts

## To rund the project:

Create a MongoDb (docker or cloud)
```
npm install
npx prisma generate
npx prisma db push
npm run dev
```
To seed the database: Just make a get request to /api/dev/seed


