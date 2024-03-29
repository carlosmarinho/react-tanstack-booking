# Installation

Run the following commands

- Clone the application from https://github.com/carlosmarinho/react-tanstack-booking

  ```
  git clone https://github.com/carlosmarinho/react-tanstack-booking
  ```

- Get into the cloned application folder

  ```
  cd react-tanstack-booking
  ```

- Run npm install to install the package dependancy

  ```
  npm install
  ```

- We don't need to install the backend cause I have deployed it to heroku, so we just need to run the local pointing to the backend on production. Run npm run start:production to start the application

  ```
  npm run start:production
  ```

The last command (npm run servers) will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# URLs to access the aplication

- I have published the frontend and the backend on Heroku, so you don't need to install the application to see it running, just access the following website

## Website

Just keep in mind if you are access the admin page and are not logged (I'm using a mock login, just click in Signin and you are going to be logged as Carlos) you are going to be redirect to the website home page

### Production

- Open [https://booking-react-ecbbb0313ef1.herokuapp.com/](https://booking-react-ecbbb0313ef1.herokuapp.com/)
- Admin [https://booking-react-ecbbb0313ef1.herokuapp.com/admin](https://booking-react-ecbbb0313ef1.herokuapp.com/admin)

### Local

- Open [http://localhost:3000](http://localhost:3000)
- Admin Open [http://localhost:3000](http://localhost:3000/admin)

## Admin on Strapi

### Production

- https://booking-api-35c91862060b.herokuapp.com/admin/

# Tecnologies used

I have much more experience with Redux, than React Query and I also have experience with graphql client, but I decided to use Tanstack/react-query to practice and see the news about it.

- React
- Hooks
- Context
- tanstack/react-query
- CSS in JS (Styled Components)
- Jest
- React Testing Library
- Strapi

# About the application

## Development

- I started developing the application using React, Tanstack React Query, Styled components, and for the backend I used Strapi. I started creating the admin (the frontend admin, not the backend using Strapi) part, only to do the booking and list, but didn't finish it. As time goes by, and I was lacking time I went to do the booking website, where you can search Hotels, and do the reservation. As I had basically 1 weekend and more 2 days to do all booking code, I didn't have time to work with TDD nor implemnent much unit test and E2E test.

- Although I have implemented one custom hook (to do the booking) and one context for authentication, still there are rooms for improvements in this area, and I'll talk more about it in Refatory section

I decided to use all those thechnology, then you could have a good idea how I can develop a real application.

## Refactory (@todo)

### layouts and ContextApi

- I could have created 2 Layouts components one for admin and other for website, and on page component I should pass to the specific layout the children to it.
- Use ContextApi to avoid prop drilling for the search part. I need to pass the function search from parent component passing through 2 componets, when returning the result need to pass the return to the result component and show the search result, using contextApi we could avoid passing those props

### Hooks

- I created one custom hooks to do the reservation, but I miss at least another custom hooks for the search part.
- I need to take a look all over the application to understand the necessity of others custom hooks

### Tanstack

- I need to setup a better store of the tanstack react query, for better caching and querys and better reusability of the querys.

### CSS styled components

- I generally like to let the css styled inside the component, but when this css code is too big I prefer to put in separate styled file, with this in mind I need to take a look at the components to understand the need to separate the css from the component.

### Test

- I have implemented only one unit test with react testing library and jest because of the lack of time
- Increase the test coverage of the application
- As we didn't create many tests yet, I didn't create any specific folder for better organization, as applications grows we can study a better structure for tests
- I didn't have time to implement no E2E test, but I could use cypress or playright

### Strapi Images

- We need to find another way to store the image. Heroku constantly restart the app, I think maybe one restart a day, when heroku restart we lost the image that was uploaded from strapi to heroku's file syste, for this reason you can see some hotels and rooms with the default images. The default images will be shown instead of broken images

### Login

- In this moment we only have a mocked login, when you click on the login link we don't redirect the user to a login page, where can add login information and do the login
- We are using the local storage to simulate the login, so if you just reload the page, you are going to lose your login session.

### Strapi

- Strapi (https://strapi.io/) is the backend that I'm using to generate the Rest API, I'm facing some issues with it, I'm getting <b>405 Method Not Allowed</b> (strict-origin-when-cross-origin) when trying to DELETE, PATCH OR PUT, it means that I'm not able to remove or update the bookings

### @todo

- If you ctrl+f the code base for @todo, you will find a lot of part of the code that needs to be improved.
- And I'm also aware of code refactory, improvements and clean code, Like breaking some components into smaller one, use some destructuring and others, but the lack of time make me do some stuffs in a rush.

### Others

- When doing the booking check the room availability for the days required
- It's not specified on the test but we can make a crud for location, city, state, user and other

## Testing

- Although I implemented only one unit test, you can run the test using the command `npm run test`
