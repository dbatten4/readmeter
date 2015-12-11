# READMEter

Check out the site live [here](http://readmeter.herokuapp.com/)

## Description

READMEter is a little web app I've been working on that lets a user know which of their GitHub repos don't have READMEs
as well as giving some stats about the user's READMEs.

The app works by receiving a GitHub username and making a call to the GitHub API to pull the names of all the repos for
that user. Then for each repo, another API call is made to pull the README for the repo. If the repo has a README, the 
repo is pushed into one array. If the repo does not have a README, it is pushed into a seperate array. This then allows
various calculations to be made, for example the number of repos without READMEs and what percentage of all the user's
repos this represents. 

The app is built on Angular using the [GitHub API](https://developer.github.com/v3/). I also wanted to try out one of the
CSS extension languages so I've used [Sass](http://sass-lang.com/) to complile the CSS stylsheets. I also wanted to try out
some parallax scrolling features, for which I've used jQuery. 

## Installation

To clone the repo to your local machine and install the dependencies, run from your command line
```
git clone https://github.com/dbatten4/readmeter.git
cd readmeter
npm install
bower install
```
Since this app uses the GitHub API which is heavily rate limited, you'll need to generate an access token which should
be stored on your local machine only. Visit [this link](https://github.com/settings/tokens) to generate a new token, making
a note of your token.
Run from your command line
```
touch js/secrets.js
```
which will create a new file where your access token should be stored. In the secrets.js file, write
```
gitAccessToken = 'YOUR_TOKEN'
```
not forgetting the quotation marks, then save and close the file. 

## Usage

To start the server, run
```
node server.js
``` 
and visit `http://localhost:3000/`

## Testing

The testing framework used is karma. To run the tests, run 
```
karma start test/karma.conj.js
```
While the search factories I've created have been tested, the controller has not yet fully been tested as I was having 
some issues with mocking the results from the API call. This is something I'm working on at the moment as well as end to 
end testing using Protractor.

## Still To Do

Currently there is too much logic in the controller. When I have the testing suite for the controller in place I 
will look to refactor the logic out of the controller. There are also a couple of bugs I'm aware of for the Next User
button as well as a catch for if the user has no repos without READMEs. There are also some visual improvements I want to 
make in displaying the repos without READMEs.

## Challenges

One of the things I found most interesting about this project was the error handling aspect of it. Making a README API call
for a repo without a README results in a 404 error and since I wanted to record which repos don't have READMEs, I had to use
a catch for this error as part of the main logic for this app.

Another challenge was the asynchronous nature of this app. I had some functions which would perform the calculations
which were to be displayed on the app but these could only be run after all the README API calls had been completed 
(including those which returned an error). This issue was solved using promises, whereby each README API call was pushed 
into an array of promises and then chaining from these promises once the array has been filled, using the $q Angular service.
I found [this resource](http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/) to be a source of inspiration 
when tearing my hair out over this blocker.
