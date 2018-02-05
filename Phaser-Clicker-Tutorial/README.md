# Phaser Clicker Tutorial
Phaser application based upon [Ben Sparks' tutorial](http://gamedevacademy.org/phaser-tutorial-how-to-create-an-idle-clicker-game/).

Converted to TypeScript and Phaser CE February 5, 2018.

## Assets
Assets in assets/496_RPG_icons are licensed under a CC0 license, and are available from http://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg
> Author is [7Soul1](http://7soul1.deviantart.com/)

Assets in assets/allacrost_enemy_sprites are licensed under a CC-BY-SA 3.0 license, and are available from http://opengameart.org/content/2d-rpg-enemy-set
> Various people produced the sprites in this set. Please attribute to either "Hero of Allacrost - http://www.allacrost.org" or the individual artists listed below. - Brett Steele (Safir-Kreuz) - Joe Raucci (Sylon) - Vicki Beinhart (Namakoro) - Tyler Olsen (Roots)

Assets in assets/parallax_forest_pack are licensed under a CC0 license, and are available from http://opengameart.org/content/forest-background
> Author is [ansimuz](http://opengameart.org/users/ansimuz) on OpenGameArt.org

## How to Build the Site
To build this project you'll need [Node.js](https://nodejs.org) installed.

Next run `npm install` in the root directory to install the various dependencies.

Run `gulp` after modifying code to populate the **dist** directory with the final site contents.

If you'd like to run a simple web server, install http-server via `npm install http-server -g`, which can then be run from the dist directory by running `http-server`, or `http-server ./dist` if in the root.

## Upgrading Phaser CE
To upgrade Phaser CE run `npm upgrade phaser-ce` (passing `--save` if you wish to update the package.json).
