<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-parallax src="../../public/HomepageBanner.png"></v-parallax>
      </v-col>
    </v-row>
    <div class="navbar">
      <li>
        <div class="filter-option">
          <input type="checkbox" id="moq" checked @change="setFilter" />
          <label for="moq"><h5>Minimum Order 30 pcs</h5></label>
        </div>
      </li>
      <li>
        <div class="dropdown">
          <button class="dropbtn">
            <h5>Category</h5>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Bottles</a>
            <a href="#">Bulky Pouch</a>
            <a href="#">Totebag</a>
          </div>
        </div>
      </li>
      <li>
        <div class="dropdown">
          <button class="dropbtn">
            <h5>Price</h5>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Dibawah Rp 10.000</a>
            <a href="#">Rp 10.000 - Rp 20.000</a>
            <a href="#">Diatas Rp 20.000</a>
          </div>
        </div>
      </li>
    </div>
    <div class="products">
      <theProducts
        v-for="item in GifuProduct"
        :key="item.name"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        :size="item.size"
        :moq="item.ismoq"
      ></theProducts>
    </div>
    <div class="pagination">
      <v-pagination color="pink lighten-1"  v-model="page" :length="7" circle></v-pagination>
    </div>
  </div>
</template>

<script>
import theProducts from "../../src/components/souvenirs/theProducts.vue";
import GifuProduct from "../../assets/GifuProducts.json";
export default {
  name: "SouvenirComponent",
  components: { theProducts },
  data() {
    return {
      filters: {
        moq: false,
      },
      status: "",
      GifuProduct,
    };
  },
};
</script>

<style scoped>
#moq {
  margin: 0 10px 0 0;
}
.filter-option {
  display: flex;
  padding: 10px;
}
li {
  border-right: 1px solid #bbb;
  display: inline;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li:last-child {
  border-right: none;
}
li:hover {
  background-color: #9e9d9d;
}
.Banner {
  background-image: url(../../public/HomepageBanner.png);
  width: 100vw;
  height: 100vh;
  margin: 0 0 0 550;
  box-sizing: border-box;
  position: relative;
}
/* Navbar container */
.navbar {
  overflow: hidden;
  background-color: rgb(235, 235, 235);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.checkbtn {
  font-size: 30px;
}

/* Links inside the navbar */
.navbar a {
  font-size: 16px;
  color: rgb(36, 35, 35);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: rgb(34, 34, 34);
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
}

/* Add a red background color to navbar links on hover */

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
.products {
  background-color: rgb(253, 245, 245);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px;
  padding: 50px;
}
.pagination {
  padding: 50px;
  background-color: rgb(253, 245, 245);
}
</style>
