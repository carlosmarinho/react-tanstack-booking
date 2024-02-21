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

# Tecnologies used

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

- I started developing the application and decided to use Tanstack React Query, Styled components. I started creating the admin part, only to do the booking and list, but didn't finish it. As time goes by, and I was lacking time I went to do the booking website, where you can search Hotels, and do the reservation. As I had basically 1 weekend and more 2 days to do all booking code, I didn't have time to work with TDD nor implemnent much unit test and E2E test.

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

- I implemented only one unit test with react testing library and jest because of the lack of time
- Increase the test coverage of the application
- I didn't have time to implement no E2E test, but I could use cypress or playright

### Login

- In this moment we only have a mocked login, when you click on the login link we don't redirect the user to a login page, where can add login information and do the login

### Strapi

- Strapi (https://strapi.io/) is the backend that I'm using to generate the Rest API, I'm facing some issues with it, I'm getting <b>405 Method Not Allowed</b> (strict-origin-when-cross-origin) when trying to DELETE, PATCH OR PUT, it means that I'm not able to remove or update the bookings

### @todo

- If you ctrl+f the code base for @todo, you will find a lot of part of the code that needs to be improved.

### Others

- When doing the booking check the room availability for the days required
- It's not specified on the test but we can make a crud for location, city, state, user and other

## Testing

- Although I implemented only one unit test, you can run the test using the command `npm run test`
