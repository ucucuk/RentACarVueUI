import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });
export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        _isAuthenticated: state => state.user != null,
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password;
            return user;
        }
    },
    // plugins : [createPersistedState({key : "user"})]
    plugins: [
        createPersistedState({
            key: "user",
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ]

});
