# README

## Description
Quantified Self is a 10-day, paired project during module four of four, of Turing School's Back-End Engineering Program.

Quantified Self is a web application designed to track a users calorie intake. Users can utilize a database of foods, or retrieve a list of different kinds of meal recipes. They can then create meals and add individual food items or recipes to their meals. Then an assessment of total calories can be retrieved for those meals, and for all the meals logged for a given day. The application utilizes [Recipe Service](https://github.com/Mackenzie-Frey/recipe_service) as a microservice for retrieving recipes based on specific filters and search queries. Quantified Self utilizes Node.js, Expess and Sequelize, PostgreSQL and Jest.

#### [**_View Quantified Self in Production_**](https://self-quantified.herokuapp.com/) </br>

### Schema
![Alt text](./public/images/schema.png?raw=true "Database Schema")

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

The report will look like the following.

![Alt text](./public/images/test_coverage.png?raw=true "Test Coverage Report")

Navigate to the project directory of `coverage/lcov-report/quantified_self/`. Copy the file path and execute the command: `open insert_file_path`. This will open the specific coverage report in the default browser.

## Deployment

To view Quantified Self in development, execute the following command from the project directory: `nodemon npm start`. To view the application in a web browser, visit `localhost:3000` and navigate the the desired endpoint.


## Available Endpoints
The application provides the following endpoints:

#### User Endpoints
###### User Registration

A user can be created and saved in the databse in order to track meals and calorie intake. A user is created via a `POST` request to the `/api/v1/users` endpoint. A unique email, password, and matching password_confirmation must be provided, formatted as follows:

```
{
  "email": "example@email.com",
  "password": "password",
  "password_confirmation": "password"
}
```

If the request is successful, the application will return a unique api_key for the user, along with a status code of 200.

``` HTTP
status: 200
body:

{
    "api_key": "1234567abcdef"
}
```

###### User Session

A user can be 'logged in' or a 'session' created to retrieve a users api_key. A session is created via a `POST` request to the `/api/v1/sessions` endpoint. A correctly matching user email and password must be provided, formatted as follows:

```
{
  "email": "example@email.com",
  "password": "password"
}
```

If the request is successful, the application will return the users unique api_key, along with a status code of 200.

``` HTTP
status: 200
body:

{
    "api_key": "1234567abcdef"
}
```
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

An individual food item currently saved in the database can be retrieved via a `GET` request to the `/api/v1/foods/:id` endpoint.

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
###### Food Update
A food item can be updated in the database via a `PATCH` request to the `/api/v1/foods/:id` endpoint using the `id` of an existing food item in the database. The request must contain a food name (unique in the system) and the number of calories associated with the food matching the format provided below.

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

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 404.

``` HTTP
status: 404
body:

"Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"
```

In the event that the request is unsuccessful due to an incompatible calorie datatype of string, the application will return an error message, along with a status code of 404.

``` HTTP
status: 404
body:

"Please pass the calories datatype as a Number"
```

###### Food Deletion
A food item can be deleted from the database via a `DELETE` request to `/api/v1/foods/:id`, utilizing the `id` of an existing food item in the database. A successful response will return a `204` status code.

A unsuccessful response due to an `id` not found in the database will return:
 ``` HTTP
 status: 404
 body:
 {"error": "The requested food item could not be found and was therefore not deleted."}
 ```

#### Meal Endpoints
###### Meal Show

An individual meal currently saved in the database can be retrieved via a `GET` request to the `/api/v1/meals/:id` endpoint.

If the request is successful, the application will return an array of all database meal objects, along with a status code of 200.

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

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

{
  "error": "Requested meals could not be found."
}
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

###### Meal Creation

A new meal item can be created and saved in the database by a logged in user via a `POST` request to the `/api/v1/meals` endpoint. The request must contain a users API key, a meal name (unique in the system) and a date matching the format provided below.

``` HTTP
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

{
  "api_key": "user_key"
  "name": "meal name here",
  "date": "DD-MM-YYYY"
}
```

If the request is successful, the application will return the created meal object in the format below, along with a status code of 200.

``` HTTP
status: 200
body:

{
    "id": 1,
    "date": "2019-05-13T06:00:00.000Z",
    "UserId": 1,
    "name": "New Meal Name"
}
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

"That meal already exists for that user."
```

###### Adding a Food to a Meal

A logged in user can add a food item to an previously created meal by a `POST` request to the `/api/v1/meals/:meal_id/foods/:food_id` endpoint. The request must contain a users API key, an existing meal id of a meal belonging to the user, and a food id of a food item existing in the databse. A successful request should match the format provided below.

``` HTTP
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

{
  "api_key": "user_key"
}
```

If the request is successful, the application will return a success message along with a status code of 200.

``` HTTP
status: 200
body:

"Successfully added Food to Meal"
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

"No meal with that ID."
```

###### Adding a Recipe to a Meal

A logged in user can add a recipe item to an previously created meal by a `POST` request to the `/api/v1/meals/:meal_id/recipes` endpoint. The request must contain a users API key, an existing meal id of a meal belonging to the user, and the name, calories, and url of a recipe. Recipe information can be retireved via a seperate endpoint. A successful request should match the format provided below.

``` HTTP
POST /api/v1/foods
Content-Type: application/json
Accept: application/json

{
  "api_key": "user_key",
  "recipe": {
    "name": "Good Recipe",
    "calories": 100,
    "url": "recipe@url.com"
  }
}
```

If the request is successful, the application will return a success message along with a status code of 200.

``` HTTP
status: 200
body:

"Successfully added Recipe to Meal"
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

"Missing/incorrectly formatted recipe information."
```

###### Meal Food Deletion
To delete a food item on a meal, a successful `DELETE` request to the endpoint `/api/v1/meals/:meal_id/foods/:food_id` will delete the applicable MealFood record in the database and return a status code of `204`. An unsuccessful request will return the following:
``` HTTP
status: 404
body:
{
    "error": "Request does not match any records."
}
```

###### Meal Recipe Deletion
To delete a recipe item on a meal, a successful `DELETE` request to the endpoint `/api/v1/meals/:meal_id/recipes/:recipe_id` will delete the applicable MealRecipe record in the database and return a status code of `204`. An unsuccessful request will return the following:
``` HTTP
status: 404
body:
{
    "error": "Request does not match any records."
}
```
#### Recipe Endpoints
###### Recipe Index

All recipe items currently saved in the database can be retrieved via a `GET` request to the `/api/v1/recipes` endpoint.

If the request is successful, the application will return an array containing recipe objects, along with a status code of 200.

``` HTTP
status: 200
body:

[
  {
    "id": 1,
    "name": "recipe name",
    "calories": 100,
    "url": "example_url"
  },
  {...}
]
```

###### Recipe Show

An individual recipe item currently saved in the database can be retrieved via a `GET` request to the `/api/v1/recipes/:id` endpoint.

If the request is successful, the application will return the requested recipe object, along with a status code of 200.

``` HTTP
status: 200
body:

{
  "id": 1,
  "name": "recipe name",
  "calories": 100,
  "url": "example_url"
}
```

In the event that the request is unsuccessful, the application will return an error message, along with a status code of 400.

``` HTTP
status: 400
body:

{
  "error": "Requested recipe could not be found."
}
```

###### Recipe Deletion
A recipe can be deleted from the database via a `DELETE` request to `/api/v1/recipes/:id`, utilizing the `id` of an existing recipe in the database. A successful response will return a `204` status code.

A unsuccessful response due to an `id` not found in the database will return:
 ``` HTTP
 status: 404
 body:
 {"error": "The requested recipe could not be found and was therefore not deleted."}
 ```

 ###### Recipe Search
A list of recipes can be retrieved (utilizing a recipe search microservice) for use in meal recipe creation via a `GET` request to `/api/v1/search/recipes?mealType=MEALTYPE&query=QUERY`. Query parameter values of `mealType` and `query` must be provided as follows:

```
MEALTYPE = "boring" (regular recipes), "bang-for-your-buck" (recipes optimaized for shortest cook time and maximum claories, or "heart-attack" (maximum calories, minimum health factor).
QUERY = meal search query, i.e. "chicken", "pasta", or "berries"
```

A successful response will return a `200` status code and an array of 10 collections of recipe information:

```
[
    {
        "id": 162,
        "name": "Neiman Marcus Cafe Chicken Tortilla Soup Recipe",
        "url": "http://recipeofhealth.com/recipe/neiman-marcus-cafe-chicken-tortilla-soup-220132rb",
        "yield": "1",
        "calories": 6224,
        "image": "https://www.edamam.com/web-img/cb6/cb6687b4785e5a1da2e65e6b7a010bb5.jpg",
        "totalTime": "1",
        "updatedAt": "2019-05-14T22:22:23.238Z",
        "createdAt": "2019-05-14T22:22:23.238Z"
    },{...}
]
```

A unsuccessful response will return a `404` error and a message:
 ``` HTTP
 status: 404
 body:
 {"error": "Missing mealType and/or query."}
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
* Circle CI


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

### Authors
* [Mackenzie Frey](https://github.com/Mackenzie-Frey)
* [Zach Nager](https://github.com/nagerz)

### Special Recognition
* [Dione Wilson](https://github.com/dionew1)
* [Cory Westerfield](https://github.com/corywest)



<!-- Keep the below comment block in case the schema diagram need to be altered.
This can be done by visiting https://dbdiagram.io/d, creating a new diagram/ deleting
the diagram in the left hand bar and pasting in the below.

Table Food {
  id int [pk]
  name string
  calories int
  created_at date
  updated_at date
}

Table Meals {
  id int [pk]
  name string
  date date
  UserId int
  created_at date
  updated_at date
}

Table MealFoods {
  id int [pk]
  MealId int
  FoodId int
  created_at date
  updated_at date
}

Table Users {
  id int [pk]
  email string
  password_digest string
  api_key string
  created_at date
  updated_at date
}

Table Recipe {
  id int [pk]
  name string
  calories int
  url string
  created_at date
  updated_at date
}

Table MealRecipe {
  id int [pk]
  MealId int
  RecipeId int
  created_at date
  updated_at date
}

Ref: "Meals"."id" < "MealRecipe"."MealId"

Ref: "MealRecipe"."RecipeId" < "Recipe"."id"

Ref: "Food"."id" < "MealFoods"."FoodId"

Ref: "MealFoods"."MealId" < "Meals"."id"

Ref: "Meals"."UserId" < "Users"."id" -->
