# React Test App

This is a boilerplate for a Testing application.\
The app currently is built only using frontend, however backend integration is also possible.\
The app has the following structure:


### `ReactTestApp.js`


This is the main app component. It is responsible for all the apps functionality and holds all app data.\
This component holds in its state:\
`testState` - a string representing the state of the app, initially - `initial`\
`tests` - an array of objects, each representing a single test and holding the test ID and title. An example of a test object:
```sh
{
    id: 141, 
    title: "Video Games",
}
```
This array is currently populated on componentDidMount via a fetch request from an external API.\
`questions` - an array of objects, each representing a single question and holding its' ID, title and answers. An example of question object:
```sh
{
    "id": 29543,
    "title": "What is the highest number used in a Sudoku puzzle?",
    "answers": [
        {
            "id": 166798185,
            "title": "Seven"
        },
        {
            "id": 309744200,
            "title": "Eight"
        },
        {
            "id": 508313117,
            "title": "Nine"
        },
        {
            "id": 555413826,
            "title": "Ten"
        }
    ]
}
```
This array is currently populated after a test is selected via a fetch request from an external API.\
`currentQuestion` - a number representing the current question the user is answering, initially it is 0 and is incremented by 1 after every answer.\
`participantName` - a string representing the name of the participant taking the test which will be outputted after the test is finished.\
`participantNameMissing` - a boolean value that is initially set to false, but is set true if a user tries to take a test without inputting a name. It is responsible for the username input classes.\
`selectedTest` - a string representing the test that the user selects. The `questions` array will be populated on the basis of this.\
`testNotSelected` - a boolean value that is initially set to false, but is set true if a user tries to take a test without selecting a test. It is responsible for the test select classes.\
`submitLink` - a string that is responsible for final request, it is updated on every passed question with needed params.\

Depending on the `testState` the component will render one of the following three components:


### `Login.js`


This is the initial page of the app. It is rendered at `testState` - `initial`\
This components main functionality is:\
`input` - a field that onChange will update the `participantName`\
`select` - a field that onChange will update the `selectedTest`\
`button` - a button that onClick will update the `testState` to `testStarted` and will begin the test.


### `Test.js`


This is the component responsible for the test itself. It is rendered at `testState` - `testStarted`\
This component will be re-rendered for every question within the test, based off the - `currentQuestion` state.\
The participant has to select an answer and then click 'Next'.\
After that the `currentQuestion` state will be incremented by one, the `submitLink` will be updated with the selected answer, and the next question will be shown.

### `Finish.js`


This is the final page component that the user sees when he finishes the test. It is rendered at `testState` - `testFinished`\
This component will great the participant by the `participantName` and show a final test score that will be received via a fetch request from an external API.\
This component also has a 'Retake' `button` which onClick will reset all the app values to their initial state and prompt the user to the `initial` screen.

## Available Scripts


In the project directory, you can run:


### `yarn start`


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`


Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
The app is ready to be deployed!