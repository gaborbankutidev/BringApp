# Bring Blocks

Bring Blocks comprises three packages tailored for building websites and web applications with NextJS and WordPress. Its main goal is to act as a conduit between WordPress and NextJS, facilitating extensive site customization. It offers the capability to edit pages using WordPress' block editor, all while ensuring optimal site performance. Moreover, it empowers developers to craft their UI components in React and employ NextJS for rendering. It aids developers in generating new blocks for the WordPress block editor, resulting in a highly customizable end product.

## Setup

The template contains the following structure:

```txt
.
├──
├── bring-theme
│   └──  src
│       └── ...
├── editor
│   └── src
│       ├── blocks
│       ├── components
│       └── ...
├── next
│   └─── src
│       ├── app
│       ├── bring
│       ├── components
│       └── ...
├── composer.json
├── package.json
└── ...
```

The bring/blocks-wp package is used in the bring-theme subfolder.  
The @bring/blocks-client package is used in the next and editor sub-folders.  
The @bring/blocks-editor package is used in the editor subfolder.

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
