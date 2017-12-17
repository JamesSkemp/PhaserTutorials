This directory could include any states the game might have.

This project includes the following states:

- Boot:
	- Adds default settings for the game, including multitouch and device-specific settings.
	- Could also include a progress bar for use during asset preloading.
- Preloader:
	- Used to preload any assets that might be used by the game.
- MainMenu:
	- Could display a main menu to move to additional states.

While the states log basic information to the console during these states, these can of course be removed without issue.

You may also want to update the `module` name in any states you keep, as well as **Game.ts** in the general **src** directory.