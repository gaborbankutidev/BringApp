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
The @bring/blocks-client package is used in the next and editor subfolders.  
The @bring/blocks-editor package is used in the editor subfolder.

## Packages

The three packages have different goals.

## Concepts and terms

Entity:

Slug:
