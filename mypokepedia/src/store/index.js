import Vue from 'vue';
import Vuex from 'vuex';
import { Pokedex } from 'pokeapi-js-wrapper';

const P = new Pokedex();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listPokemons: [],
    onwnedPokemon: [],
    selectedPokemon: null,
    searchQuery: '',
    isLoading: false
  },
  mutations: {
    setPokemonsList: (state, list) => {
      state.listPokemons = [...list];
    },
    setSearchQuery: (state, searchQuery) => {
      state.searchQuery = searchQuery;
    },
    setSlectedPokemon: (state, pokemon) => {
      state.selectedPokemon = pokemon;
    },
    addCatchedPokemon: (state, nickname) => {
      const newOwned = { ...state.selectedPokemon };
      newOwned.nickname = nickname;

      state.onwnedPokemon = [newOwned, ...state.onwnedPokemon];
      state.listPokemons = state.listPokemons.map(poke => {
        if (poke.name === state.selectedPokemon.name) {
          if (poke.owned) {
            poke.owned++;
          } else {
            poke.owned = 1;
          }
        }
        return poke;
      });
    },
    onReleasePokemon: (state, payload) => {
      state.onwnedPokemon = state.onwnedPokemon.filter(
        poke => poke.nickname !== payload.nickname
      );
      state.listPokemons = state.listPokemons.map(poke => {
        if (poke.name === payload.name) {
          if (poke.owned) {
            poke.owned--;
          } else {
            poke.owned = 0;
          }
        }
        return poke;
      });
    },
  },
  getters: {
    filteredPokemon: state => {
      if (state.searchQuery) {
        return state.listPokemons.filter(poke =>
          poke.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      } else {
        return state.listPokemons;
      }
    },
  },
  actions: {
    getPokemonsList: async ({ commit, state }) => {
      state.isLoading = true;
      try {
        const data = await P.getPokemonsList();
        commit('setPokemonsList', data.results);
      } catch (error) {
        /*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
        console.error(error);
      }
      state.isLoading = false;
    },
    getPokemonByName: async ({ commit, state }, pokemonName) => {
      state.isLoading = true;
      try {
        const data = await P.getPokemonByName(pokemonName);
        commit('setSlectedPokemon', data);
      } catch (error) {
        /*eslint no-console: ['error', { allow: ['warn', 'error'] }] */
        console.error(error);
      }
      state.isLoading = false;
    }
  }
});