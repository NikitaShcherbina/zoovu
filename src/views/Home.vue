<template>
  <div class="home">
    <div class="container">
      <h2>Hello friend, tell me your name...</h2>
      <div class="input">
        <v-text-field
            v-model="name"
            label="Your name here"
            :rules="rules"
            hide-details="auto"
            width="100%"
        ></v-text-field>
      </div>
      <router-link to="/game" tag="button" :disabled="name.length < 3">
        <v-btn
            rounded
            color="rgb(245, 245, 245)"
            dark
        >
          <p>Let's go</p>
          <img class="arrow-right" src="@/assets/img/arrow_right.svg" width="12px">
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
  computed: {
    name: {
        get() {
          return this.$store.state.name
        },
        set(newValue) {
          localStorage.setItem('name', newValue)
          this.$store.commit('name', newValue)
        }
    }
  }
}

</script>

<style lang="scss">

.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgb(247 248 250);
  .container {
    width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .input {
      height: 130px;
      width: 100%;
    }
    .v-text-field {
      margin: 40px 0;
      width: 100%;
    }
    .v-btn {
      font-family: 'TT Norms Pro Bold';
      text-transform: none;
      p {
        color:rgba(57 36 115);
        margin: 0;
        margin-right: 5px;
      }
    }
  }
}










</style>
