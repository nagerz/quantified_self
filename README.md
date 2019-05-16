# README

## Description
Quantified Self is a 10-day, paired project during module four of four, of Turing School's Back-End Engineering Program.

Quantified Self is a web application designed aggregate favorite recipes, associate those recipes with specific meals, count the calories for those meals. The application utilizes [Recipe Service](https://github.com/Mackenzie-Frey/recipe_service) as a microservice for retrieving recipes based on specific filters and search queries.Quantified Self utilizes Node.js, Expess and Sequelize, PostgreSQL and Jest.

#### [**_View Quantified Self in Production_**](https://self-quantified.herokuapp.com/) </br>

### Schema
<!-- ![Alt text](./public/images/schema.png?raw=true "Database Schema") -->

## Getting Started

To run Quantified Self on a local machine, navigate to the directory in which you would like the project to be located in, then execute the following commands:

```
$ git clone git@github.com:Mackenzie-Frey/recipe_service.git
$ cd recipe_service
$ npm install # Installs dependencies
$ npx sequelize db:create # Creates PostgreSQL Database
$ npx sequelize db:migrate # Runs migrations for the database setup
$ npx sequelize db:seed:all # Runs seed file for seeding the database
```

## Running Tests

To run the test suite, execute the following command: `npm test`. The tests will automatically run each time an update is made to the application.

## Test Coverage
To run a test coverage report execute the command: `npx jest --coverage`.

<!-- The report will look like the following.

![Alt text](./public/images/test_coverage.png?raw=true "Test Coverage Report") -->

Navigate to the project directory of `coverage/lcov-report/quantified_self/`. Copy the file path and execute the command: `open insert_file_path`. This will open the specific coverage report in the default browser.

## Deployment

To view Quantified Self in development, execute the following command from the project directory: `nodemon npm start`. To view the application in a web browser, visit `localhost:3000` and navigate the the desired endpoint.


## Available Endpoints
The application provides the following endpoints:

#### Food Endpoints
###### Food Index

All food items currently saved in the database can be retrieved via a `GET` request to the `/api/v1/foods` endpoint.

If the request is successful, the application will return an array containing food item objects, along with a status code of 200.

``` HTTP
status: 200
body:

[
  {
    "id": 1,
    "name": "food name",
    "calories": 10
  },
  {...}
]
```
###### Food Show

An individual food item currently saved in the databse can be retrieved via a `GET` request to the `/api/v1/foods/:id` endpoint.

If the request is successful, the application will return the requested food object, along with a status code of 200.

``` HTTP
status: 200
body:

{
  "id": 1,
  "name": "food name",
  "calories": 10
}
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

{
  "error": "Requested food item could not be found."
}
```

###### Food Creation

A new food item can be created and saved in the database via a `POST` request to the `/api/v1/foods` endpoint. The request must contain a food name (unique in the system) and the number of calories associated with the food matching the format provided below.

``` HTTP
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

{
  "name": "food name here",
  "calories": "number of calories here"
}
```

If the request is successful, the application will return the created food object in the format below, along with a status code of 200.

``` HTTP
status: 200
body:

{
  "id": 1,
  "name": "food name",
  "calories": 10
}
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

"Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"
```

In the event that the request is unsuccessful due to an incompatible calorie datatype of string, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

"Please pass the calories datatype as a Number"
```

###### Food Deletion
A food item can be deleted from the database via a `DELETE` request to `/api/v1/foods/:id`, utilizing the `id` of an existing food item in the database. A successful response will return a `204` status code, a unsuccessful response due to an `id` not found in the database will return:
 ``` HTTP
 status: 404
 body:
 {"error": "The requested food item could not be found and was therefore not deleted."}
 ```

###### Meal Index
All meal items currently saved in the database can be retrieved via a `GET` request to the `/api/v1/meals` endpoint.

If the request is successful, the application will return an array containing meals objects, along with a status code of 200.

``` HTTP
status: 200
body:

[
  {
      "id": 1,
      "name": "Breakfast",
      "Food": [
          {
              "id": 1,
              "name": "Cheetos",
              "calories": 12
          },
          {
              "id": 2,
              "name": "apple",
              "calories": 5
          },
          {
              "id": 3,
              "name": "pizza",
              "calories": 500
          }
      ]
  }
]
```
If the request is unsuccessful due to no meals being stored in the database, the application will return an error message of `{error: 'There are no meals in the database.}`, along with a status code of 404.

###### Meal Deletion
To delete a food item on a meal, a successful `POST` request to the endpoint `/api/v1/meals/:meal_id/foods/:food_id` will delete the applicable MealFood record in the database and return a status code of `204`. An unsuccessful request will return the following:
``` HTTP
status: 404
body:
{
    "error": "Request does not match any records."
}
```

## Tools
* Postman
* dotenv
* node-fetch
* pryjs
* babel-jest
* nodemon
* scriptjs
* shelljs
* supertest
* beautify
* hat
* nyc
* bcrypt


## How to Contribute

###### Contributing Code:
1. Fork the project.
2. Write a failing test.
3. Commit that failing tests.
4. Commit changes that fix the tests.
4. Submit a pull request detailing the change that was made.

###### Submitting a Bug:
1. Search the existing [issues](https://github.com/nagerz/quantified_self/issues).
2. Create a new issue if applicable, or contribute to an existing issue.

### Related Links:
###### * [**_Agile Project Board_**](https://github.com/nagerz/quantified_self/projects/1)
###### * [**_Project Specifications_**](http://backend.turing.io/module4/projects/quantified_self/qs_server_side)
###### * [**_Project Rubric_**](http://backend.turing.io/module4/projects/quantified_self/rubric)

### Author
[Mackenzie Frey](https://github.com/Mackenzie-Frey)
[Zach Nager](https://github.com/nagerz)

### Special Recognition
* [Dione Wilson](https://github.com/dionew1)
* [Cory Westerfield](https://github.com/corywest)
