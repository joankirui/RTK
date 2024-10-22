# Simple Nodejs app for learning Redux(run using node index)
| Cake Shop Scenario | Redux | Purpose |
|-------------------- | -----| ------- |
Shop | Store | Holds the state of your application
Cake ordered | Action | Describes what happened
Shopkeeper | Reducer | Ties the store and actions together

A <b>store</b> that holds the state of your application.

An <b>action</b> that describes what happened in the application.

A <b>reducer</b> which handles the action and decides how to update the state.

# Three Principles 
## First Principle
The global state of your application is stored as an object inside a single store
### Cake Shop
Let's assume we are tracking the number of cakes on the shelf
```
{
    numberOfCakes: 10
}
```
## Second Principle
The only way to change the state is to dispatch an action, an object that describes what happened
To update the state of your app, you need to let Redux know about that with an action
Not allowed to directly update the state object
### Cake Shop
Scan the QR code and place an order -CAKE_ORDERED
```
{
  type: 'CAKE_ORDERED'  
}
```
## Third Principle
To specify how the state tree is updated based on actions, you write pure reducers
Reducer -(previousState, action) => newState
### Cake Shop
Reducer is the shopkeeper
```
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
        return {
            numOfCakes: state.numOfCakes - 1
        }
    }
}
``` 
## Actions
The only way your application can interact with the store
Carry some information from your app to the edux store
Plain Javascript objects
Have a 'type' property that describes something that happened in the application.
The 'type' property is typically defined as string constants
## Reducers
Specify how the app's state changes in response to actions sent to the store
A function that accepts state and action as arguments, and returns the next state of the application
```
(previousState, action) => newState
```
## Redux Store
One store for the entire application
Responsibilities --
    Holds application state
    Allows access to state via <b>getState()</b>
    Allows state to be updated via <b>dispatch(action)</b>
    Registers listeners  via <b>subscribe(listener)</b>
    Handles unregistering of listeners via the function returned by <b>subscribe(listener)</b>

## Immutable Updates with Immer

Immer is a library that simplifies the process of writing immutable update logic.

Immer provides a function called produce, which accepts two arguments: your original state, and a callback function. The callback function is given a "draft" version of that state, and inside the callback, it is safe to write code that mutates the draft value. Immer tracks all attempts to mutate the draft value and then replays those mutations using their immutable equivalents to create a safe, immutably updated result:

## Middleware
Is the suggested way to extend Redux with custom functionality
Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer
Use middleware for logging, crash reporting, performing asynchronous tasks etc

## Async action creators
### axios
Requests to an API endpoint

### redux-thunk
Define async action creators
Middleware

# Redux Toolkit
Redux toolkit is the official,opinionated,batteries-included toolset for efficient Redux development
    Abstract over the setup process
    Handle the most common use cases
    Include some useful utilities