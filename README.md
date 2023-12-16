**========TASK MANAGER API DOCUMENTATION========**

**Note**: After fetching the taskmanager from git plase type this command in Terminal to Install Needed Dependencies "npm install" or "napm i ";

Using Environment Variables in **config.env** File for security purposes


1) **To Create a new user hit this API from Postman** 
    http://localhost:3000/api/users/signup
    Need To send A body to save the data in database
    When saving the New User The new UUVID Will generate in Controller automatically
   and the user role is creted in backend only defalut role is user for every coz admin can be only one.
   
    ```
    {
    "name":"Hem",
    "email":"hemichand.y@gmail.com",
    "password":"hemchand@123",
    "passwordConfirm":"hemchand@123"
    }
    ```
    send this body to save a user  in database
    reposne  , When new user created a JWT token is generated whith secret key 
    ```
    {
    "status": "success",
    "data": {
        "newUser": {
            "roles": "user",
            "_id": "657bfc792fdb64a4ddb7f260",
            "name": "Hem",
            "email": "hemichand.y@gmail.com",
            "password": "$2a$12$11a69ug4gjfbKHPULRxUvOXKp4nkmgX4HK1DRsEf6VvWQH3sDVQhK",
            "userId": "e11587b7-bbc0-4f2a-b078-4d6c80910b1f",
            "__v": 0
        },
        "token":                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMTE1ODdiNy1iYmMwLTRmMmEtYjA3OC00ZDZjODA5MTBiMWYiLCJpYXQiOjE3MDI2MjQzNzcsImV4cCI6MTcxMDQwMDM3N30.iHtvuoZv6Yqivaugsn3DhVLT76gN2L_YOClkWzbk9nA"
        }
    }
    ```

2) **Signin The User after SignUp**
    http://localhost:3000/api/users/signin
    if the user data is available in data base it will check and fetch the user and signed user in.
    send data like this :
    ```
    {
    "email": "hemichand.y@gmail.com",
    "password": "hemchand"
    }
    ```
    response look like this
    ```
    {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMjhmMzFhNC00YjU4LTQ3MjMtOGQ2YS0zMTEwMDgzOGQ4OGYiLCJpYXQiOjE3MDI2NjAzODAsImV4cCI6MTcxMDQzNjM4MH0.e01k9nzdSoB3kqjiItb1Lf-CdOrSwm5KnTvRNaQdUqI",
    "user": {
        "roles": "user",
        "_id": "657c7c729a0cd2e607ad14df",
        "name": "HemChand",
        "email": "hemichand.y@gmail.com",
        "userId": "e28f31a4-4b58-4723-8d6a-31100838d88f",
        "__v": 0
        }
    }
    ```
    if user login success it will take user to his dash board where he can post a task and see tasks list 
    if the user is not found error will look like this
   ```
   {
    "message": "No User Found",
    "status": "fail"
   }
   ```

3) **To Get All Created users from Database**
    http://localhost:3000/api/users/
   to get all user we need to send the token and no one can see all users list . only admin can see it with is protected and secure.
    Use this API to get all users as An Array

4) **To Get A user from Database**
    http://localhost:3000/api/users/usertasklist/e28f31a4-4b58-4723-8d6a-31100838d88f
    if The userId  Is correct the Response will be Look Like This 
    ```
     {
    "status": "success",
    "data": [
        {
            "completed": true,
            "_id": "657c889fe891aee897e64e13",
            "title": "Groceries",
            "description": "Get Groceries form the Store , madhapur",
            "dueDate": 1703097000,
            "taskId": "2cb22257-6223-4506-b3fc-603f1e5ad1f5",
            "userId": "e28f31a4-4b58-4723-8d6a-31100838d88f",
            "__v": 0,
            "updatedAt": 1702661108
        }
    ]
}
    ```
    To get a single User we need to pass the user id to The API as a params if the user id is correct the user will return. if the user id is not matched to   user              collection in Database the global error will Throw an Error like the user  is not found with the given ID;

5) **To Update or complete a single Task API**
    http://localhost:3000/api/tasks/1fa6a315-f42a-402b-bc22-f692b42c8a42
    use this APi for task update and complete
   ```
    {
    "title": "Groceries",
    "description": "Get Groceries from D-Mart, Kondapur",
    "dueDate": 1702541331,
    "completed":false
    }
   ```
   if there is no task with given task id error will come
    ```
    {
    "message": "There is no task with id : 1fa6a315-f42a-402b-bc22-f692b42c8a42",
    "status": "fail"
    }
    ```




6) **Created e Middleware for Global Route Handler** 
   This middleware will check the Given Route is a valid Route Or not.
  if the Route is not Correct the global middleware will throw an Error;
  Created a errorController for all application Error like in valid id or invalid data sending to API or bad request or bad routes 
7) **Created Auth controller for Authentication**
   create a controller for authentication using JWt token.
   signup and signin will generate a JWT token and check the user is available or not or token is valid or not
8)**Admin Router**
   ```
   {
    "email": "admin@gmail.com",
    "password": "admin123"
    }
   ```
   when admin logs in he can see all created users and there tasks list and when they copleted or updated tasks 
