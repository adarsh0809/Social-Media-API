# Social Media API

This is a RESTful API for a social media platform that supports user registration, authentication, creating posts, and commenting on posts. Built using **Node.js**, **Express.js**, and **MongoDB**, the API is secure and scalable.

---

## Features
- User registration and login with JWT-based authentication.
- Create, read, and retrieve posts by users.
- Add comments to posts.
- MongoDB as the database for storing application data.

---

## Setup Instructions

### Prerequisites
Ensure the following tools are installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation Steps

1. **Clone the Repository**  
   Run the following commands:
   ```bash
   git clone https://github.com/adarsh0809/Social-Media-API
   cd social-media-api
   ```


## Install Dependencies
Install the required npm packages:
```bash
npm install
```

Environment Variables
Create a .env file in the root directory and add the following configuration:

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Run the Application
Start the server locally with:

```bash
npm start
```
The API will be accessible at http://localhost:4000.






# API Documentation

## 1. **Register a New User**
**POST** `/auth/register`  
**Description:** Register a new user.  
**Request Body:**
```json
{
  "name": "String",
  "email": "String",
  "password": "String"
}
```

## 2. **Login User**
**POST** `/auth/login`  
**Description:** Login a user and return a JWT token.  
**Request Body:**
```json
{
  "email": "String",
  "password": "String"
}
```


## 3. **Create a Post**
**POST** `/posts`  
**Description:** Create a new post.  
**Request Body:**
```json
{
  "title": "String",
  "content": "String",
  "user": "ObjectId"
}

```

## 4. **Retrieve Posts by User**
**GET** `/posts/:userId`  
**Description:** Retrieve all posts created by a specific user.  
**Params:**  
- `userId` (in URL)  

**Response:**
```json
[
  {
    "_id": "ObjectId",
    "title": "String",
    "content": "String",
    "user": "ObjectId",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```
## 5. **Add a Comment to a Post**
**POST** `/comments`  
**Description:** Add a comment to a post.  
**Request Body:**
```json
{
  "text": "String",
  "post": "ObjectId",
  "user": "ObjectId"
}
```
## 6. **Retrieve Comments for a Post**
**GET** `/comments/:postId`  
**Description:** Retrieve all comments for a specific post.  
**Params:**
- `postId`: The ID of the post (in URL).

**Response:**
```json
[
  {
    "_id": "ObjectId",
    "text": "String",
    "post": "ObjectId",
    "user": "ObjectId",
    "createdAt": "Date"
  }
]
```



- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Invalid credentials.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server-side error.



## Mongoose Schema Design
    - User Schema:

    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
        });

    - Post Schema:

        const postSchema = new mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        });


    - Comment Schema:

        const commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        });