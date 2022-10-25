<h1 align="center">Unfold your thoughts with Un-Fold ✉️</h1>

> Un-Fold : Connecting People, Ideas and Products worldwide !

## Project Description

Blogging website for webkriti.

- Users can create their un-fold account or can directly sign in if they already have the account made .
- Then the user will be directed to home page , and he/she can see all the latest blogs , and all the blogs by the users he/user follow and can bookmark the blog which he can refer later from his profile.
- Other user can search the blog by its title or tag , and also the user by his/her name .
- The user can open the blog , read it , like and give review on the blog .
- In the same page , he/she can see otherblogs by the same user .
- User can open other users profile and can FOLLOW or UNFOLLOW him/her , can see whom he/she is following and his/her followers .
- In the same page , he can see all his/her blogs .
- User can compose his/her blog where and choose on which category he/she wants to write . The blog can be formatted with various tools present in the text-editor , links , images can also be added to the blog. Later the blogs can also be edited .
- User can also edit his/her profile whenever he wants to.

# Screen shots

<img src="./assets/unfold1.png"></img>
<img src="./assets/unfo.png"></img>
<img src="./assets/unfold3.png"></img>
<img src="./assets/unfold4.png"></img>
<img src="./assets/unfold5.png"></img>
<img src="./assets/edit.png"></img>
<img src="./assets/last.png"></img>

### ✨ [Deployed site](http://65.0.100.50/)

# Features Implemented

## Front-end

1. Sign in and sign up page :

- All the checks have been made on the frontend side for email and password.
- A user friendly prompts appear if there is any error while filling the input values.

2. Home Page :

- Once the user is signed in, a token is generated, saved in local storage and also stored in browser cookie, which helps maintain session activity. This token is verified every time the user visits any page.
- Users can here view all the blogs that can has been posted by the user , can bookmark them . It also has a section of categories which includes all the genres of the blogs.
- Then it has a 3rd section of the blogs by the user whom the logged in user follows.

3. Blog Page :

- In the blog page , it has the record of the person by whom the blog is posted.
- Then the logged in user can also like or unlike (if he has already liked) an comment on the blog.
- Then it has a section of other blogs by the same user who has posted that particular blog.

4. Blog edit page

- Users can edit their blogs .

5. Profile Page :

- Users can see the number of followers , following and the blogs .
- Can also follow/unfollow the user.
- See all the bookmarked blogs here.
- Can also see whom are they following and by whom they are being followed.

6. Edit Profile Page :

- Users can make changes to their profile like their profile image, bio, description etc., and all this information is sent to the back-end and then further stored in the database.

7. Edit profile Page

- Users can edit their profile details from here.

8. Category Page

- It has all the blogs that belong to the category

9. EXTRA FEATURES THAT ARE IMPLEMENTED

- Users can add tags to their blogs to mention the genre of their blogs.
- Users can bookmark blogs and view them later.
- Users can follow/unfollow any other user

#### Future Ideas

- One-on-One chat feature
- Allowing the user to archive his/her blogs or make it private
- implement notification for any activity(like/comment/bookmark) on posted blogs
- Allow users to share blogs via other platforms

## Back-end

1. slash routes for authentication purpose

- We have setup basic authentication for login and signup wherein we set up a token in the cookie and use it for authentication
  POST routes

```
/api/login
/api/register
/api/logout
```

2. user routes to perform get, post and put operations pertaining to user information
   GET routes

```
/api/user/getuserinfo
/api/user/getFollowingblogs
/api/user/getbookmarkedblogs
/api/user/getFollowers
/api/user/getFollowing
/api/user/getallusers

```

POST routes

```
/api/user/followUser
/api/user/unfollowUser
/api/user/bookmarkblog
/api/user/unbookmarkblog

```

PUT route

```
/api/user/editprofile

```

3. blog routes to perform delete, get, post and put operations pertaining to blogs
   DELETE routes

```
/api/blog/deleteBlog

```

GET routes

```
/api/blog/getAllBlogs
/api/blog/getblogbyid
/api/blog/allUserBlogs
/api/blog/getlikedusers

```

POST routes

```
/api/blog/addBlog

```

PUT routes

```
/api/blog/editBlog
/api/blog/likeBlog
/api/blog/unlikeBlog

```

4. comment route to add, delete and get comments.

- We are verifying token as middleware for every post, get or delete request

```
/api/comment/deletecomment
/api/comment/getComments
/api/comment/addComment

```

5. category routes for get and post requests on blog categories
   GET routes

```
/api/category/getallcategories
/api/category/getallcategoryblogs
/api/category/getcategoryinfo
/api/category/getblogcategories

```

POST routes

```
/api/category/addcategorytoblog
/api/category/addcategory

```

6. Middlewares

- error middleware inorder to effectively handle any/all encountered errors in controller functions.
- tokenauth middleware for authemtication (put before each request) which checks for the presence of a jwt token in the cookie.

# Technologies/Libraries/Packages Used

| Packages      | README                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| bcrypt        | To store hashed password in database                                                                                 |
| dotenv        | To keep db connection string, client id, client secret key and also cloudinary config credentials safe               |
| jsonwebtoken  | To store users session encrypted and verify them as middleware in user/blog/comment/category api requests            |
| nodemon       | To run application in dev mode                                                                                       |
| body-parser   | Parse incoming request bodies in a middleware before your handlers, available under the req.body property.           |
| cloudinary    | It provides cloud-based image and video management services.                                                         |
| cookie-parser | Parse Cookie header and populate req.cookies with an object keyed by the cookie names.                               |
| cors          | For Cross-Origin Resource Sharing                                                                                    |
| express       | a back end web application framework for building RESTful APIs with Node.js                                          |
| jwt           | JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties. |
| multer        | Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.       |
| Sequelize     | Sequelize is a modern TypeScript and Node.js ORM for Postgres                                                        |

## Local Setup

1.  To run the server in dev mode use
    ```sh
    npm run dev
    ```
2.  To run the server in production mode
    ```sh
    npm start
    ```
3.  Note that you have to create an env file taking reference from .env.example file to run the server .

### Built With

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40" style="max-width:100%;"><a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a>

## Contact

👤 **Aaroh Srivastava, Anshu Joshi, Hari Om Sharma**

### Aaroh Srivastava (2021BCS-001)

- Github: [@Aaroh1](https://github.com/Aaroh1)
- LinkedIn: [@aaroh-srivastava](https://linkedin.com/in/aaroh-srivastava)
- Gmail: [mail](mailto:aarohsjcian1@gmail.com)
- Instagram: [@aaroh01](https://www.instagram.com/aaroh01/)

### Anshu Joshi (2021BCS-014)

- Github: [@ImAnshuJoshi](https://github.com/ImAnshuJoshi)
- LinkedIn: [@anshujoshi](https://www.linkedin.com/in/anshu-joshi-9080b6223/)
- Gmail: [mail](mailto:anshu.aj.joshi@gmail.com)
- Instagram: [@anshu_joshi](https://www.instagram.com/imanshujoshi/)

### Hari Om Sharma (2021BCS-029)

- Github: [@iamhariom0228](https://github.com/iamhariom0228)
- LinkedIn: [@hari-om-sharma](https://www.linkedin.com/in/hari-om-sharma-72249b244)
- Gmail: [mail](mailto:iamhariom28@gmail.com)
- Instagram: [@hari*om_sharma*](https://www.instagram.com/hari_om_sharma_/)

## Show your support

Give a ⭐️ if this project helped you!
