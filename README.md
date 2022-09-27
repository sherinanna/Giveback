# Giveback

https://receptive-robin.surge.sh/

![This is an image](/capstone2.png)

## Goal
A go-to website to search for cocktails, get recipes, curate a list of favorites and much more.

## Users
Anyone above the age of 18 who is  interested to know more about cocktails. A place for amateurs to search for cocktail recipes, experts to quickly create new drinks with at-hand ingredients, with guidance on the best look for a drink.

## Technology
Frontend: HTML,CSS Javascript, Jquery, Bootstrap

Backend: Python, Flask, SQLAlchemy, PostgresSQL

## Data
API Choice: The Cocktail DB
https://www.thecocktaildb.com/api.php?ref=apilist.fun
The API provides cocktail information by name, ingredients, alcohol level and even glass type.

## Database Schema
The schema consist of following three tables:

**Users** : id, username, password,age,first_name, last_name

**Reviews** : id, title, description,user_id, cocktail_id

**Favorites** : id,user_id,cocktail_id

![This is an image](/DatabaseDiagram%20.png)

## UserFlow

The website homepage will display a random list of cocktails with images. Users can also view the links to search for cocktails by various categories (search by name,ingredients, and category). The page also displays the login/logout/signup links.

To further access the app,each user will need to sign up and login. Only adults above the age of 18 years will be allowed to signup.Users can see the list of cocktails that match the search criteria  and  link to the individual cocktail page that includes the recipe and user reviews.

Users have the option to favorite drinks which gets saved to the user account and post reviews if interested. 

## How to run the app
You will need to install Python3 and set up a postgress database. Then follow the below steps to run the code successfully:

Create the python virtual environment
```
$ python3 -m venv venv
$ source venv/bin/activate
```
Install required packages
```
(venv) $ pip install -r requirements.txt
```

Setup the database
```
(venv) $ createdb cocktail
(venv) $ python seed.py
```

Start the server
```
(venv) $ flask run
```

## Testing
Integration testing has been implemented using the unittest module in Python. There are four test files included:two for testing the model, one for testing the routes and one to test additional logic.

To run a file containing unittests, you can run the command **FLASK_ENV=production python -m unittest name-of-python-file**

