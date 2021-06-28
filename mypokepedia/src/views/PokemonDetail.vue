<template>
  <v-container class="text-center">
    <v-layout justify-center>
      <v-flex xs12 md10 text-center>
        <v-card :loading="isLoading">
          <v-layout py-5 px-5 justify-center wrap v-if="selectedPokemon">
            <v-flex xs12 md3 px-10 py-2>
              <v-img
                :src="selectedPokemon.sprites.front_default"
                alt="pokemon sprite"
              ></v-img>
              <h3 class="title text-capitalize">{{ selectedPokemon.name }}</h3>
            </v-flex>

            <v-flex xs12 md5 text-left py-2>
              <div class="mt-3">
                <div class="font-weight-bold my-2">Types</div>
                <v-chip
                  class="mx-1"
                  small
                  color="warning"
                  v-for="type in selectedPokemon.types"
                  :key="type.type.name"
                >
                  {{ type.type.name }}
                </v-chip>
              </div>

              <div class="mt-3">
                <div class="font-weight-bold my-2">Abilities</div>
                <v-chip
                  class="mx-1"
                  small
                  color="primary"
                  v-for="ability in selectedPokemon.abilities"
                  :key="ability.ability.name"
                >
                  {{ ability.ability.name }}
                </v-chip>
              </div>

              <v-layout mt-5>
                <v-flex xs6>
                  <v-layout v-for="n in 3" :key="n">
                    <v-flex xs9 font-weight-bold caption>
                      {{ selectedPokemon.stats[n - 1].stat.name }}
                    </v-flex>
                    <v-flex xs3 caption>
                      {{ selectedPokemon.stats[n - 1].base_stat }}
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout v-for="n in 3" :key="n">
                    <v-flex xs9 font-weight-bold caption>
                      {{ selectedPokemon.stats[n + 2].stat.name }}
                    </v-flex>
                    <v-flex xs3 caption>
                      {{ selectedPokemon.stats[n + 2].base_stat }}
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12 md4 pa-2 text-left>
              <div class="font-weight-bold my-2">Moves</div>
              <div class="moves-box">
                <v-chip
                  class="mx-1"
                  x-small
                  v-for="move in selectedPokemon.moves"
                  :key="move.move.name"
                >
                  {{ move.move.name }}
                </v-chip>
              </div>
            </v-flex>
          </v-layout>
        </v-card>

        <v-alert
          v-if="selectedPokemon"
          :value="isCatched && showAlert"
          prominent
          color="success"
          class="text-left"
          dark
          icon="sentiment_very_satisfied"
          transition="scroll-y-transition"
        >
          <v-layout align-center wrap mt-4>
            <v-flex xs12 md7>
              <h3 class="headline">
                Yippy, {{ selectedPokemon.name }} is catched!
              </h3>
              <p>
                special pokemon must have special nickname. Go give it one:
              </p>
            </v-flex>
            <v-flex xs12 md5>
              <v-layout align-center wrap>
                <v-flex xs12 md8>
                  <v-text-field
                    color="white"
                    label="Pokemon Nickname"
                    clearable
                    :value="pokeNickName"
                    v-model="pokeNickName"
                    @click:clear="pokeNickName = ''"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 text-right>
                  <v-btn
                    color="warning"
                    :disabled="!pokeNickName"
                    @click="setPokemonNickname(pokeNickName)"
                    >Set</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-alert>

        <v-alert
          v-if="selectedPokemon"
          :value="!isCatched && showAlert"
          prominent
          dismissible
          color="blue-grey"
          dark
          class="text-left"
          icon="sentiment_dissatisfied"
          transition="scroll-y-transition"
        >
          <h3 class="headline">
            Owwhh, {{ selectedPokemon.name }} is run away...
          </h3>
        </v-alert>

        <CatchButtonVue
          :isPulse="isCatchProcess"
          @click="catchPokemon"
          class="mb-10"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CatchButtonVue from "../components/CatchButton.vue";
export default {
  data() {
    return {
      isCatchProcess: false,
      isCatched: false,
      showAlert: false,
      chance: 50,
      pokeNickName: ""
    };
  },
  created() {
    this.getPokemonByName(this.$route.params.name);
  },
  components: {
    CatchButtonVue: CatchButtonVue
  },
  computed: {
    ...mapState(["selectedPokemon", "isLoading"])
  },
  methods: {
    catchPokemon() {
      this.showAlert = false;
      this.isCatchProcess = true;
      setTimeout(() => {
        this.isCatchProcess = false;
        if (Math.random() * 100 > this.chance) {
          this.isCatched = true;
          this.showAlert = true;
        } else {
          this.isCatched = false;
          this.showAlert = true;
        }
      }, 3000);
    },
    setPokemonNickname() {
      this.addCatchedPokemon(this.pokeNickName);
      this.$router.push("/my-pokemon");
    },
    ...mapActions(["getPokemonByName"]),
    ...mapMutations(["addCatchedPokemon"])
  }
};
</script>

<style scoped>
.moves-box {
  height: 190px;
  overflow: auto;
}
</style>
