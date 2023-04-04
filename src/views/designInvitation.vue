<template>
    <div>
      <div class="navbar">

        <div class="dropdown">
          <button class="dropbtn">
            Color
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Blue</a>
            <a href="#">Pink</a>
            <a href="#">Navy</a>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Theme
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#">Modern</a>
              <a href="#">Traditional</a>
              <a href="#">Flowery</a>
            </div>
          </div>
        </div>
      </div>
      <div class="design">
        <theDesign
          v-for="item in DesignInvitation"
          :key="item.name"
          :img="item.img"
          :name="item.name"
        ></theDesign>
      </div>
      <div class="pagination">
        <v-pagination color="pink lighten-1"  v-model="page" :length="7" circle></v-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import theDesign from "../components/invitation/theDesign.vue";
  import DesignInvitation from "../../assets/DesignInvitation.json";
  export default {
    name: "SouvenirComponent",
    components: { theDesign },
    data() {
      return {
        filters: {
          moq: false,
        },
        status: "",
        DesignInvitation
      };
    }
  };
  </script>
  
  <style scoped>
  /* Navbar container */
  .navbar {
    margin-top: 100px;
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
  .design {
    background-color: rgb(253, 245, 245);
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 30% 30% 30%;
    gap: 50px;
    padding: 50px;
  }
  .pagination {
    padding: 50px;
    background-color: rgb(253, 245, 245);
  }
  </style>
  
  