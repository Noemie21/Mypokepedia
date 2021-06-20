import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ListPokemon from './views/ListPokemon.vue';
import MyPokemon from './views/MyPokemon.vue';
import PokemonDetail from './views/PokemonDetail.vue';

const routes = [
  {
    path: '/',
    name: 'list pokemon',
    component: ListPokemon,
  },
  {
    path: '/my-pokemon',
    name: 'My pokemon',
    component: MyPokemon,
  },
  {
    path: '/detail/:name',
    name: 'pokemon detail',
    component: PokemonDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
