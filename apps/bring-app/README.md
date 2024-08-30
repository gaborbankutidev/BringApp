# Bring App

Bring App project starter template.

## Setup

- Initialize a new project with `npx @bring/create-app@latest`
- Create the necessary .env files in the _root_, _next_ and _themes/bring-theme_ folders
- Start the backend services in docker with `yarn services:up`
- Build the theme and start the development with `yarn dev`
- Activate your Project Theme and complete the required plugin installation steps
- Happy building!

## Folders

- `themes/`  
  Themes for WordPress containing the core Bring Theme and the Project Child Theme
- `next/`  
  For the frontend that mirrors the routing of WordPress
- `wordpress/`
  The wordpress folder for local development

## Upgrade packages and theme

- `yarn upgrade`: Upgrade all packages and the Bring Theme core theme

## Important scripts

- `yarn` or `yarn install` : Install all dependencies in all workspaces
- `composer install` then `composer dump-autoload` : Install all php dependencies (automatically runs after yarn)
- `yarn dev` : Start development server
- `yarn build` : Create production build
- `yarn storybook` : Start storybook development server
- `yarn checks` : Lints and types all workspaces
- `yarn format` : Formats all files in all workspaces

## Documentation

For the API documentation of the Bring packages, visit our [Docs page](https://bring-app-docs.vercel.app/)
