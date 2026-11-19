# GTA5 Vehicles

A small React + Webpack project for displaying GTA V vehicle data split into garage categories.

## Features

- React frontend
- Webpack build pipeline
- Jest + React Testing Library unit tests
- JSON-driven mock data for vehicle groups
- Vehicle table with live name search, category and garage filters, and sorting
- Vehicle detail pages with category, garage, and a reference link
- Apartment map page

## Project structure

```text
gta-vehicles/
├── public/
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── data/
│   │   └── vehicles.json
│   ├── pages/
│   │   ├── Details.jsx
│   │   ├── Home.jsx
│   │   ├── Map.jsx
│   │   └── VehicleDetails.jsx
│   └── index.js
├── .gitignore
├── babel.config.js
├── jest.config.js
├── package.json
├── README.md
├── webpack.config.js
└── dist/   # generated during build
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Create a production build:
   ```bash
   npm run build
   ```

## GitHub Pages

This repository does not currently have a GitHub Pages deployment configured. Although the app can be built as static files, it needs additional setup before it can be hosted there:

- The production build must use the correct base path when the site is published from a repository subpath.
- The app uses `BrowserRouter`, so refreshing or opening a nested route directly (such as `/map` or a vehicle detail page) can return a 404 on GitHub Pages unless routing is adapted or a fallback is configured.
- There is no GitHub Actions workflow to build and publish the app.

Until these are addressed, the repository has no Pages site.

## Notes

The app reads vehicle data from `src/data/vehicles.json` and renders it grouped by garage. Vehicle names can be searched, filtered by category or garage, and sorted alphabetically. Selecting a vehicle opens its detail page at `/vehicles/:garage/:vehicleId`.
