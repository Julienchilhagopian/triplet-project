# Project Name

## Description

A web page to find the best organisations to help Venezuela.
 
 ## User Stories

List of user stories in order of priority/importance.

User = The organisation. 

 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
 - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
 - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
 - **sign up** - As a user I want to sign up on the webpage so that I can create a profile to display my organisation.
 - **login** - As a user I want to be able to log in on the webpage so that I can get back to my profile and edit it.
 - **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my profile.
 
 The guest = the donator 
 
 - **homepage** - As a guest I can see and choose the organisation's categories to facilitate the navigation thoughout the app. 
  - **organisation list** - As a guest I can find all the best organisation according to the topic chosen.
  - **organisation details** - As a guest I can see the details of the organisations to find where to donate. 
  
 
## Backlog

List of other features outside of the MVPs scope

User profile (organisation profile):
- Add events. 
- Upload profile picture. 
- Sending a validation email.

Sign up : 
- Multiple step sign up. 

Nav bar : 
- Button to the see the events. 
- Drop down menu to navigate. 

Search bar to filter the organisation list page. 


## ROUTES:
```
GET/

GET/org (/org?orgtype=category)

GET/org/:id 

GET /auth/login
POST /auth/login

GET /auth/signup
POST auth/signup
POST auth/logout

GET/profile
GET/profile/edit
POST/profile/edit

```

## MODELS

```
User (organisation) {
name: String, 
password: String, 
type: [String] (ENUM), 
desription : String, 
phone : String, 
mail: String, 
socialMedia: String, 
website: String
}

```

## Links

### Physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides.com

The url to your presentation slides

[Slides Link](http://slides.com)



