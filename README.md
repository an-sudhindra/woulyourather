# Would You Rather

The Would You Rather app has been created using React and Redux as part of the React NanoDegree requirement from Udacity.

The app provides the user the ability to create questions with 2 possible answers. For example, "Would you rather, write JavaScript or write Swift"? The app also provide users to answer and view question results (polls) of other users. The app allows users to login (without password) as different users. The backend JSON data is provided by a static JavaScript file so new questions and polls don't actually get saved.

## Installation

1. You need to have Node.js, npm installed.
2. Proceed with cloning or downloading the project as a zip.
3. Extract and change directory to the project folder.
4. Run `npm install`
5. Then run `npm start`
6. Browser will open at with the address: http://localhost:3000, prompting user to login

## Login

Users must login first before they can access any page of the applicaton.
Since it is a demo application, no password is required to login to application. The user list is a static list with 5 users to choose from. Select a user and click login.

## Home

The home page contains 2 tabs. All the questions are displayed in either of the tabs based on whether user has answered the question or not. Questions are listed in the order (newest first). 

- Unanswered Questions
    
The first tab Unanswered Questions is a list of questions asked by all users that are not answered by the logged in user

- Answered Questions

The second tab Answered Questions is a list of questions that are answered by the logged in user


## View Question

http://localhost:3000/questions/<question_id>

The view Questions page shows details of a question. 

- If the question has already been answered it will show the poll results. 
- If the question has not been answered, it will allow the user to select an answer and submit. 


### Answer Question

User has to answer the question before viewing the results. User has to submit an answer first. User cannot submit without choosing an answer. Once user submits an answer, the poll results will be displayed.

### Poll Results

Poll results are shown in the form of a progress bar,  total vote count and percent of votes. The currently logged in user's vote (answer) is also marked in the results.

## New Questions

http://localhost:3000/add

Users can create new questions. Two free form fields are provided and both needs to be filled. User cannot crate the questions with out entering the option values.

## Leaderboard

http://localhost:3000/leaderboard

The leaderboard page displays all users sorted on their scores. The score is also displayed in the page. Scores are calculated based on formula as sum of all questions answered by the user and all questions created by the user.

## Logout

Upon clicking logout the user is logged out and the login page is shown.

## Redirects, Error Pages
1. The login component remembers referred URLs. For example, a user may directly try to access the URL http://localhost:3000/leaderboard. The app will first redirect the user to http://localhost:3000/login so they can login first. Then the app will automatically redirect to the original referred URL http://localhost:3000/leaderboard.
2. If a non-existent URL is accessed, the app will display the 404 page not found component.