# MERN Stack Fitness Tracker

## Description
A simple react app built on the MERN stack that allows users to:
- Register, Login (securely, passwords hashed with bcrypt)
- Create/Delete Exercises
- Add workout data to exercises and graph it

All validation is done server side and the validation functions can be found within the validation folder within the root.

In the API folder, we have all of our express routes. All secured routes are built on a JWT-Passport system. 
## Demo
If you don't want to deploy this to demo it (understandably), here is a quick collection of demo gifs to show off some of the features.

#### Navigation Demo
![Navigation Demo](demo/homenav.gif)

#### Register
The app features a registration/login page. I am using JWT with passport for authentication, and storing it all in mongo.
![Registration Demo](demo/register.gif)

#### Server Side Validation
Validation functions can be found in the validation folder in the root. All inputs are validated server side.
![Validation Demo](demo/validation.gif)

#### Progress Logging
Logging progress on a specific exercise is really easy. Graphs are updated in real time with your progress.
![Progress Demo](demo/addlog.gif)

#### Mobile Friendly Layout
UI is designed to be clean and usable on any size of device.
![Mobile Demo](demo/mobile.gif)

## Deployment

Within the config/keys folder is where all of the credentials live. If you wish to deploy this app or build something on top of it, all you need is a mongo instance (free small databases available on atlas if you don't want to host it yourself). You should also change the secret or key which is used for password hashing. 
