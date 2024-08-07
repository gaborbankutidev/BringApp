# Bring App

Monorepo containing the Bring App project template and its supporting packages.

## Setup

-   Install all dependencies in all workspaces with `yarn`
-   Create the necessary .env files in the _bring-app_, _/next_ and _/themes/bring-theme_ folders
-   Start the backend services in docker with `yarn services:up`
-   Build the theme and start the development with `yarn dev`
-   Log in to WordPress admin, go to Settings -> Permalinks, and set it to `/%postname%/`
-   Activate your Project Theme and complete the required plugin installation steps
-   Happy building!

## Bring App Folders

-   `themes/`  
    Themes for WordPress containing the core Bring Theme and the Project Child Theme
-   `next/`  
    For the frontend that mirrors the routing of WordPress
-   `wordpress/`
    The wordpress folder for local development

## Publish new package versions

-   `yarn changeset`: Bump package versions and commit changelog message

## Important scripts

-   `yarn` or `yarn install` : Install all dependencies in all workspaces
-   `composer install` then `composer dump-autoload`: Install all php dependencies (automatically runs after yarn)
-   `yarn dev` : Start development server
-   `yarn build` : Create production build
-   `yarn storybook` : Start storybook development server
-   `yarn checks` : Lints and types all workspaces
-   `yarn format` : Formats all files in all workspaces

## Useful scripts

-   `yarn workspace <workspace-name> add <package-name>` : Add new package to one workspace
-   `yarn workspace <workspace-name> remove <package-name>` : Remove package from one workspace

## Starting a new project

For initializing a new Bring App project, check out the app [Readme](apps/bring-app/README.md)

## Documentation

For the API documentation of the Bring packages, visit our [Docs page](https://bring-app-docs.vercel.app/)
