# social-network-api

![Unlicense](https://img.shields.io/badge/license-The_Unlicense-blue)

Demonstration of using Node/Express to serve a Restful API using Mongoose ODM for Mongo DB.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/MONGOOSE-white?style=for-the-badge&logo=mongoose)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Table of Contents

- [API Specification](#api-specification)
- [Video Demo](#video-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#licensing)
- [Contributing](#contributing)

### API Specification

The social network API provides endpoints that allow you to perform create, read, update, and delete (CRUD) operations on items in the model.
Note: Started to add Swagger to the project but to be honest, it was entirely too much overhead for a simple project like this, and wasn't worth the extra
effort for the value.

#### User

##### POST /api/users/

Inserts one record in the user collection.

Request Body Parameters:

```
{
    "username": "a unique username",
    "email": "a valid, unique email address"
}
```

Status Codes:

- 201 -> Insertion success
- 400 -> Invalid request input
- 500 -> Something went wrong with the backend

##### PUT /api/users/{id}

Updates an existing user.

Request Body Parameters:

```
{
    "username": "an updated tag name",
    "email": "an updated email"
}
```

Status Codes:

- 200 -> Update success
- 400 -> Invalid request input
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### GET /api/users/{id}

Get a single user by an id.

Status Codes:

- 200 -> Success
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### GET /api/users

Get all users.

Status Codes:

- 200 -> Success
- 500 -> Something went wrong with the backend

##### DELETE /api/users/{id}

Deletes a single user by an id, along with all associated thoughts

Status Codes:

- 200 -> Success
- 404 -> Unable to find the user id provided
- 500 -> Something went wrong with the backend

##### POST /api/users/{id}/friends/{friendId}

Adds a friend to the user's friend list.

Status Codes:

- 200 -> Update success
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### DELETE /api/users/{id}/friends/{friendId}

Removes a friend from the user's friend list.

Status Codes:

- 200 -> Update success
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

#### Thoughts

##### POST /api/thoughts/

Inserts one record in the Thought collection.

Request Body Parameters:
{
"userId": "unique system id for the user associated",
"username" : "unique username for the user associated",
"thoughtText" : "Text of the thought",
}

Status Codes:

- 201 -> Insertion success
- 400 -> Invalid request input
- 500 -> Something went wrong with the backend

##### PUT /api/thoughts/{id}

Updates an existing thougth.

Request Body Parameters:

```
{
	"thoughtText": "some updated text here"
}
```

Status Codes:

- 200 -> Update success
- 400 -> Invalid request input
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### GET /api/thoughts/{id}

Get a single thought by an id.

Status Codes:

- 200 -> Success
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### GET /api/thoughts

Get all thoughts.

Status Codes:

- 200 -> Success
- 500 -> Something went wrong with the backend

##### POST /api/thoughts/{id}/reactions

Inserts one Reaction in the reactions list.

Request Body Parameters:
{
"reactionBody": "Your reaction here",
"username": "an associated username"
}

Status Codes:

- 200 -> success
- 400 -> Invalid request input
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### DELETE /api/thoughts/{id}/reactions

Deletes a Reaction from the reactions list.

Request Body Parameters:
{
"reactionId": "reaction id to remove"
}

Status Codes:

- 200 -> success
- 400 -> Invalid request input
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

##### DELETE /api/thoughts/{id}

Deletes a single thought by an id.

Status Codes:

- 200 -> Success
- 404 -> Unable to find the id provided
- 500 -> Something went wrong with the backend

### Video Demo

There is a [short video](https://drive.google.com/file/d/1y6h5CjEib51iUZZjJ_Hr_l_qEalndssY/view?usp=sharing) to demonstrate the creation of the collections, seeding the demo data into the database, running the server, and then each CRUD scenario played with Insomnia.

### Installation

1.  Install Node.js version 20.x or newer
2.  Install or use existing latest mongodb server locally or accessible from the cloud
3.  Clone https://github.com/ericroys-school/social-network-api.git
4.  `cd` into the `social-network-api` directory
5.  Run `npm i` to load all the project dependencies
6.  Edit .env.EXAMPLE to include your mongodb endpoint url
7.  Re-name .env.EXAMPLE to .env
8.  Add the demo data (optional) by running `npm run seed`
9.  Run the program via `node server.js` or `nodemon server.js`

### Usage

The API should be available at http://localhost:3001 using the routes specified in the earlier API specification section.

### Credits

No kittens, puppies, mongoose, penguins, or octopi were harmed in the making of this project.

### Licensing

As per always, this repo is licensed with [The Unlicense](http://choosealicense.com/licenses/unlicense) so feel free to do whatever. Share with your kids, dogs, neighbors, mail carrier, etc. Have a nice day!

### Contributing

Feel free to reach out via email @ eric.roys@gmail.com if you are interested in contributions to the project or have any kindly suggestions for improvements and/or enhancements. Tanks, Sherman!
