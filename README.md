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

 ✅  Infinite scrolling


## Technology Usage

### Unit 1

CSS, JavaScript and HTML are all being utilized in various areas of this projects, with `index.html` as the entry point of this project, CSS for the styling of components and JavaScript to form the individual components in React as well as composing the backend of this project. 

### Unit 2: React

React forms the backbone of the projects. We have used multiple React technologies to enhance our functionalities. `useState` to maintain data consistency between editing modal, journal entry and screens containing these entries. `createContext` to provide multiple components with authentication info, enabling conditional rendering and token to access information in database. 

### Unit 3: Node and Express

We implemented our backend with `Node.js`. We also used Express.js as our RESTful framework. The backend provides several endpoints for CRUD operations on journals, comments, as well as users, which the front end can access through `axios`.

### Unit 4: MongoDB

We stored all our user generated data and user information as documents in the document-based databased MongoDB. Compared to traditional relational databases, MongoDB is more flexible accessing it is easier comapred with SQL queries. We also used `Mongoose` to connect our `Node.js` backend with the database.

### Unit 5: Release Engineering

In order to ensure users can access their information everywhere, we have hosted our website in Heroku. In Heroku, we have made use of the `Secrets` function to hide API access tokens and keys from the codebase. We have also delegated the burden to continuous deployment to **GitHub Actions,** so that changes made to the `master` branch will be applied to the website within minutes.


## Above and beyond functionality

### Infinite Scrolling

To improve the user experience, the frontend will not fetch and render all posts at once. Instead, it will fetch and render the first batch, and when the user scrolls to the bottom, the next batch will be loaded. We custom designed a flagpoint that consists of the journal id and the time the journal is composed.

### Location Services

Location services is enabled by the Google Maps API. This enables both location auto complete when creating a modal, and also sort by location. We use a custom algorithm to find all nearby journals, and display them in sorted order. Users can use this to discover point of interest near them.

## Next Steps

- Move requests information to headers
Currently all requests are being sent over the url. We plan to move these requests in the header since we can have more request data stored in a header as we plan for more complex queries.
- Ability to follow others, view all posts from another user
Similar to other social media apps, a user may want to explore all the posts created by someone that they follow. In the future we may include a personal page that can be customized by the user, and includes all of the user's public posts.
- Email confirmation
We want to have a way to confirm that a user has a working email, so that we can send notifications when their posts is being commented and liked. A valid email address also allows to add other verification features, like reset password.

## Contributions

### Emily Lian (l6q1b)

Emily was the owner of the viewing and editing modal of journals. She implemented most of the functionalities in the modals such as creating and editing title, content and location of each post. She was also the UI designer for this project.

### Yuchen Liu (d6h0b)

For backend, Yuchen spent most of his effort on developing authentication using Firebase while also contributing to the backend to enable multiple database actions such as creating/ updating/ validating users' profile in database, letting users like/unlike journals, querying various user information via secured methods. Yuchen designed the navigation bar used in all screens, optimized card component fetching logic, prevented useEffect call memory leak, and established journal like button logic.

### Maxwell Wang (i4j4b)

Max was in charge of continuous deployment to Heroku and the backend. He set up the MongoDB database and implemented the C.U.R.D. functionalities for handling journals. He is also the person behind the stunning infinite scrolling feature in the Explore and Me page.

### Frank Zhou (k2u1b)

Frank designed and implemented the cards component, card layouts, picture upload to Amazon S3, and user information page. He is also the primary author of this document.

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
