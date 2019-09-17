import Vue from "vue";
import Vuex from "vuex";
import state from './store/state';
import mutations from './store/mutations';
import actions from './store/actions';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => Cookies.get(key),
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
                removeItem: key => Cookies.remove(key)
            }
        })
    ],
    state,
    mutations,
    actions
});