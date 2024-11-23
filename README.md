## Social Media API Documentation
1. POST /auth/register
    Description: Register a new user.
    Request Body:
    - json
        {
            "name": "String",
            "email": "String",
            "password": "String"
        }

    Response: 201 Created
    json
    {
    "message": "User registered successfully"
    }


2. POST /auth/login
    Description: Login a user.
    Request Body:
    json
    {
        "email": "String",
        "password": "String"
    }

    Response: 200 OK
    json
    {
        "token": "JWT_Token"
    }


3. POST /posts
    Description: Create a post.
    Request Body:
    json
    Copy code
    {
        "title": "String",
        "content": "String",
        "user": "ObjectId"
    }

    Response: 201 Created
    json
    {
        "_id": "ObjectId",
        "title": "String",
        "content": "String",
        "user": "ObjectId",
        "createdAt": "Date",
        "updatedAt": "Date"
    }

4. GET /posts/:userId
    Description: Retrieve posts by user.
    Params: userId (in URL)
    Response: 200 OK
    json
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


    5. POST /comments
    Description: Add a comment to a post.
    Request Body:
    json
    Copy code
    {
        "text": "String",
        "post": "ObjectId",
        "user": "ObjectId"
        }
    Response: 201 Created

    json
        {
        "_id": "ObjectId",
        "text": "String",
        "post": "ObjectId",
        "user": "ObjectId",
        "createdAt": "Date"
        }


    6. GET /comments/:postId
    Description: Retrieve comments for a post.
    Params: postId (in URL)
    Response: 200 OK
    json
    [
        {
            "_id": "ObjectId",
            "text": "String",
            "post": "ObjectId",
            "user": "ObjectId",
            "createdAt": "Date"
        }
    ]
    Error Codes:


    400 Bad Request: Invalid input data.
    401 Unauthorized: Invalid credentials.
    404 Not Found: Resource not found.
    500 Internal Server Error: Server-side error.


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