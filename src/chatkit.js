import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

function setMembers() {
    const members = activeRoom.users.map(user => ({
        username: user.id,
        name: user.name,
        presence: user.presence.sate
    }));
    store.commit('setUsers', members);
}

async function subscribeToRoom(roomId) {
    store.commit('clearChatRoom');
    activeRoom = await currentUser.subscribeToRoom({
        roomId,
        messageLimit: MESSAGE_LIMIT,
        hooks: {
            //To be notified when new messages are added to a room, you’ll need to subscribe to it and provide an onMessage hook
            onMessage: message => {
                store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.text,
                    date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
                });
            },
            //Additionally, to be notified when a user comes online or goes offline, you can provide the onPresenceChanged hook.
            onPresenceChanged: () => {
                setMembers();
            },
            //A user started typing in a room to which the current user is subscribed.
            onUserStartedTyping: user => {
                store.commit('setUserTyping', user.id);
            },
            //A user stopped typing in a room to which the current user is subscribed.
            onUserStoppedTyping: () => {
                store.commit('setUserTyping', null)
            }
        }
    });
    setMembers();
    return activeRoom;
}

async function connectUser(userId) {
    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider: new TokenProvider({ url: TOKEN_URL}),
        userId
    });
    currentUser = await chatManager.connect();
    return currentUser;
}

export default {
    connectUser,
    subscribeToRoom
}
