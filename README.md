# hanoi-solver

##

Basic animation of solving the Towers of Hanoi problem. Has some bugs when pressing buttons while the animation is in progress. I may fix this in the future.

### To build:
Clone directory. Navigate to the directory, and install dependencies:
```
npm install
```
Afterwards, run webpack:
```
npm run webpack
```
From here, open ```index.html```, enter the desired number of disks, and click ```reset``` followed by ```start``` to start the animation.

To run a test to get the moves printed by the solver, run the test file:
```
npm test
```