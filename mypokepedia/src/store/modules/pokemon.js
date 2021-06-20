import { getAbility } from '../../api';

export default {
    state: {
        list: [],
    },
    mutations: {
        ADD_ABILITY(state, payload) {
            state.list = [...state.list, payload];
        },
        SET_ABILITIES(state, payload) {
            state.list = payload;
        },
    },
    actions: {
        addAbility({ commit }, data){
            commit('ADD_ABILITY', data);
        },
        loadAbility({ commit, state }, data) {
            if (state.list.every(ability => ability.id !== data.id)) {
                getAbility(data.id).then(ability => commit('ADD_ABILITY', ability));
            }
        },
    },
}