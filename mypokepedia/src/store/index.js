import { createStore } from 'vuex';
import pokemon from './modules/pokemon';
import ability from './modules/ability';

export default createStore({
  modules: {
    pokemons: pokemon,
    abilities: ability,
  },
});
