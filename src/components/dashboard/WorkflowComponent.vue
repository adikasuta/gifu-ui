<template>
  <div class="profile">
    <h1>Workflow</h1>
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
            <option value="1">FILTER BY CATEGORY</option>
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
      <div class="workflow">
        <div class="workflowinfo">
          <div class="workflowname">
            <h4>WORKFLOW 1</h4>
            <span class="mdi mdi-pencil"></span>
          </div>
          <h5>Souvenir</h5>
          <div class="detail">
            <h5>Design</h5>
            <h5>-</h5>
            <h5>Production</h5>
            <h5>-</h5>
            <h5>Packing</h5>
            <h5>-</h5>
            <h5>Ready to Ship</h5>
          </div>
        </div>
        <div class="button"><button>EDIT</button></div>
      </div>
      <div>
        <button><span class="mdi mdi-plus"></span>ADD WORKFLOW</button>
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
button {
  transition-duration: 0.4s;
  margin: 10px;
  padding: 10px;
  background-color: rgb(252, 225, 225);
  width: 200px;
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
.refferal {
  border: 2px solid;
  border-color: #b6b6b6;
  margin: 10px;
  height: 40px;
  width: 80%;
}
.refferalgroup {
  display: flex;
}
.detail {
  display: flex;
}
.workflow {
  display: flex;
  align-content: center;
  background-color: #e4e3e3;
  border-radius: 30px;
  padding: 25px;
  margin: 20px auto;
}
.workflowname {
  display: flex;
}
.workflowinfo {
  flex-basis: 85%;
}
</style>