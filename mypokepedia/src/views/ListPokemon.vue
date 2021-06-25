<template>
  <v-container class='py-12'>
    <v-layout justify-center>
      <v-flex xs12 md4>
        <v-layout justify-center>
          <v-flex xs9>
            <v-text-field
              color='green'
              label='Search Pokemon'
              clearable
              :value='serchDataLocal'
              @change='serchDataLocal = $event'
              @keydown='setSearchQuery(serchDataLocal)'
              @click:clear="
                serchDataLocal = '';
                setSearchQuery(serchDataLocal);
              "
            ></v-text-field>
          </v-flex>
          <v-flex xs3 px-2>
            <v-btn
              outlined
              fab
              color='green'
              @click='setSearchQuery(serchDataLocal)'
            >
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap v-if='filteredPokemon.length' justify-center>
      <v-flex
        v-for='poke in limitedPokemon'
        :key='`${poke.name}`'
        xs12
        sm6
        md4
        px-2
        py-2
      >
        <CardList :name='poke.name' :owned="poke.owned ? poke.owned : '0'" />
      </v-flex>

      <v-flex v-if='filteredPokemon.length > limit' xs12 text-center>
        <v-btn rounded color='green' dark class='my-10' @click='limit += adder'>
          Load More
        </v-btn>
      </v-flex>
    </v-layout>

    <div v-if='!isLoading && !filteredPokemon.length' class='text-center my-12'>
      <h2 class='grey--text'>Pokemon Not Found</h2>
    </div>

    <div v-if='isLoading' class='text-center my-12'>
      <v-progress-circular indeterminate color='green' />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import CardList from '../components/CardList.vue';
export default {
  components: {
    CardList
  },
  created() {
    if (!this.filteredPokemon.length) {
      this.getPokemonsList();
    }
    this.serchDataLocal = this.searchQuery;
  },
  data() {
    return {
      serchDataLocal: '',
      limit: 15,
      adder: 15
    };
  },
  computed: {
    limitedPokemon() {
      return this.limit
        ? this.filteredPokemon.slice(0, this.limit)
        : this.filteredPokemon;
    },
    ...mapState(['searchQuery', 'isLoading']),
    ...mapGetters(['filteredPokemon'])
  },
  methods: {
    ...mapMutations(['setSearchQuery']),
    ...mapActions(['getPokemonsList'])
  }
};
</script>