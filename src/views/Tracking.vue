<template>
    <div class="mt-10">
      <h1>{{ $t('tracking.title') }}</h1>
      <form>
      <div class="form-control">
      <label for="invoiceNumber">{{ $t('tracking.invoicenumber') }}</label>
      <input id="invoiceNumber" name="invoiceNumber" type="text" />
      </div>
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            dense
            chips
            small-chips
            label="Max 3 Invoice"
            multiple
          ></v-autocomplete>
        </v-col>
      <div class="form-control">
      <label for="invoiceNumber">{{ $t('tracking.verification') }}</label>
      <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
          ></v-text-field>
      </div>
      <div>
      <button>{{ $t('tracking.button') }}</button>
    </div>
      </form>
      <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Invoice Number
          </th>
          <th class="text-left">
            Product
          </th>
          <th class="text-left">
            Qty
          </th>
          <th class="text-left">
            Estimation
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in orders"
          :key="item.name"
        >
          <td>{{ item.invoicenumber }}</td>
          <td>{{ item.product }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "TrackingComponent",
    components: {
    },
    data() {
      return {
        status: "",
        invoiceNumber: " ",
      };
    },
    methods:{
      submitform(){
        console.log('Nomor Invoice' + this.invoiceNumber);
      }
    }
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
  border-color: #002350;
  background-color: #002350;
}
</style>
  
  
  