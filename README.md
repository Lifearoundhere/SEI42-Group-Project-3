# **SEI42-Group-Project-3**

React App

[Link to App](https://food-fidelity.herokuapp.com/#/)

## Collaborators

**Prab Singh**

[Linkedin](https://linkedin.com/in/prabhdeeps)

[GitHub](https://github.com/Lifearoundhere)

**Daniel H Cohen**

[Linkedin](http://www.linkedin.com/in/daniel-hof-cohen-143aa1185)

[GitHub](https://github.com/Mathsteacher7)

**Elliott M Chick**

[Linkedin](https://www.linkedin.com/in/elliott-chick-790b63a2/)

[GitHub](https://github.com/herrchick)

**Dmitrii Solomatin**

[GitHub](https://github.com/DmitriiUK)

**Timeframe**: 7 Day Group project

Technologies used:

- JavaScript (ES6), Node.js
- React (React-Dom, React-mapbox-gl, react-select, react-slick, react-star-ratings)
- Bulma & scss
- FileStack
- git
- express.js & axios
- mongoose (MongodB)
- Heroku
- Bcrypt & doting
- Webpack (cli & dev-server, babel)
- For testing (mocha.js, supertest.js & chai.js)

## **Installation**

1. Clone or download the repo
2. Run ```yarn init``` in your CLI to install all packages and dependencies
3. Run ```mongod```, ```yarn seed```,```'yarn serve:backend``` and ```'yarn serve:frontend```  in the CLI

## **Overview**

The goal of this project was to develop a full stack web app using the skills we have developed at General Assembly (GA) using React.js, NODE, and a noSQL database. GA is surrounded by many food markets frequented by students of the school, and a hot topic of conversation is always what stalls and dishes are the best, and how much they cost.

This webapp is designed to be a user driven database of food available at markets near the user and beyond. Users are capable of uploading photos and details of what they have eaten at a market (including location), rating them, and also rating other dishes inputted by other users on the database.

# **Image Handling**
Image uploads and displaying were handled with 2 different packages in this project. Uploads were handled using Filestack, a 3rd party service designed to return a URL and apply transformations when an image is uploaded. This is achieved easily in react using the package "react-filestack".

Image displays are handled using Slick, specifically using the package "react-slick", which is an image carousel package designed to easily let you display images in a carousel.

## **Process**

We all collaborated from the same repo, this required us to work in close coordination making sure that we followed proper git version control.  We started off with a Kanban Trello board following the [MoSCoW method](https://agilekrc.com/resource/115/streetwise-moscow-ultimate-how-guide-moscow-prioritisation).

Deployment of our finished product was served via the Heroku cloud platform.

## **Challenges**
 For creating the rating system we added the StarRating package. The main challenge was to pull the rating data from the api, since it was nested inside the comments array. To be able to send changes to the database, we needed cache user changes in the UI and then amalgamate the varying input sources together for submission to the server.    
## **Wins**

Developing this app produced a wide variety of challenges, not only coding challenges, but personal challenges working as part of a larger group for the first time. Proper collaborative version control was at the crux of our collaboration and correct planning, producing a limited amount of personal and coding conflicts over the course of the week.

The project was broken down into components designed to be testable independently of the main codebase, resulting in easy merging and few blockers to the development process as components can be developed independently provided the data schemes were robust enough. 
## **Future features**

We would want to round out the app more by expanding on the user pages to all for achievement collection and for users to be able to follow each other.

The UI could use a revamp to make it more consistent and up to date with current UI trends.

Lastly it would be good to build automated tests for the frontend like we did for the backend API.
