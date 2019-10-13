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
        error: null, //Store information of an error that has just occured.
        user: null,
        reconnect: false,
        activeRoom: null,
        rooms: [
        ],
        users:[
        ],
        messages: [
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
