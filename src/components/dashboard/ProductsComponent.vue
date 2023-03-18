<template>
  <div class="catalog">
    <h1>Products</h1>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="author" content="colorlib.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:400,800"
        rel="stylesheet"
      />
      <link href="css/main.css" rel="stylesheet" />
    </head>
    <body>
      <div class="s004">
      <form>
          <div class="inner-form">
            <div class="input-field">
              <input
                class="form-control"
                id="choices-text-preset-values"
                type="text"
                placeholder="Type to search..."
              />
              <button class="btn-search" type="button">
                <span class="mdi mdi-magnify"></span>
              </button>
            </div>
          </div>
        </form>
        <div class="addnew">
          <button class="btn-add" type="button">
            <span class="mdi mdi-plus">ADD NEW PRODUCT</span>
          </button>
        </div>
      </div>
      <div class="w3-bar w3-black">
        <button class="All" onclick="openCity('All')">All</button>
        <button class="Design" onclick="openCity('Design')">Souvenir</button>
        <button class="Material" onclick="openCity('Material')">
          Invitation
        </button>
      </div>
      <div class="table">
      <table>
        <thead>
          <tr>
            <th width="20px" class="check"><input id="selectall" name="selectall" type="checkbox" /></th>
            <th text-align="left"><h4>Products</h4></th>
            <th><h4>Variation</h4></th>
            <th><h4>Price</h4></th>
            <th><h4>Sales</h4></th>
            <th><h4>Action</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="check"><input id="select" name="select" type="checkbox" /></th>
            <th>
              <div class="content">
                <v-img
                  class="pa-6 bg-secondary d-inline-block"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="130px"
                  width="130px"
                ></v-img>
                <div class="title"><h4>PRODUCT NAME</h4>
                <h5>PRODUCT DESCRIPTION</h5></div>
              </div>
            </th>
            <th>
             <h4>30 - 49</h4>
             <h4>50 - 99</h4>
             <h4>100 - 299</h4>
             <h4>300 - 499</h4>
             <h4>500 - 699</h4>
             <h4>700 - 999</h4>
             <h4>> 1000</h4>
            </th>
            <th>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
            </th>
            <th>82378</th>
            <th><div>
              <button>EDIT</button>
              <button>DUPLICATE</button>
              <button>REMOVE</button>
            </div></th>
          </tr>
          <tr>
            <th class="check"><input id="select" name="select" type="checkbox" /></th>
            <th>
              <div class="content">
                <v-img
                  class="pa-6 bg-secondary d-inline-block"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="130px"
                  width="130px"
                ></v-img>
                <div class="title"><h4>PRODUCT NAME</h4>
                <h5>PRODUCT DESCRIPTION</h5></div>
              </div>
            </th>
            <th>
             <h4>30 - 49</h4>
             <h4>50 - 99</h4>
             <h4>100 - 299</h4>
             <h4>300 - 499</h4>
             <h4>500 - 699</h4>
             <h4>700 - 999</h4>
             <h4>> 1000</h4>
            </th>
            <th>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
              <div class="price"><h4>Rp 55.800</h4><span class="mdi mdi-pencil"></span></div>
            </th>
            <th>82378</th>
            <th><div>
              <button>EDIT</button>
              <button>DUPLICATE</button>
              <button>REMOVE</button>
            </div></th>
          </tr>
        </tbody>
      </table>
    </div>
    <AddProductSouvComponent />
    </body>
  </div>
</template>

<script>
import AddProductSouvComponent from "../dashboard/AddProductSouvComponent";
export default {
  data: () => ({}),
  components: {
    AddProductSouvComponent
  },
};
</script>
<style scoped>
.catalog {
  width: 1300px;
}
h1 {
  text-align: center;
  margin: 100px auto;
}
.btn-search {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 50px;
  border-radius: 55px;
  text-align: center;
}
.All, .Design, .Material, .Packaging {
  transition-duration: 0.4s;
  padding: 10px;
  width: 24%;
  text-align: center;
  margin: 0 10px 0 0;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 200px;
  border-radius: 27px;
  text-align: center;
}
#All,
.All {
  background-color: rgb(252, 225, 225);
  border: none;
}
thead{
  background-color: rgb(252, 225, 225);
  height: 50px;
}

#All {
  padding: 20px 10px;
}
#Design, .Design {
  background-color: rgb(245, 187, 187);
}
#Material, .Material {
  background-color: rgb(241, 162, 162);
}
#Packaging, .Packaging {
  background-color: rgb(241, 127, 127);
}
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
td {
  padding: 15px;
  text-align: left;
}
input {
  border: 2px solid;
  border-color: #b6b6b6;
  padding: 20px auto;
  margin: 10px;
  height: 20px;
  width: 900px;
}
#select, #selectall{
width: 10px;
height: 10px;
} 
form {
  /* This bit sets up the horizontal layout */
  display: flex;
  flex-direction: row;
  /* flex-grow: 3; */
  /* justify-content: flex-end; */

  /* This bit draws the box around it */
  border: 1px solid grey;
  border-radius: 52px;

  /* I've used padding so you can see the edges of the elements. */
  padding: 1px;
  margin: 10px;
}
input {
  /* Tell the input to use all the available space */

  /* And hide the input's outline, so the form looks like the outline */
  border: none;
}
.s004 {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addnew {
  flex-grow: 1;
}
.price{
  display: flex;
  justify-content: center;
}
.content{
  display: flex;
  text-align: left;
  margin: 10px;
}
.title{
  margin:10px;
}
tr{
  border: 1px black;
}
</style>