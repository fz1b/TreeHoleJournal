# TreeHole

TreeHole creates a place where people can record their life through posts with both pictures and words, as well as location. A user can also view, comment and like other people's posts. The visibility of each post can be set to private, anonymous, or public based on the user. Only public and anonymous posts can be viewed and commented on by others.

## Project goal completion status

### 3-5 minimal requirements

 ✅  Create a webApp using React

 ✅  Allow users to create, edit and delete a journal

 ✅  User authentication

### 3-7 "standard" requirements (will most likely complete)

 ✅  Allow users to include images in their posts

 ✅  Enable other users to comment on public posts

 ✅  Find a journal written on a specific date from the calendar

 ✅  Control privacy settings

 ✅  Like someone's journals and include them in user's favourites folder

### 2-3 stretch requirements (plan to complete at least 1!)

 ✅  Allow users to include location in their posts

 ✅  Explore other posts by location

 ❌  Direct messages

 ❌  Report abuse

 ✅  Search functionality

 ❌  Filter through existing journals by date/location

 ❌  Add music/video support

 ✅  Infinite scrolling


## Technology Usage (Incomplete)

### Unit 1

CSS, JavaScript and HTML are all being utilized in various areas of this projects, with `index.html` as the entry point of this project, CSS for the styling of components and JavaScript to form the individual components in React as well as composing the backend of this project. 

### Unit 2: React

React forms the backbone of the projects. We have used multiple React technologies to enhance our functionalities. `useState` to maintain data consistency between editing modal, journal entry and screens containing these entries. `createContext` to provide multiple components with authentication info, enabling conditional rendering and token to access information in database. 

### Unit 3: Node and Express

### Unit 4: MongoDB

### Unit 5: Release Engineering

In order to ensure users can access their information everywhere, we have hosted our website in Heroku. In Heroku, we have made use of the `Secrets` function to hide API access tokens and keys from the codebase. We have also delegated the burden to continuous deployment to **GitHub Actions,** so that changes made to the `master` branch will be applied to the website within minutes.


## Above and beyond functionality (Incomplete)

### Infinite Scrolling

### Location Services


## Next Steps (Incomplete)

- Move requests information to headers
- Ability to follow others, view all posts from another user
- Email confirmation


## Contributions

### Emily Lian (l6q1b)

Emily was the owner of the viewing and editing modal of journals. She implemented most of the functionalities in the modals such as creating and editing title, content and location of each post. She was also the author of all the background pictures.

### Bill Liu (d6h0b)

Bill spent most of his effort on developing authentication using Firebase while also contributing to the backend to enable multiple database actions such as (...). Bill also designed the navigation bar used in all screens.

### Maxwell Wang (i4j1b)

Max was in charge of continuous deployment to Heroku and backend. For backend, he (...). He is also the person behind the stunning infinite scrolling feature in the Explore and Me page.

### Frank Zhou (k2u1b)

Frank designed and implemented the cards component, picture upload to Amazon S3, and user information page. He is also the primary author of this document.


## Project Description: TreeHole

TreeHole creates a place where people can record their moods and find someone to confide in. Users are able to create, edit, and delete posts. They can also see the posts from others, make comments, and put their entries in one's own favourites. The visibility of each post can be set to private, anonymous, or public. Anonymous and public posts can be viewed and be responded to by others.

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


## Breakdown of requirements

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
