<template>
  <div>
    <div class="Banner"></div>
    <div class="navbar">
      <span class="filter-option">
        <input type="checkbox" id="moq" checked @change="setFilter" />
        <label for="moq">Minimum Order 30 pcs</label>
      </span>
      <div class="dropdown">
        <button class="dropbtn">
          Category
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#">Bottles</a>
          <a href="#">Bulky Pouch</a>
          <a href="#">Totebag</a>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            Price
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Dibawah Rp 10.000</a>
            <a href="#">Rp 10.000 - Rp 20.000</a>
            <a href="#">Diatas Rp 20.000</a>
          </div>
        </div>
      </div>
    </div>
    <div class="products">
      <theProducts
        v-for="item in invitationProducts"
        :key="item.name"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        :size="item.size"
        :moq="item.ismoq"
      ></theProducts>
    </div>
    <div class="pagination">
      <v-pagination v-model="page" :length="7" circle></v-pagination>
    </div>
  </div>
</template>

<script>
import theProducts from "../components/invitation/theProducts.vue";
import invitationProducts from "../../assets/InvitationProducts.json";
export default {
  name: "SouvenirComponent",
  components: { theProducts },
  data() {
    return {
      filters: {
        moq: false,
      },
      status: "",
      invitationProducts,
      // GifuProduct: [
      //   {
      //     name: "Card Holder A",
      //     price: "Rp 6500",
      //     size: "8 x 8 cm",
      //   },
      //   {
      //     name: "Card Holder B",
      //     price: "Rp 6500",
      //     size: "8 x 8 cm",
      //   },
      //   {
      //     name: "Card Holder B",
      //     price: "Rp 6500",
      //     size: "8 x 8 cm",
      //   },
      // ],
    };
  }
};
</script>

<style scoped>
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
.navbar a:hover,
.dropdown:hover .dropbtn {
  background-color: rgb(139, 139, 139);
}

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

