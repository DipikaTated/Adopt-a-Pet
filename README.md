# Pawfect Home — Adopt-a-Pet

A responsive pet-adoption website built with React. Pawfect Home helps visitors explore pets, search for a possible companion, view pet profiles, and learn more about the adoption process.

🌐 **Live website:** https://adopt-a-pet-xi.vercel.app/  
💻 **GitHub repository:** https://github.com/DipikaTated/Adopt-a-Pet

## About the project

Pawfect Home is a front-end web project focused on creating a friendly and simple pet-browsing experience. Visitors can explore different animal categories, search the pet directory, and open individual pet profiles.

The project uses mock data and Mock Service Worker (MSW) to simulate API responses. Some profiles are demonstration profiles, so the website should be treated as a project demo rather than a live shelter listing service.

## Features

- Browse pets from the home page.
- Explore pets by animal category.
- Search pets by name.
- Filter search results by animal type, age, and breed.
- View individual pet profiles and available details.
- Open the adoption application page.
- Visit the About and Contact pages.
- Navigate between pages using React Router.
- Display a helpful page when a pet profile cannot be found.

## Technologies used

- **React 18** — building the user interface.
- **JavaScript** — application logic and interactions.
- **React Router 6** — client-side navigation.
- **Mock Service Worker (MSW)** — simulating API requests and responses.
- **HTML and CSS** — page structure and styling.
- **npm** — package management and project scripts.

## Run the project locally

Make sure [Node.js](https://nodejs.org/) and npm are installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/DipikaTated/Adopt-a-Pet.git
   ```

2. Open the project folder:

   ```bash
   cd Adopt-a-Pet
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The app will usually open at http://localhost:3000.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode. |
| `npm run build` | Creates an optimized production build. |
| `npm test` | Runs the test runner. |

## Project structure

```
src/
├── components/   Reusable interface components
├── pages/        Home, search, pet details, and other pages
├── api/          Functions used to request pet data
├── mocks/        Mock API handlers and sample data
└── App.js        Application routes
```

## Acknowledgements

This project was originally inspired by a Codecademy Front-End Engineer learning project and has been further customized and developed.

---

Made with ♡ for pets everywhere.
