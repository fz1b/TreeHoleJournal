# Project Description: Treehole

Treehole is a journal web app for the general public, particularly for those in need of emotional support. The goal is to create a place where people can record their moods and find someone to confide in. Users are able to create, edit, and delete posts. They can also see the posts from others, make comments, and put their entries in one's own favourites. The visibility of each post can be set to private, anonymous, or public. Anonymous and public posts can be viewed and be responded to by others.

### Who is it for?

The general public (particularly people needing mental health support) who need a space to express their thoughts and ideas in a private, undisturbed space.

### What will it do? (What "human activity" will it support?)

Make private,anonymous, public posts.

Respond to others’ public/anonymous posts.

### What type of data will it store?

Text, dates, and images.

### What will users be able to do with this data?

create/edit/delete/change visibility

### What is some additional functionality you can add/remove based on time Constraints?

Add registered professional therapist access.

## Project task requirements:

### 3-5 minimal requirements (will definitely complete)

- Create a webApp using React
- Allow users to create, edit and delete a journal
- User authentication

### 3-7 "standard" requirements (will most likely complete)

- Allow users to include images and locations in their posts
- Enable other users to comment on public posts
- Find a journal written on a specific date from the calendar
- Control privacy settings
- like someone's journals and include them in user's favourites folder

### 2-3 stretch requirements (plan to complete at least 1!)

- Explore other posts by location
- Direct messages
- Report abuse
- Search functionality
- Filter through existing journals by date/location
- Add music/video support

### Breakdown of requirements

1. Create static web page (Landing Page)
    - Create nav bar
    - Include calendar
    - Display journals as cards
2. Allow users to create, edit and delete a journal
    - Construct Database
    - Backend calls to the database: save, delete, edit, read
3. User authentication
    - Login/Registration page
    - Database security (hashing)
    - Back-end authentication algorithm
4. Individual journals
    - Locations are recorded using Google Map API
    - Image upload and storage uses AWS's S3 service
    - Other fields are preserved via useEffect on React

## Sketch prototypes of some key tasks of your app

[https://lh5.googleusercontent.com/rNwf0Pg2X7CRhE-UIkkuPKdyATHj3CAauCD2y1M6K0YmwrHIERXOmQhr6vWH4qpRekIleVxe1o8i2tKbhhzdcMUTS8KDAZzxhXazlJvx8OF9Qz4CtuMeN26XhqZX5PQqCKFXYuOx](https://lh5.googleusercontent.com/rNwf0Pg2X7CRhE-UIkkuPKdyATHj3CAauCD2y1M6K0YmwrHIERXOmQhr6vWH4qpRekIleVxe1o8i2tKbhhzdcMUTS8KDAZzxhXazlJvx8OF9Qz4CtuMeN26XhqZX5PQqCKFXYuOx)
