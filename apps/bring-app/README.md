# Bring template V2

A template for a project with BringBlocks & Next.js app router.

## Setup

- Install dependencies with `yarn install` and `composer install` then `composer dump-autoload`
- Start the backend services with `docker composer up -d`
- Build the theme and start the development with `yarn watch`
- Log into wordpress admin, go to Settings->Permalinks and set it to `/%postname%/`
- Activate the Bring Theme and complete the required plugin installation steps
- Happy building!

## Folders

- `bring-theme/`  
  Theme folder for WordPress
- `editor/`  
  For configuring the blocks for the editor
- `next/`  
  For the frontend that mirrors the routing of WordPress

## Important scripts

- `yarn` or `yarn install` : Install all dependencies in all workspaces
- `composer install` then `composer dump-autoload`: Install all php dependencies
- `yarn watch` : Start development server
- `yarn build` : Create production build
- `yarn storybook` : Start storybook development server
- `yarn checks` : Lints and types all workspaces
- `yarn format` : Formats all files in all workspaces

## Useful scripts

- `yarn workspace <workspace-name> add <package-name>` : Add new package to one workspace
- `yarn workspace <workspace-name> remove <package-name>` : Remove package from one workspace
