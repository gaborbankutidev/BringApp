# Bring App

Bring App project starter template.

## Setup

- Initialize a new project with `npx @bring/create-app@latest`
- Create the necessary .env files in the _root_, _next-app_ and _plugins/bring-app_ folders
- Start the backend services in docker with `yarn services:up`
- Build the theme and start the development with `yarn dev`
- Activate the Bring App plugin
- Happy building!

## Folders

- `plugins/bring-app`
  The Bring App plugin for WordPress containing the core functionality and project specific customizations
- `themes/bring-app-theme`
  Minimal theme for the headless WordPress Bring App architecture
- `next-app/`
  For the frontend that mirrors the routing of WordPress
- `wordpress/`
  The wordpress folder for local development

## Upgrade packages and plugin

- `yarn upgrade`: Upgrade all packages and the Bring App plugin

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

## Managing WordPress plugins

- Manage your plugins in `composer.json`
- Install new plugins with `composer require wpackagist-plugin/plugin-name`
- Remove plugins with `composer remove wpackagist-plugin/plugin-name`
- Update plugins with `composer update wpackagist-plugin/plugin-name`
- Run `composer update` to update all plugins
- To make a plugin required, add it to the `$required_plugins` array in `apps/bring-app/plugins/bring-app/src/Core/Plugins.php`, it's important that you add the plugins entrypoint to the array, not its name

### Adding plugins from private Github repositories

- Add the repository to the `composer.json` file in the `repositories` array in this format

  ```json
  "repositories":
  [
    {
   	"type": "vcs",
   	"url": "git.url.to/repo.git"
    }
  ]
  ```

- Generate an access token for your repository in [Github Developer Settings](https://github.com/settings/tokens) and add it to the `.env` file in the root of the app like this

  ```env
  COMPOSER_AUTH='{"github-oauth": {"github.com": "your-token"}}'
  ```

- Run `yarn install`, this will generate an `auth.json` file in the root of the app with the token

- After adding the repository, you can require with `composer require your-namespace/plugin-name` or add it to the `composer.json` file in the `require` array and run `composer install`

  ```json
  "require": {
    "your-namespace/plugin-name": "version"
  }
  ```
