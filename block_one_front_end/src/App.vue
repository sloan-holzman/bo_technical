<template>
  <v-app>
    <v-snackbar
      :timeout="snack.timeout"
      :top="true"
      :right="true"
      :color="snack.color"
      :multi-line="snack.text.length > 100"
      v-model="snack.show"
    >
      {{ snack.text }}
    </v-snackbar>
    <table-container />
  </v-app>
</template>

<script>
import TableContainer from "./components/TableContainer";

export default {
  name: "App",
  components: {
    TableContainer
  },

  data() {
    return {
      snack: {
        show: false,
        mode: "",
        timeout: 3000,
        text: "",
        color: "error"
      }
    };
  },
  provide() {
    return {
      snackHandler: this.snackHandler,
      successSnack: this.successSnack,
      errorSnack: this.errorSnack
    };
  },
  methods: {
    errorSnack(text) {
      this.snackHandler({ text, color: "error" });
    },
    successSnack(text) {
      this.snackHandler({ text, color: "info" });
    },
    snackHandler(snackObj) {
      this.snack = { ...this.snack, show: true, ...snackObj };
    }
  }
};
</script>
