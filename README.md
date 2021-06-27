# Disney Characters Documentation
This is a basic API to do operations about character and movies from the Disney's world.

> ATTENTION!: The swagger documentation is still on progress, to read the postman documentation click [**HERE**](https://documenter.getpostman.com/view/14572696/Tzedi5CV)
### Dependencies
* NodeJs
* Express
* Sequelize
* SendGrid
* JsonWebToken
* bcrypt
* wingston

### Before start
---
This API uses an third party services for sending emails, so before start I recommend to create an account on SendGrid and generate an API key to the correct usage.

### Usage
---
1- Install the dependecies
> npm install

2- Rename the **env.example** file to **.env** to the sensitive data and complete the fields with your configurations

2- Start the API

Production:
> npm start

Development:
>npm run dev

### Endpoints
---
For detailed documentation click [**HERE**](https://documenter.getpostman.com/view/14572696/Tzedi5CV)
### Auth
---
    POST /auth/register 
This operation allow to register an user in the database, with this user you can get a token to do operations in the API.

If the registration proccess is successful the API will try to send an email by SendGrid with this format:

    to: newUser@registered.com
    from: sender@email.com
    subject: "Thanks you to register to my Api!"
    text: Hi, new user! this email was sended by SendGrid to say thanks you, now you can use the api now
---
    POST /auth/login
This operation is used to get a token from an already registered user. To Log In u need the email and the password.

### Characters
---
    POST /characters
This operation saves a character object in the database.

    GET /characters 
This method will give a list of characters which can be filtered by specific querys.

    GET /characters/:id 
This method will search a character with the id given on the path variable :/id. If the character is found, the server will return the detailed data from the character, if not, will send an error communicating that it was not found.

    PUT /characters/:id
Update the character with the given id

    DELETE /characters/:id
Delete the Character with the given id

### Movies
---
    POST /movies
This operation saves a movie object in the database. For this you must send an object with the correct data.
    
    GET /movies
This method returns a list of objects with some data of all movies in the database. You can filter the the data received by specific query params

    GET /movies/:id
This method will search a movie with the id given on the path variable **:/id**. If the movie is found, the server will return the detailed data from the movie, if not, will send an error communicating that it was not found.

    PUT /movies/:id
This method update the movie with the given id

    DELETE /movies/:id
This method delete the movie with the given id

### Genres
---
    POST /genre
This operation saves a genre object in the database. For this you must send an object with the correct data.

    GET /genre
This method returns an array of objects with the genres in the database. You can filter the data received by the name of the genre with the query name.

    GET /genre/:id
This method return all the data of the genre with the id given and an array of the movies associated
    
    PUT /genre/:id
This method update the genre with the given id
    
    DELETE /genre/:id
This method delete the genre with the given id

### Associations    
---
    PUT /associate/movie/:movieId/character/:charId
This method creates an association between the movie table and the characters table, for this you need to give the id of the movie in movieId path variable and give the id of the character in the charId path variable, this will create the association automatically.

    PUT /associate/movie/:movieId/genre/:genreId
This method creates an association between the movie table and the genres table, for this you need to give the id of the movie in movieId path variable and give the id of the genre in the charId path variable, this will create the association automatically.

### Users
---
>ATTENTION
For users operations you must have an ADMIN role, only the user with the admin role can do the CRUD operations with users.

    POST /users
This method is quite similar to register user, but with the difference that the ADMIN that creates it can assign the ADMIN role.

    GET /users
This method returns an array of objects with the users in the database.

    GET /users/:id
This method will search a user with the id given on the path variable :/id. If the user is found, the server will return the detailed data from the user, if not, will send an error communicating that it was not found.

    PUT /users/:id
This method updates an user and return the result of the operation.

    DELETE /users/:id
This method deletes an user and return the result of the operation.

