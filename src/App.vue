<template>
  <v-app>
    <router-view>
    </router-view>
  </v-app>
</template>

<script>

export default {

  name: 'App',
  created() {
    let localName = localStorage.getItem('name')
    if (localName) {
      this.$store.commit('name', localName)
    }
  }
};
</script>

<style lang="scss">

@import './assets/fonts/style.css';

#app {
  font-family: 'TT Norms Pro Regular';
  background: rgb(247 248 250);
  p {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
}
</style>















