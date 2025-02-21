import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import router from "../router";

const minutes = 3 * 60 * 1000;
var ls = new SecureLS({ isCompression: false });
export default createStore({
    state: {
        user: null,
        userName: null,
        userRoles: null,
        isAuthenticated: false,
        api: "",
        itemList: null,
        itemListType: "",
    },
    mutations: {
        setApi(state, api ) {
            state.api = api;
        },
        setItemList(state, itemList) {
            state.itemList = itemList;
        },
        setItemListType(state, itemListType ) {
            state.itemListType = itemListType;
        },
        setUser(state, user) {
            state.user = user;
            state.userName = user?.userName;
            state.userRoles = user?.roles;
        },
        logoutUser(state) {
            state.user = null;
            state.userName = null;
            state.userRoles = null;
            state.isAuthenticated = false;
            router.push({ name: "LoginPage" });
            console.log("logout user login page calıstı");
        },
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
            if (!status) {
                router.push({ name: "LoginPage" });
                console.log("setAuthenticated login page calıstı");
            }
        }
    },
    actions: {
        checkSession({ commit }) {
            fetch("https://localhost:44335/api/Users/CheckLogin", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     credentials: 'include'
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
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    commit('setAuthenticated', false);
                    commit('logoutUser');
                });

        },
        startSessionCheck({ dispatch }) {
            dispatch('checkSession');
            // Interval'ı başlat
            if (this.intervalId == null) {
                this.intervalId = setInterval(() => {
                    dispatch('checkSession');
                }, minutes);
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
            console.log("interval silindi");
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },
    getters: {
        _isAuthenticated: state => state.isAuthenticated,
        _getApi: state => state.api,
        _getItemList: state => state.itemList,
        _getItemListType: state => state.itemListType,
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password;
            return user;
        },
        _getCurrentUserRoles: state => state.userRoles,
        _getCurrentUserName: state => state.userName,
    },
    // plugins : [createPersistedState({key : "user"})]
    plugins: [
        createPersistedState({   //kalıcı hale getir.
            key: "user",
            storage: {  // ls ile şifrele
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ]

});
