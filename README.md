<a id="ancora"></a>
# <center>  Prova de Desafio Profissional V ➖ 04/05 ➖ The Marvel Repository </p> </center>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png" alt="Marvel Logo" width=900 height=380>

<a id="ancora0"></a>
<a name="Table of Content"></a>
## 🗂️ Table of contents
1. [About the project](#ancora1)
2. [Technologies](#ancora2)
3. [Features](#ancora3)
4. [How to run the project](#ancora4)
5. [API EndPoints](#ancora5)
6. [Authors](#ancora6)

<a id="ancora1"></a>
## 🔎 About the project
This is the assessment that Professor Bussola gave for the Professional Challenge V subject. Where we had to consume the Marvel API and manipulate its data, integrating with external services.

<a id="ancora2"></a>
## 🛠️Technologies

<font size="15"> <p align="center"> These are the technologies that we used in this project: <h1>
</p>  </font> <br />

<div align="center">

  <table>
    <tr>
      <th>Package</th>
      <th>Version</th>
    </tr>
    <tr>
      <td>@types/express</td>
      <td>^4.17.21</td>
    </tr>
    <tr>
      <td>@types/joi</td>
      <td>^17.2.3</td>
    </tr>
    <tr>
      <td>@types/node</td>
      <td>^20.10.5</td>
    </tr>
    <tr>
      <td>bcryptjs</td>
      <td>^2.4.3</td>
    </tr>
    <tr>
      <td>dotenv</td>
      <td>^16.3.1</td>
    </tr>
    <tr>
      <td>express</td>
      <td>^4.18.2</td>
    </tr>
    <tr>
      <td>express-async-errors</td>
      <td>^3.1.1</td>
    </tr>
    <tr>
      <td>http-status-codes</td>
      <td>^2.3.0</td>
    </tr>
    <tr>
      <td>joi</td>
      <td>^17.11.0</td>
    </tr>
    <tr>
      <td>jsonwebtoken</td>
      <td>^9.0.2</td>
    </tr>
    <tr>
      <td>mongoose</td>
      <td>^8.0.3</td>
    </tr>
    <tr>
      <td>supertest</td>
      <td>^6.3.3</td>
    </tr>
    <tr>
      <td>mongodb-memory-server</td>
      <td>^9.1.3</td>
    </tr>
  </table>

</div>


<a id="ancora3"></a>
## ✨ Features

These are some of the main features supported by our API:
 * Users can fetch data from Marvel API (The user must have a Marvel token).

 * Users can list the Creators, Characters and Comics fetched. Either by listing all of them or searching by ID.

 * User can also create a new Creator, Character or Comic.

 * If it's necessary, it's also possible to delete any record. Either by id or by query params.

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora4"></a>
## 🚀 Let's get started!

These are the steps to you to copy and run the project in your local machine:

   ## 1️⃣ Clone this repository:
    git clone [https://github.com/SenhorAfonso/users-and-events-api.git](https://github.com/SenhorAfonso/marvel-api.git)

   ## 2️⃣ Install the dependencies:
    npm install

   ## 3️⃣ Change the server settings
   - The first step is to change the name ``` .env.example ``` file, to ```.env```
   - Now, edit the file by changing the variables.
   - If you prefer, You can also use your localhost database! 😉

   ## 4️⃣ Now, convert your TypeScript files to JavaScript:
    tsc -w

   ## 5️⃣ To run the project:
    npm run start

   ## 6️⃣ To run the test suite:
    npm run test

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora5"></a>
## 🔴 API EndPoints

💡 An API endpoint is a specific location within an API that accepts requests and sends back responses. These are the endpoints of this API:
 
## Users endpoints

POST: `/api/v1/users/signup`. ➡️ To sign-up a new user. <br>
🚚 endpoint payload:
```
username: "string",
email: "example@gmail.com",
password: "string",
confirmPassword: "string"
```

***All the fields are required***.

---

POST: `/api/v1/users/login`. ➡️ To sign-in a user. <br>
🚚 endpoint payload:
```
email: "example@gmail.com",
password: "string"
```

***All the fields are required***

---
## Creators endpoints
🔒All this routes needs the user to be logged-in.

POST: `/api/v1/creator/`. ➡️ To create a new event. <br>
🚚 endpoint payload:
```
name: "string",
role: "string",
sagaComic: "string",
otherComics: "array<string>"
collectionSize: "number" (optional)
```

***All fields but collectionSize are required***. <br>

---
GET: `/api/v1/fetch-creators/` ➡️ To fetch creators from marvel's API. <br>
GET: `/api/v1/creators/:id`. ➡️ To retrieve a single creator by id. <br>
GET: `/api/v1/creators/` ➡️ To retrieve an array of creators. <br>
GET: `/api/v1/creators-characters/` ➡️ To reset the creators database. <br>
---
DELETE: `/api/v1/creator/:id` ➡️ To delete a single creator.  <br>
---
PUT: `/api/v1/creator/:id` ➡️ To update a single creator.  <br>
🚚 endpoint payload:
```
name: "string",
role: "string",
sagaComic: "string",
otherComics: "array<string>"
collectionSize: "number" (optional)
```

## Comics endpoints
🔒All this routes needs the user to be logged-in.

POST: `/api/v1/comic/`. ➡️ To create a new comic. <br>
🚚 endpoint payload:
```
title: "string",
description: "string",
publishDate: "string",
pageCount: "number"
folder: "string"
```

***All fields are required***. <br>

---
GET: `/api/v1/fetch-comics/` ➡️ To fetch comics from marvel's API. <br>
GET: `/api/v1/comic/:id`. ➡️ To retrieve a single comic by id. <br>
GET: `/api/v1/comics/` ➡️ To retrieve an array of comics. <br>
GET: `/api/v1/reset-comics/` ➡️ To reset the comics database. <br>
---
DELETE: `/api/v1/comic/:id` ➡️ To delete a single comic.  <br>
---
PUT: `/api/v1/comic/:id` ➡️ To update a single comic.  <br>
🚚 endpoint payload:
```
title: "string",
description: "string",
publishDate: "string",
pageCount: "number"
folder: "string"
```

## Characters endpoints
🔒All this routes needs the user to be logged-in.

POST: `/api/v1/character/`. ➡️ To create a new character. <br>
🚚 endpoint payload:
```
name: "string",
description: "string",
thumbnail: "string",
comic: "string"
comicCount: "number"
```

***All fields are required***. <br>

---
GET: `/api/v1/fetch-characters/` ➡️ To fetch characters from marvel's API. <br>
GET: `/api/v1/character/:id`. ➡️ To retrieve a single character by id. <br>
GET: `/api/v1/characters/` ➡️ To retrieve an array of characters. <br>
GET: `/api/v1/reset-characters/` ➡️ To reset the characters database. <br>
---
DELETE: `/api/v1/character/:id` ➡️ To delete a character comic.  <br>
---
PUT: `/api/v1/character/:id` ➡️ To update a single character.  <br>
🚚 endpoint payload:
```
name: "string",
description: "string",
thumbnail: "string",
comic: "string"
comicCount: "number"
```

### [⬆️ Go back to the table of content](#ancora0)
---

<a id="ancora6"></a>
## 👨‍💻 Authors

- [Pedro Afonso](https://github.com/SenhorAfonso)
- [Rhayssa Andretto](https://github.com/rhayssaandretto)


---
### [⬆️ Go back to the top](#ancora)
