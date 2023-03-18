<template>
  <div class="mt-10">
    <h1>{{ $t("tracking.title") }}</h1>
    <form>
      <div class="chip-container">
        <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
          {{ chip }}
          <i class="material-icons" @click="deleteChip(i)">clear</i>
        </div>
        <input
          v-model="currentInput"
          placeholder="Max 3 Invoice"
          @keypress.enter="saveChip"
          @keydown.delete="backspaceDelete"
        />
      </div>
      <!-- autocomplete without dropdown -->
      <div class="form-control">
        <label for="invoiceNumber">{{ $t("tracking.verification") }}</label>
        <v-text-field
          outlined
        ></v-text-field>
      </div>
      <div>
       <vue-recaptcha sitekey="YGveHaAFTZCFvHrV8vAX1Q0n5rjQBjzb"></vue-recaptcha>
      </div>
      <div>
        <button>{{ $t("tracking.button") }}</button>
      </div>
    </form>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Invoice Number</th>
            <th class="text-left">Product</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Estimation</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.name">
            <td>{{ item.invoicenumber }}</td>
            <td>{{ item.product }}</td>
          </tr>
        </tbody>
        <p>{{ currentInput}}</p>
      </template>
    </v-simple-table>
  </div>
</template>
  
  <script>
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
  el: "div",
  components : { VueRecaptcha },
  props: {
    set: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chips: [],
      currentInput: "",
      orders: [],
    };
  },
  methods: {
    saveChip() {
      const { chips, currentInput, set } = this;
      ((set && chips.indexOf(currentInput) === -1) || !set) &&
        chips.push(currentInput);
      this.currentInput = "";
    },
    deleteChip(index) {
      this.chips.splice(index, 1);
    },
    backspaceDelete({ which }) {
      which == 8 &&
        this.currentInput === "" &&
        this.chips.splice(this.chips.length - 1);
    },
  },
};
</script>

   <style scoped>
div {
  text-align: left;
}
h1 {
  text-align: center;
  margin: 70px auto;
}
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  border-color: black;
  background-color: #ffffff;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

button {
  font: inherit;
  border: 1px solid #ffadad;
  background-color: #ffadad;
  color: white;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 10px;
}

button:hover,
button:active {
  border-color: #ff54d4;
  background-color: #ff54d4;
}

/* autocomplete */
.chip-container {
  border: 1px solid #ccc;
  border-radius: 2px;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-color: rgb(46, 46, 46);
}
.chip {
  margin: 4px;
  background: #e0e0e0;
  padding: 0px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.chip i {
  cursor: pointer;
  opacity: 0.56;
  margin-left: 8px;
}

input {
  flex: 1 1 auto;
  width: 30px;
  border: none;
  outline: none;
  padding: 4px;
}
</style>