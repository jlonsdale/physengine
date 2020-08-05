
# Physics engine project!

## Motivation

- my first physics engine (link https://github.com/jlonsdale/physics_engine.io) was purely based around velocity, this meant it could not handle variable acceleration)

- my second engine involved collisions but was also base on velocity (https://github.com/jlonsdale/pool_table.io)

- this engine is based around the vector sum of forces acting on the ball & performs an integral approximation on this sum to get kinematic values each frame.
- we are using the Runge-Kutta method https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods to approximate said integrals.

- i didnt really make this for anyone to use i just like making physics engines, but if you get a kick out of it thats great :D

## Features

### Enviromental Conditions 

- Gives you the ability to change Coefficient of Restitution of the particle & Frictional Constants for both floor and air.
- These settings will persist even when used with other features.

[![Image from Gyazo](https://i.gyazo.com/5541ca60203ff9f6fd373f71518dacbe.gif)](https://gyazo.com/5541ca60203ff9f6fd373f71518dacbe)

### Electric Fields

- Add or remove two parallel charged plates, which generate a linear electric field.
- Change the charge of the particle.
- Alter the strength of the electric field.
- Change the position of the charged plates.

[![Image from Gyazo](https://i.gyazo.com/6a80a7c41095a722e8141c19feb3be0d.gif)](https://gyazo.com/6a80a7c41095a722e8141c19feb3be0d)

### Console
- WIP

### Harmonic Motion
- WIP

## Deployment Link

-  https://physics-engine.herokuapp.com/

## Tech Stack

- ES6
- React
- Node.js
- Heroku
