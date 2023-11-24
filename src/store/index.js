import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            username: "test1",
            name: "User001",
            avatar: "null",
            //控制是否支持多选项卡
            // isMultiTabs:true,
            //控制主题:light正常模式、dark暗黑模式
            siteTheme:localStorage.getItem('siteTheme')?localStorage.getItem('siteTheme'):"light",
        };
    },
    mutations: {
        setSiteTheme(state, val) {
            state.siteTheme = val;
            localStorage.siteTheme = val;
        },
        login(state, {username, name, avatar}) {
            state.username = username;
            state.name = name;
            state.avatar = avatar;
            localStorage.setItem('username', JSON.stringify(username));
            localStorage.setItem('name', JSON.stringify(name));
            localStorage.setItem('avatar', JSON.stringify(avatar));
        },
        logout(state) {
            state.username = null;
            state.name = null;
            state.avatar = null;
            localStorage.removeItem('username');
            localStorage.removeItem('name');
            localStorage.removeItem('avatar');
        },
    },
    actions: {
        login({commit}, {username, name, avatar}) {
            commit('login', {username, name, avatar});
        },
        logout({commit}) {
            commit('logout');
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.username !== null;
        },
        getUser(state){
            return state.username;
        },
        getName(state){
            return state.name;
        },
        getAvatar(state){
            return state.avatar;
        },
    },
});

export default store;
