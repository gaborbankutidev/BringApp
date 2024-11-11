# Bring App

## Introduction

The Bring App is a comprehensive full-stack solution designed for modern web development. It seamlessly integrates the robust capabilities of Next.js for site rendering with WordPress as a headless backend for dynamic content management and UI building. This powerful combination aims to streamline content management and facilitate extensive site customization within the WordPress ecosystem, while providing the flexibility to create custom layouts, pages, and UI block components using React and Tailwind CSS.

Key Features:

-   Seamless Content Management: Effortlessly manage and edit layouts, pages, and posts using the WordPress block editor.
-   Custom UI Components: Develop unique UI components in React and Tailwind CSS, and seamlessly integrate them as blocks within the WordPress block editor.
-   Optimal Performance: Ensure your site operates smoothly and efficiently with Next.js’s powerful rendering capabilities.
-   Flexible and Customizable: Leverage the strengths of both WordPress and Next.js to create a highly customizable and feature-rich end product.

The Bring App empowers developers to harness the best of both WordPress and Next.js, offering endless possibilities for creating dynamic, high-performance websites with ease.

## Project structure

The template contains the following structure:

```txt
.
├── next-app
│   └─── src
│       ├── app
│       ├── bring
│       ├── components
│       └── ...
│
├── plugins
│   ├── bring-app
│
├── themes
│   ├── bring-app-theme
│
├── package.json
├── composer.json
└── ...
```

The bring/blocks-wp package is used in the plugins/bring-app subfolder.
The @bring/blocks-client package is used in the next-app sub-folder.
The @bring/blocks-editor package is used in the editor config and components subfolder for creating blocks.

## Packages

The three packages have different goals.

The bring/blocks-wp package mostly deals with initializing everything on the php-side of WordPress.

The @bring/blocks-client package mostly deals with interacting with the custom API bring/blocks-wp sets up. This includes querying data and running form actions.

The @bring/blocks-editor package mostly deals with creating blocks for the WordPress Gutenberg editor.

## Concepts and terms

This documentation will use the following terms and concepts a lot so this is a short explanation for the most common terms and concepts: what they mean and why are they important.

### Entity

An entity can be any possible entity in WordPress. This contains any post-object (a post, a page or any custom post-object), any taxonomy term(a category, a tag or any custom taxonomy term) and authors. The information that gets queried for a specific entity is standardized for better DX.

### Entity type

An entity type can be on of the following: Author, Post or Taxonomy. For example, this separation can be used if we want to add custom data only in the queries that run on taxonomies.

> Note: BringBlocks doesn't support post archives. For the use-case they cover we recommend building a custom page that lists entities.

### Entity slug

An entity slug can be any entities' slug. For example "post" for the built-in post post-type, "category" for the built-in category taxonomy. When creating a new custom post type or custom taxonomy you can set the slug yourself and you can use your custom slugs in BringBlocks.
