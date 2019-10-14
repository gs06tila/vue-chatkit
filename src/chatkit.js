import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  });
  currentUser = await chatManager.connect();
  return currentUser;
}

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit('setUsers', members);
}

async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => { //onMessage receives messages
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        });
      },
      /* onPresenceChanged receives an event when a user logs in or out */
      onPresenceChanged: () => {
        setMembers();
      },
      /* onUserStartedTyping receives an event that a user is typing */
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id)
      },
      /* onUserStoppedTyping receives an event that a user has stopped typing */
      /* For the onUserStartedTyping to work, we need to emit a typing event from our MessageForm while a user is typing. We’ll look into this in the next section. */
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  });
  setMembers();
  return activeRoom;
}

async function sendMessage(text) {
	const messageId = await currentUser.sendMessage({
		text,
		roomId: activeRoom.id
	});
	return messageId;
}

export function isTyping(roomId) {
	currentUser.isTypingIn({ roomId });
}

function disconnectUser() {
	currentUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser
}

/*
Notice that we’re casting the MESSAGE_LIMIT
constant to a number, as by default the 
process.env object forces all of its 
properties to be of type string.
*/