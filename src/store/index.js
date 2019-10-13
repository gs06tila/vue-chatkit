import Vue from 'vue'
import Vuex from 'vuex' //Vuex is a state management pattern
import VuexPersistence from "vuex-persist"; //vuex-persist package ensures that our Vuex state is saved between page reloads or refreshes
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    // state
    state: {
        loading: false, //used by the UI to determine wheter it should run the CSS loader.
        sending: false,
        error: 'Relax! This is just a drill error message', //Store information of an error that has just occured.
        user: {
            username: 'Bob',
            name: 'Bobson'
        },
        reconnect: false,
        activeRoom: {
            id: '124'
        },
        rooms: [
            {
                id: '123',
                name: 'Ships'
            },
            {
                id:'124',
                name: 'Treasure'
            }
        ],
        users:[
            {
                username: 'Bob',
                name: 'Bobson',
                presence: 'online'
            },
            {
                username: 'Tim',
                name: 'Tim Larsson',
                presence: 'online'
            },
            {
                username: 'Sven',
                name: 'Svensson',
                presence: 'offline'
            }
        ],
        messages: [
            {
                name: 'Tim Larsson',
                username: 'Tim',
                date: '11/12/1999',
                text: 'It is stranges that i can work with vuejs as a framework when the framework doesent exist in this time period..'
            },
            {
                name: 'Tim Larson',
                username: 'Tim',
                date: '11/11/2019',
                text: 'Hey! Thay have now created the VUE JS FRAMEWORK! Plz dont say that I already have inventet this framework 20 years before. '
            },
            {
                name: 'Bob Bobson',
                username: 'Bob',
                date: '11/12/2019',
                text: 'Okej, I will not say enything! But the framework sux'
            }
        ],
        userTyping: null
    },
    //used to commit and track state changes.
    mutations,
    // actions can update the vuex state
    actions,
    //getters can access our state
    getters: {
        hasError: state => state.error ? true : false
    },
    plugins: [vuexLocal.plugin],
    strict: debug
})
