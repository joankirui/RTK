const redux = require('redux')
const { thunk } = require('redux-thunk')
console.log(thunk)
const axios = require('axios')
const { createStore, applyMiddleware } = redux


const initialState = {
    loading: false,
    users: [],
    error: '',  
}

// Action types
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// Action creators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}

// Async action creator using redux-thunk
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            //response.data is the users
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error) => {
            //error.message is the error message
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

// Create store with middleware
const store = createStore(reducer, applyMiddleware(thunk))

// Subscribe to store updates
store.subscribe(() => { 
    console.log(store.getState())
})

// Dispatch the async action
store.dispatch(fetchUsers())