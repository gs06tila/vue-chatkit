import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
  /* ---- Simple test that ensures that all components and states are all ties up together nicely.


  	  loading: false,
	  sending: false,
	  error: 'Ohh shit.. something went wrong!',
	  user: {
	  	username: 'Jack',
	  	name: 'Jack Sparrow'
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
	  		id: '124',
	  		name: 'Treasure'
	  	}
	  ],
	  users: [
	  	{
	  		username: 'Barbossa',
	  		name: 'Hactor Barbossa',
	  		presence: 'offline'
	  	},
	  	{
	  		username: 'Jack',
	  		name: 'Jack Sparrow',
	  		presence: 'online'
	  	}

	  ],
	  messages: [
	     {
	      username: 'Jack',
	      date: '11/12/1644',
	      text: 'Not all treasure is silver and gold mate'
	    },
	    {
	      username: 'Jack',
	      date: '12/12/1644',
	      text: 'If you were waiting for the opportune moment, that was it'
	    },
	    {
	      username: 'Hector',
	      date: '12/12/1644',
	      text: 'You know Jack, I thought I had you figured out'
	    }
	  ],
	  userTyping: null
	  */
	  loading: false,
	  sending: false,
	  error: null,
	  user: null,
	  reconnect: false,
	  activeRoom: null,
	  rooms: [],
	  users: [],
	  messages: [],
	  userTyping: null
  },
  mutations,
  actions,
  getters: {
  	hasError: state => state.error ? true : false
  },
  plugins: [vuexLocal.plugin],
  strict: debug
})