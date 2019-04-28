# Project Title

Modernday Researcher


## Project Requirements

```
User
```
- Create a user
- Login

```
Resources (cards)
```
- See Resources by category
- Add Resources
- Delete Resources
- Mark Resources as COMPLETE
- Edit Resources

## How to setup API

### Step 1
Clone the repository into your app's root directory and rename the folder to **server**

### Step 2
cd into the **server** folder and run `yarn`

### Step 3
inside the **server** folder run `knex seed:run`

### Step 4
run `yarn start` inside the root folder for the app

### Step 5
Open a separate terminal and run `yarn server` inside the **server** folder

## How to use API

### User Routes
- **POST** localhost:5000/users/register (Used to register a user)
- **POST** localhost:5000/users/login (Used to login a user)

### Card Routes
- **GET** localhost:5000/cards/users/:id (Get all the cards for a user)
- **GET** localhost:5000/cards/:id (Get a card by ID)
- **POST** localhost:5000/cards/users (Add a new card to the user)
- **DELETE** localhost:5000/cards/:id (Delete a card by ID)
- **PUT** localhost:5000/cards/:id (Update a card by ID)
