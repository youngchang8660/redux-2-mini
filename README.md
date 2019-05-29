<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we'll be adding redux to an existing react app. Instead of just using redux alone, we'll use `react-redux`, `redux-promise-middleware`, and `combineReducers`.

## Step 1

### Summary

In this step, we'll install the needed packages. If you look in the  `package.json` file, you'll notice that `react-redux` and `redux-promise-middleware` are already listed as dependencies. 

### Instructions

* Run `npm install` to install all dependencies listed in `package.json`.

## Step 2

### Summary

In this step, we need to setup redux and connect our redux store to our react application.

### Instructions

* In the `src` folder, create a new folder called `ducks`. Then create a file called `hackerNewsReducer.js` within the `ducks` folder.
* Within `hackerNewsReducer.js`, initial state should be an object with `loading` and `article` properties. Set `loading` to `false`. The `articles` property should be an empty array.
* Create a simple reducer function that just returns state, for now. Don't forget to use `export default`.
* Create a `store.js` file in the src folder. Import `createStore` from redux. Import your reducer function from `hackerNewsReducer.js`. Invoke `createStore` and pass in the reducer as the only argument. `export default` the created store.
* In `index.js`, import `Provider` from react-redux. Import the store from `store.js`. Wrap `<App />` with the `Provider` component and pass a `store` prop to `Provider`. The value of the `store` prop should be the imported store.




### Solution
<details>
<summary> <code> hackerNewsReducer.js </code> </summary>

```
const initialState = {
  loading: false,
  articles: []
}

export default function reducer(state = initialState, action) {
  return state;
}
```
</details>
<details>
<summary> <code> store.js </code> </summary>

```
import { createStore } from 'redux';
import hackerNewsReducer from './ducks/hackerNewsReducer';

export default createStore(hackerNewsReducer);
```
</details>
<details>
<summary> <code> index.js </code> </summary>

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
```
</details>


## Step 3

### Summary

In this step, we'll create an action creator that will make an http request to an api to get articles.

### Instructions

In the terminal, run `nodemon`.

In `hackerNewsReducer.js`:
* import `axios`
* create an action type called `REQUEST_ARTICLES`
* create an action creator called `requestArticles` that will make an `axios` `GET` request to `/api/hacker-news`
  * return an action (object) with `type` and `payload` properties. The `type` property will hold the action type we just created, and the `payload` property will be the result of the axios request.
* `export` the `requestArticles` action creator 

### Solution
<details>
<summary> <code> hackerNewsReducer.js </code> </summary>

```
import axios from 'axios';

const initialState = {
  loading: false,
  articles: []
}

const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

export const requestArticles = () => {
  let articles = axios.get('/api/hacker-news').then(res => res.data);
  return {
    type: REQUEST_ARTICLES,
    payload: articles
  }
}

export default function (state = initialState, action) {
  return state;
}
```
</details>

## Step 4

### Summary

We currently have async code in our action creator function, which we cannot do without some help. We need to use middleware within redux. We will use `redux-promise-middleware`. Let's add the middleware and then we'll discuss how it works.

### Instructions

* In __store.js__, import `applyMiddleware` from redux and import `promiseMiddlware` from redux-promise-middleware. As the second argument to `createStore`, invoke `applyMiddleware` and pass in `promiseMiddlware` as an argument.

```
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import hackerNewsReducer from './ducks/hackerNewsReducer';

export default createStore(hackerNewsReducer, applyMiddleware(promiseMiddleware));
```

Now that we have added in the middleware, let's explore what it does. Check out a simple intro guide __[here](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md)__.

In summary, while waiting on the response from the http request, the middleware will dispatch the action __and__ modify the `type` property. The type property will have `_PENDING` added to the end of the `type` string value while the response has not yet come back from the server. When the response is received, the action will get dispatched a second time, but with either `_FULFILLED` or `_REJECTED`, based on if the http request was successful or not.

Time to update the reducer function. Add in a switch statement and 3 cases for each of our possible outcomes for the http request.

### Instructions continued...

* Add a case for the pending phase of our http request. While the response is pending, we want to turn on the loading animation. The loading property in the redux store determines whether or not the loading animation is shown.

  <details>
  <summary> <code> hackerNewsReducer.js </code> </summary>

  ```
  import axios from 'axios';

  const initialState = {
    loading: false,
    articles: []
  }

  const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

  export const requestArticles = () => {
    let articles = axios.get('/api/hacker-news').then(res => res.data);
    return {
      type: REQUEST_ARTICLES,
      payload: articles
    }
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case REQUEST_ARTICLES + '_PENDING':
        return { ...state, loading: true };
      default: 
        return state;
    }
  }
  ```
  </details>

* Add two more cases for when the action's type will have `_FULFILLED` and `_REJECTED`. If the http request is successful, then turn the loading animation off and update the `articles` property. If the request is not successful, turn the loading animation off and do nothing to the `articles` property.

  <details>
  <summary> <code> hackerNewsReducer.js </code> </summary>

  ```
  import axios from 'axios';

  const initialState = {
    loading: false,
    articles: []
  }

  const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

  export const requestArticles = () => {
    let articles = axios.get('/api/hacker-news').then(res => res.data);
    return {
      type: REQUEST_ARTICLES,
      payload: articles
    }
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case REQUEST_ARTICLES + '_PENDING':
        return { ...state, loading: true };
      case REQUEST_ARTICLES + '_FULFILLED':
        return { loading: false, articles: action.payload }
      case REQUEST_ARTICLES + '_REJECTED':
        return { ...state, loading: false }
      default:
        return state;
    }
  }
  ```
  </details>


## Step 5

### Summary

In this step, we will use the action creator function in the HackerNews.js file and display the articles.

### Instructions

* In HackerNews.js, import `{ requestArticles }` from hackerNewsReducer.js.
* Import `{ connect }` from react-redux.
* Replace the `export default` line with the following
  ```
  export default connect()(HackerNews)
  ```
* Create a `mapStateToProps` function that will take in state (from the redux store) and return an object. Whatever is returned from this object will get merged to the props object for this component. Return state parameter.
* `mapStateToProps` should be the first argument for the `connect` function.
  ```
  ...

  function mapStateToProps(state) {
    return state;
  }

  export default connect(mapStateToProps)(HackerNews);
  ```

You can now access the `loading` and `articles` properties from the redux store directly from the `props` object. 

* Update HackerNews.js to use `this.props.loading` and `this.props.articles` from the redux store instead of local state. 
* Remove `loading` and `articles` from local state since we are no longer using them.

The loading animation should stop after this update. That's because the `loading` property in the redux store is currently set to `false`.

* The second arguement to the connect method should be an object. Inside this object, we will reference any action creators that we want to use within the file.

```
export default connect(mapStateToProps, { requestArticles: requestArticles })(HackerNews);
// or, using object property shorthand (preferred):
export default connect(mapStateToProps, { requestArticles })(HackerNews);

```

Any action creators that are added to the object above (2nd arguemnt in the connect method) are added to the `props` object

* Add the componentDidMount method and invoke `this.props.requestArticles`

When you complete this, you should see the loading animation, and then the articles after the response is received from the server.

### Solution

<details>
  <summary> <code> HackerNews.js </code> </summary>

  ```
  import React, { Component } from 'react';
  import Card from './../shared/Card/Card';
  import Loading from './../shared/Loading/Loading';
  import { requestArticles } from './../../ducks/hackerNewsReducer';
  import { connect } from 'react-redux';

  class HackerNews extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
      return (
        <div className='news-container'>
          <img style={styles.logo} src="./hackerNews.jpeg" alt="" />
          {this.props.loading ? <Loading /> : <div>{articles}</div>}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return state;
  }

  export default connect(mapStateToProps, { requestArticles })(HackerNews);


  const styles = {
    logo: {
      width: '250px',
      margin: '50px 0px'
    }
  }
  ```
  </details>


## Step 6

### Summary

In this step, we'll learn how to use multiple reducers. As your application grows, you'll find that it is easier to have multiple reducer functions instead of a single, monolithic reducer function.

### Instructions

* Create `mediumReducer.js` in the `ducks` folder.
* Within mediumReducer.js, set up some of the basics: initial state and the reducer function. `initialState` will have a loading and articles properties, just like hackerNewsReducer.js did. For now, just return `state` from within the reducer function.

  ```
  // mediumReducer.js

  const initialState = {
    loading: false,
    articles: []
  }

  export default function (state = initialState, action) {
    return state;
  }
  ```

* In store.js import the mediumReducer and `combineReducers` from redux
* Create a root reducer using combine reducers as seen below:

  ```
  import { createStore, applyMiddleware, combineReducers } from 'redux';
  import promiseMiddleware from 'redux-promise-middleware';
  import hackerNewsReducer from './ducks/hackerNewsReducer';
  import mediumReducer from './ducks/mediumReducer';

  const rootReducer = combineReducers({
    hackerNews: hackerNewsReducer,
    medium: mediumReducer
  })

  export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
  ```
* __NOTE:__ The first argument to the `createStore` method is now `rootReducer`. Also, this change and update the structure of the redux store:

  ```
  // BEFORE:
  {
    loading: false,
    articles: []
  }

  // CURRENT:
  {
    hackerNews: {
      loading: false,
      articles: []
    },
    medium: {
      loading: false,
      articles: []
    }
  }
  ```
Two new properties have been added to the redux store object: `hackerNews` and `medium`. Both of these slices of state will be managed by their respective reducer functions.

Because of this change, if you try to look at the Hacker News articles, your app will break. Let's go see why...

* In HackerNews.js, put `console.log(state)` as the first line of code in the mapStateToProps function. Check the result.

You'll notice that the redux store state really has changed as the before/after snippet above would suggest. 

* Let's update the mapStateToProps return value to `state.hackerNews`. 

```
function mapStateToProps(state) {
  return state.hackerNews;
}
```
Now this component will receive just the redux store state managed by the Hacker News reducer! The Hacker News page should be working again.

## Step 7

## Summary

In this step, you'll set up the rest of the mediumReducer file so that you can display the Medium articles.

## Instructions

In mediumReducer.js:
* import `axios`
* create an action type called `REQUEST_ARTICLES`
* create an action creator that will fetch the medium articles from the server
  * Method: `GET`
  * URL: `/api/medium`
* Using what you know about `redux-promise-middleware`, set up the reducer function the handle the two different states of our http request: `pending` and `fulfilled`.
  * Remember that the `loading` property should be set to `true` when the http request is still pending.

In Medium.js:
* import the action creator function from mediumReducer.js
* import `connect` from `react-redux`
* use the `connect` method to connect this component to the whole redux process
  * Remember that the first argument to connect is going to be the `mapStateToProps` function and the second argument will be an object for our action creators.
  * The `mapStateToProps` function should only return `medium` property from the redux store state.
* In the `componentDidMount` method, invoke the action creator (from the `this.props` object)
* Remove any reference to local state and just used the info on `this.props`

### Solution

<details>
  <summary> <code> mediumReducer.js </code> </summary>

  ```
  import axios from 'axios';

  const initialState = {
    loading: false,
    articles: []
  }

  const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

  export const requestArticles = () => {
    let articles = axios.get('/api/medium').then(res => res.data);
    return {
      type: REQUEST_ARTICLES,
      payload: articles
    }
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case REQUEST_ARTICLES + '_PENDING':
        return { ...state, loading: true }
      case REQUEST_ARTICLES + '_FULFILLED':
        return { loading: false, articles: action.payload }
      default:
        return state;
    }
  }
  ```
  </details>

  <details>
  <summary> <code> Medium.js </code> </summary>

  ```
 import React, { Component } from 'react';
  import Card from './../shared/Card/Card';
  import Loading from './../shared/Loading/Loading';
  import { connect } from 'react-redux';
  import { requestArticles } from './../../ducks/mediumReducer';

  class Medium extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    componentDidMount() {
      this.props.requestArticles();
    }

    render() {
      const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
      return (
        <div className='news-container'>
          <img src="./mediumLogo.png" style={styles.logo} alt="" />
          {this.props.loading ? <Loading /> : <div>{articles}</div>}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return state.medium;
  }

  export default connect(mapStateToProps, { requestArticles })(Medium);

  const styles = {
    logo: { width: '250px' }
  }
  ```
  </details>

## Step 8 (optional)

### Summary

If you want additional practice, step 8 will go through the process of hooking up the Reddit section of the app. You will not get much instruction here as this is the 3rd section of the app that needs to be set up the same way as the other two (Hacker News and Medium).

### Instructions

Create a new file in the `ducks` folder called redditReducer.js
* Create a reducer, initialState, action types, and action creators.
  * Initial state -> `{loading: false, articles: []}`
* In your action creator, you will make an http request using axios to get the reddit articles
  * Method: `GET`
  * URL: `/api/reddit`
* Add the reddit reducer to the `rootReducer` in store.js.

In Reddit.js:

* Import `connect` and the action creator for the reddit reducer.
* Use the `connect` method, along with `mapStateToProps` and the action creator object as arguments.
* Remove any reliance on local state and just use data from the redux store (located on this.props)
* Invoke the action creator in the componentDidMount method.

### Solution

<details>
  <summary> <code> redditReducer.js </code> </summary>

  ```
  import axios from 'axios';

  const initialState = {
    loading: false,
    articles: []
  }

  const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

  export const requestArticles = () => {
    let articles = axios.get('/api/reddit').then(res => res.data);
    return {
      type: REQUEST_ARTICLES,
      payload: articles
    }
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case REQUEST_ARTICLES + '_PENDING':
        return { ...state, loading: true }
      case REQUEST_ARTICLES + '_FULFILLED':
        return { loading: false, articles: action.payload }
      default:
        return state;
    }
  }
  ```
</details>
<details>
  <summary> <code> store.js </code> </summary>

  ```
  import { createStore, applyMiddleware, combineReducers } from 'redux';
  import promiseMiddleware from 'redux-promise-middleware';
  import hackerNewsReducer from './ducks/hackerNewsReducer';
  import mediumReducer from './ducks/mediumReducer';
  import redditReducer from './ducks/redditReducer';

  const rootReducer = combineReducers({
    hackerNews: hackerNewsReducer,
    medium: mediumReducer,
    reddit: redditReducer
  })

  export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
  ```
</details>
<details>
  <summary> <code> Reddit.js </code> </summary>

  ```
  import React, { Component } from 'react';
  import Card from './../shared/Card/Card';
  import Loading from './../shared/Loading/Loading';
  import { connect } from 'react-redux';
  import { requestArticles } from './../../ducks/redditReducer';

  class Reddit extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    componentDidMount() {
      this.props.requestArticles()
    }

    render() {
      const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
      return (
        <div className='news-container'>
          <img src="./redditLogo.png" alt="" style={styles.logo} />
          {this.props.loading ? <Loading /> : <div>{articles}</div>}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return state.reddit;
  }

  export default connect(mapStateToProps, { requestArticles })(Reddit);


  const styles = {
    logo: {
      width: '250px',
      margin: '50px 0px'
    }
  }
  ```
</details>


## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
