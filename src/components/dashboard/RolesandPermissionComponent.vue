<template>
  <div class="profile">
    <h1>Roles and Permissions</h1>
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
        <div class="dropdown">
          <select id="filter" name="filter">
            <option value="1">FILTER BY ROLE</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="btn-search" type="button">
            <span class="mdi mdi-menu-down"></span>
          </button>
        </div>
        <div class="addaccount">
          <button class="btn-add" type="button">
            <span class="mdi mdi-plus">ADD ACCOUNT</span>
          </button>
        </div>
      </div>
      <div class="s005">
        <div class="nameandrole">
          <table>
            <tr>
              <td colspan="2">name</td>
              <td>role</td>
            </tr>
            <tr>
              <td>
                <v-img
                  class="pa-6 bg-secondary rounded-circle d-inline-block"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="25px"
                  width="25px"
                ></v-img>
              </td>
              <td>name</td>
              <td>role</td>
            </tr>
            <tr>
              <td>
                <v-img
                  class="pa-6 bg-secondary rounded-circle d-inline-block"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="25px"
                  width="25px"
                ></v-img>
              </td>
              <td>name</td>
              <td>role</td>
            </tr>
          </table>
        </div>
        <div class="details">
          <div class="data">
            <v-img
              class="pa-6 bg-secondary rounded-circle d-inline-block"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              height="50px"
              width="50px"
            ></v-img>
            <div class="datauser">
              <h4>USERNAME</h4>
              <h5>email</h5>
              <h5>date of birth</h5>
              <h5>phone number</h5>
            </div>
          </div>
          <div class="role">
          <h4>ROLE</h4>
          <div class="dropdown2">
          <select id="filter" name="filter">
            <option value="1">ROLE</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="btn-search" type="button">
            <span class="mdi mdi-menu-down"></span>
          </button>
        </div>
        </div>
          <div class="refferalgroup">
          <h5>REFFERAL LINK</h5><div class="refferal">link refferal</div><button>COPY</button></div>
          <div class="permission">
            <h4>PERMISSIONS</h4>
            <table>
              <tr>
                <td>ACTION</td>
                <td>PERMISSION</td>
              </tr>
              <tr>
                <td>ACCESS PRODUCT PAGE</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>ACCESS CATALOG PAGE</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>VIEW INVOICE</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>EDIT INVOICE</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>CHANGE STATUS</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>APPROVE STATUS</td>
                <td>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<style scoped>
.profile {
  width: 1300px;
}
h1 {
  text-align: center;
  margin: 100px auto;
}
.buttons {
  display: flex;
  justify-content: space-between;
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
button{
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 100px;
  border-radius: 55px;
  text-align: center;
}
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
  padding: 20px auto;
  margin: 10px;
  height: 20px;
  width: 800px;
}
.s004 {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
form {
  /* This bit sets up the horizontal layout */
  display: flex;
  flex-direction: row;
  flex-grow: 3;

  /* This bit draws the box around it */
  border: 1px solid grey;
  border-radius: 52px;

  /* I've used padding so you can see the edges of the elements. */
  padding: 1px;
}
input {
  /* Tell the input to use all the available space */

  /* And hide the input's outline, so the form looks like the outline */
  border: none;
}

/* remove the input focus blue box, it will be in the wrong place. */
input:focus {
  outline: none;
}

/* Add the focus effect to the form so it contains the button */
form:focus-within {
  outline: 1px solid rgb(173, 173, 182);
}
.dropdown {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  /* This bit draws the box around it */
  border: 1px solid grey;
  border-radius: 52px;

  /* I've used padding so you can see the edges of the elements. */
  padding: 1px;
}
.dropdown2 {
  /* display: flex;
  flex-direction: row;
  flex-grow: 1; */
  /* This bit draws the box around it */
  border: 1px solid grey;
  width: 150px;
  /* I've used padding so you can see the edges of the elements. */
  padding: 1px;
}
select {
  text-align: center;
  padding: 10px;
}
.addaccount {
  flex-grow: 1;
}
.btn-add {
  width: 100%;
}
.nameandrole {
  width: 30%;
  border: 1px solid#999797;
  margin: 20px 0px 0px 0px;
  height: 500px;
}

tr {
  border: 1px solid;
  border-color: #acacac;
}
.s005 {
  display: flex;
  justify-content: space-around;
}
.details {
  width: 60%;
  border: 1px solid#999797;
  margin: 20px 0px 0px 0px;
  height: auto;
}
.data {
  margin: 10px 10px auto;
  display: flex;
}
.datauser{
  flex-basis: 600px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.refferal{

  border: 2px solid;
  border-color: #b6b6b6;
  margin: 10px;
  height: 40px;
  width: 80%;
}
.refferalgroup{
  display: flex;
}
.role{
  display: flex;
}
</style>