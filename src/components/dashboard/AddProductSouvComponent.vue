<template>
  <div>
    <div class="addproduct1" v-if="counter === 0">
      <h1>ADD PRODUCT SOUVENIR</h1>
      <table>
        <tr>
          <td class="right"><h4>PRODUCT'S PHOTO</h4></td>
          <td>
            <v-img
              class="pa-6 bg-secondary d-inline-block"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              height="80px"
              width="80px"
            ></v-img>
          </td>
        </tr>
        <tr>
          <td class="right"><h4>PRODUCT'S NAME</h4></td>
          <td>
            <input id="name" name="name" type="text" />
          </td>
        </tr>
        <tr>
          <td class="right"><h4>CATEGORY</h4></td>
          <td>
            <select id="filter" name="filter">
              <option value="1">CATEGORY</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="right"><h4>SIZE</h4></td>
          <td>
            <div class="sizegroup">
              <input id="size" name="size" type="text" />
              <h4>X</h4>
              <input id="size" name="size" type="text" />
              <h4>X</h4>
              <input id="size" name="size" type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="right"><h4>WEIGHT</h4></td>
          <td>
            <div class="weightgroup">
              <input id="weight" name="weight" type="text" />
              <h4>kg</h4>
            </div>
          </td>
        </tr>
        <tr>
          <td class="right"><h4>MINIMUM ORDER</h4></td>
          <td>
            <input id="min" name="min" type="text" />
          </td>
        </tr>
        <tr>
          <td class="right"><h4>DESCRIPTION</h4></td>
          <td>
            <input id="desc" name="desc" type="text" />
          </td>
        </tr>
      </table>
    </div>
    <button @click="previous">PREVIOUS</button>
    <button @click="next">NEXT</button>
  </div>
</template>

 <style scoped>
table {
  border-collapse: collapse;
  border-style: hidden;
  width: 100%;
}
td {
  border-color: #acacac;
  padding: 5px;
  text-align: left;
}
input {
  border: 2px solid;
  border-color: #b6b6b6;
  margin: 10px;
  height: 40px;
  width: 80%;
}
#size,
#weight,
#min {
  width: 100px;
}
.sizegroup,
.weightgroup {
  display: flex;
  align-items: center;
}
#desc {
  width: 500px;
  height: 200px;
}
#filter {
  border: 1px black;
}
button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 180px;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    next() {
      this.counter++;
      this.$emit(this.counter);
    },
    previous() {
      this.counter--;
    },
  },
};
</script>