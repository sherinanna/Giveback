# Giveback

https://receptive-robin.surge.sh/

![This is an image](/capstone%202.png)

## Goal
GiveBack is an app where users can support activities of various nonprofit organizations.  Volunteers can sign up and identify opportunities that suit their interests as well as create free events that match their skill. Hence any user can :
 ### Create own events and invite volunteers
 ### Register as volunteer for an event


## Users
Anyone interested in investing time and effort to give back to society.

## Technology
Frontend: ReactJS

Backend: Nodejs, Express, PostgresSQL

## Data
Created custome backend API and populated it with sample data. The seed data was obtained from Newyork city Voulnteer opportunity data available as csv at https://opendata.cityofnewyork.us/

## Database Schema
The schema consist of following three tables:

**Users** : username, password,first_name, last_name,email,is_admin

**Events** : id, title, description, category, start_date,  end_date, recurrence, org_title, region, zip_code, owner

**Applications** : username,event_id

![This is an image](/capstone%202.png)

## Features implemented
1. Authentication: Signup,login,logout
2. Update user profile
3. Search for events by keyword
4. Create own events
5. Apply/Volunteer to events

## UserFlow

The website homepage will display the login/signup links. User needs to access the application.

Events page: this will display the list of events and include the search form to filter for events. Each event click will direct to the event details page

My events page: display the events associated with the logged in user. Event click will direct to the event details page

Profile page: displays form to update user profile


## Testing
Integration testing has been implemented using the **Jest** framework and the testing library **supertest**. All the backend routes and functionality include corresponding test files
The tests can be run using the command npm test

