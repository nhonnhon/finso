This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Note`

Homepage have 3 tabs

First tabs: top headline news with image, title (click title to redirect original link) and description

Second tab: custom news based with keyword, default keyword is BITCOIN, user can change this key word in third tab

Third tab: user settings

if user have not logged yet: form login will show
if user does not have account, click button do not have account, the form register will show. Data of user is saved in storage
After register success, user must log in, if login success, the form change user data will show
(username can not change, only change name and password)
After save the changes, the data in seconds tabs will change and based with keyword
Reload and login again with data user just changed

### `Publish`

The source code is built and public at link: https://nhonnhon.github.io/finso/, but the api is wrong because it need https, (api now is http). So we can test in local
