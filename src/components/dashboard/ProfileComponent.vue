<template>
  <div class="profile">
    <h1>Profile</h1>
    <table>
      <tr>
        <td class="right"><h4>USERNAME</h4></td>
        <td>
          <input id="username" name="username" type="text" />
        </td>
        <td rowspan="7" class="profpic">
          <h4>PROFILE PICTURE</h4>
          <v-img class="pa-6 bg-secondary rounded-circle d-inline-block" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="80px" width="80px"></v-img>
          <br><button>CHANGE</button>
        </td>
      </tr>
      <tr>
        <td class="right"><h4>NAME</h4></td>
        <td>
          <input id="name" name="name" type="text" />
        </td>
      </tr>
      <tr>
        <td class="right"><h4>EMAIL</h4></td>
        <td>
          <input id="email" name="email" type="text" />
        </td>
      </tr>
      <tr>
        <td class="right"><h4>WHATSAPP NUMBER</h4></td>
        <td>
          <input id="whatsapp" name="whatsapp" type="text" />
        </td>
      </tr>
      <tr>
        <td class="right"><h4>ADDRESS</h4></td>
        <td>
          <input id="address" name="address" type="text" />
        </td>
      </tr>
      <tr>
        <td class="right"><h4>GENDER</h4></td>
        <td colspan="2" class="gender">
          <input id="gender-female" name="gender" type="checkbox" />
          <label for="gender-female">FEMALE</label>
          <input id="gender-male" name="gender" type="checkbox" />
          <label for="gender-male">MALE</label>
        </td>
      </tr>
      <tr>
        <td class="right"><h4>DATE OF BIRTH</h4></td>
        <td>DATE</td>
        <td>
          <select id="size" name="size">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td>MONTH</td>
        <td>
          <select id="size" name="size">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td>YEAR</td>
        <td>
          <select id="size" name="size">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
      </tr>
    </table>
    <div class="save">
    <button>SAVE</button>
</div>
  </div>
</template>

<style scoped>
.right{
    text-align: end;
}
.profile {
  width: 1300px;
}
h1 {
text-align: center;
  margin: 100px auto;
}
.profpic {
  text-align: center;
}
.save {
  text-align: center;
}
#gender-female,
#gender-male {
  width: 15px;
  height: 15px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 180px;
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
  margin: 10px;
  height: 40px;
  width: 80%;
}
</style>