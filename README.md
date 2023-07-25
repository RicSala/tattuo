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

## Comments
- Try to use components as much as possible and make them reusable
- For color, use the palette in tailwind.config.js
- Document everything in the code to make it easier to understand
- We are using storybook. No necesary but keep it in mind


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

## Pages /App/(site)
- page.jsx --> Home

### Frontend /(front)
- /tatuadores --> tattoo artists 
    - /page.jsx --> Browse Artists with filters
    - /tatuadores/profile/[slug]/page.jsx --> public artist profile
    - /tatuadores/[cityName]/page.jsx --> artists by city
    - /tatuadores/[saved]/page.jsx --> artist saved by user

- /tatuajes --> tattoos
    - /page.jsx --> Browse Tattoos with filters
    - /tatuajes/[tattooId]/page.jsx --> tattoo details
    - /tatuajes/[boards]/page.jsx --> tattoos saved by user in a board
    - /tatuajes/[saved]/page.jsx --> NOT USED! tattoos saved by user

### Admin area /admin
- /page.jsx --> Not done yet! Admin Home
- /profile/page.jsx --> Edit user profile page
- /profile/ProfilePageClient.jsx --> Edit user profile page (Client elements)
- /tatuajes/page.jsx --> Created and Edit tattoos by artist

### Blog /blog
- /page.jsx --> Blog Home
- /[slug]/page.jsx --> Blog Post
- /blogposts --> .mdx files
- /components --> custom jsx components for the blog posts


## To rund the project:

Create a MongoDb (docker or cloud)
```
npm install
npx prisma generate
npx prisma db push
npm run dev
```
To seed the database: Just make a get request to /api/dev/seed


