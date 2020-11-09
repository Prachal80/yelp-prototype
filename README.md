# yelp-prototype

# Simulation of Yelp (yelp.com) Using React-Node-MySQL-Express

This is the simulation of the website named Yelp. Here, the services offered by the Yelp for Customers and Restaurants are achieved in this project. MySQL is used in this project as a database and is deployed on Amazon RDS.

***Note:***<br> 
- ***This project was mainly focused on developing backend server using Nodejs, using Redux to maintain single source of truth for the whole application, utilizing database connection pooling to serve the queries faster and setting up kafka cluster to direct the client requests to different microservices to increase the performance.*** <br>
- ***For projects with attractive and intuitive client interfaces, please visit [Yelp MERN Stack using React-Redux-Node-Kafka-MongoDB](https://github.com/Prachal80/Yelp-MERN-STACK).***<br>
- ***To see the demo video of the project in motion, please visit [Here](https://youtu.be/jhTLv7Cr8Ng).***

## Architecture diagram:
<img width="765" alt="Screen Shot 2020-09-12 at 1 45 34 PM" src="https://user-images.githubusercontent.com/23629478/98518130-d2c11100-2223-11eb-80bf-81f7ad3cac5a.png">

## Project overview:
<br> 
<br> 
- Login
<img width="1440" alt="Screen Shot 2020-09-12 at 2 09 13 PM" src="https://user-images.githubusercontent.com/23629478/98518876-d903bd00-2224-11eb-977e-b7024ac265a0.png">
<br>

- Customer Dashboard page:
<img width="1140" alt="Screen Shot 2020-09-12 at 1 45 34 PM" src="https://user-images.githubusercontent.com/23629478/98518914-e8830600-2224-11eb-97f1-d3b8bbe87eb8.png">


<br>
- Restaurant Dashboard:
<img width="1433" alt="Screen Shot 2020-10-11 at 1 51 05 AM" src="https://user-images.githubusercontent.com/23629478/98519573-c8077b80-2225-11eb-8a8a-36b713f56ae6.png">
<br>

-Customer Orders Page:
<img width="1436" alt="Screen Shot 2020-10-11 at 1 48 19 AM" src="https://user-images.githubusercontent.com/23629478/98519541-c2119a80-2225-11eb-91c3-38f0aa169d1c.png">

-Restaurant Orders:
<img width="1440" alt="Screen Shot 2020-10-11 at 1 52 08 AM" src="https://user-images.githubusercontent.com/23629478/98519588-cc339900-2225-11eb-9390-5bdd9c423329.png">

-Customer Profile:
<img width="1436" alt="Screen Shot 2020-10-11 at 1 47 34 AM" src="https://user-images.githubusercontent.com/23629478/98519595-cfc72000-2225-11eb-8a54-c36972411075.png">


## Application Performance comparison with/without connection pooling (using JMeter):
<img width="541" alt="Screen Shot 2020-11-09 at 12 48 18 AM" src="https://user-images.githubusercontent.com/23629478/98519258-5a5b4f80-2225-11eb-9418-0396845286c2.png">



## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) and Kafka installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React.

## Running the tests

To run test for this system.
Traverse to test folder in Backend and enter
```
npm test
```
This will run the tests defined in the file.
You can add new Tests by adding test cases in this file.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance for each Backend, Frontend and MySQL RDS with Auto-Scaling and Load Balancer.

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programing Language used
* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [MySQL RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html) - RDS Database used

## Author

* **Prachal Patel**
