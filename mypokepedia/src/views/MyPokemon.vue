<template>
  <v-container class='py-12'>
    <v-layout wrap v-if='onwnedPokemon.length' justify-center>
      <v-flex
        v-for='poke in limitedPokemon'
        :key='`${poke.name}`'
        xs12
        sm6
        md4
        px-2
        py-2
      >
        <CardList
          :name='poke.name'
          :nickname="poke.nickname ? poke.nickname : ''"
          :releaseButton='true'
          @on-release='onReleasePokemon($event)'
        />
      </v-flex>

      <v-flex v-if='onwnedPokemon.length > limit' xs12 text-center>
        <v-btn rounded color='green' dark class='my-10' @click='limit += adder'>
          Load More
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CardList from '../components/CardList.vue';
export default {
  components: {
    CardList
  },
  created() {},
  data() {
    return {
      limit: 15,
      adder: 15
    };
  },
  computed: {
    limitedPokemon() {
      return this.limit
        ? this.onwnedPokemon.slice(0, this.limit)
        : this.onwnedPokemon;
    },
    ...mapState(['onwnedPokemon'])
  },
  methods: {
    ...mapMutations(['onReleasePokemon'])
  }
};
</script>
