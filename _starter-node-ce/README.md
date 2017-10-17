# Starter Project for Phaser CE with TypeScript and NodeJS

The following is a starter project to get started with a new game in Phaser CE and Visual Studio Code, using TypeScript and NodeJS.

## What This Provides

- src
	- assets
		- This directory can be used to store any assets (images, audio, etcetera) that your game will use.
	- plugins
		- This directory is intended to store any plugins that are used by your game.
		- A collection of plugins can be found in the [Phaser Plugins repository](https://github.com/photonstorm/phaser-plugins).
	- ts
		- This directory is intended to store your TypeScript files, and includes a .gitignore so that any JavaScript files that are built aren't committed.
		- A possible directory structure, as well as a few starter states, have been added for ease, but can be removed without issue.
	- app.css can include any styling necessary for your application.
	- favicon.ico
		- HTML5 Logo by [World Wide Web Consortium/W3C](http://www.w3.org/) and included here based upon the [logo FAQ](http://www.w3.org/html/logo/faq.html) allowing it (and it seems like the best logo to start with).
	- index.html
		- The `title` and `h1` elements should be updated to match the needs of your game.
		- Includes a reference to the minified Phaser library.
		- Also includes a reference to a JavaScript file, which the Visual Studio project is setup to output TypeScript files to, and which should be updated to match your needs.
- gulpfile.js includes gulp tasks used to build the site.
- package.json contains the Node packages used by this project.
- README.md is this file, and should be replaced with whatever content is needed for your game.
- tsconfig.json
	- This file determines how TypeScript will compile the project.
	- By default all TypeScript files will be compiled into a single app.js file in the root of the project.
- .vscode/tasks.json
	- Used by Visual Studio code when running the build task.

## How to Build the Site
To build this project you'll need [Node.js](https://nodejs.org) installed.

Next run `npm install` in the root directory to install the various dependencies.

Run `gulp` after modifying code to populate the **dist** directory with the final site contents. 
