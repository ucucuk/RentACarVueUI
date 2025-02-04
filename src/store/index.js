import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });
export default createStore({
    state: {
        user: null,
        isAuthenticated: false,
        intervalId: null,  // Interval ID'si burada saklanacak
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logoutUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
        }
    },
    actions: {
        checkSession({ commit }) {
            fetch("https://localhost:44335/api/Users/CheckLogin", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Cookie'
            })
                .then((response) => {
                    if (response.status === 401) {
                        console.error('Unauthorized. Check cookies and authentication!');
                        return;
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("CheckLogin ", data);
                    if (data?.authenticated == true)
                        commit('setAuthenticated', true);
                    else {
                        commit('setAuthenticated', false);
                        commit('logoutUser');
                        this.stopSessionCheck();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    commit('setAuthenticated', false);
                    commit('logoutUser');
                    this.stopSessionCheck();
                });
        },
        startSessionCheck({ dispatch }) {
            // Interval'ı başlat
            if (this.intervalId == null) {
                this.intervalId = setInterval(() => {
                    dispatch('checkSession'); // Her 65 saniyede bir session kontrolü yap
                }, 65000);
            }
        },
        stopSessionCheck() {
            console.log("stop session check")
            if (this.intervalId != null) {
                console.log("interval silindi");
                clearInterval(this.intervalId); // Interval'ı temizle
                this.intervalId = null;
            }
        },
    },
    beforeUnmount() {
        // Eğer bileşen yok ediliyorsa, interval'i temizle
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    },
    getters: {
        _isAuthenticated: state => state.isAuthenticated,
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
