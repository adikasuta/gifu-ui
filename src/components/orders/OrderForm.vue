<template>
  <div>
    <div>
      <form>
        <!-- PAGE 1 -->
        <div v-if="counter === 0">
          <table>
            <tr>
              <td><h4>COLORS</h4></td>
              <td><TheMaterials></TheMaterials></td>
            </tr>
            <tr>
              <td><h4>TOTALS</h4></td>
              <td><h5>AUTOMATIC TOTALS</h5></td>
            </tr>
            <tr>
              <td><h4>PACKAGING</h4></td>
              <td><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
            <tr>
              <td><h4>PACKAGING COLOR 1</h4></td>
              <td><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
            <tr>
              <td><h4>PACKAGING COLOR 2</h4></td>
              <td><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
            <tr>
              <td><h4>ADDITIONALS</h4></td>
              <td><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
          </table>
          <div class="progressbarContainer">
            <div class="progressbar-wrapper">
              <ul class="progressbar">
                <li class="active">Product Details</li>
                <li>Design</li>
                <li>Customer Details</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- PAGE 2 -->
        <div v-if="counter === 1">
          <table>
            <tr>
              <td><h4>EMBOSS</h4></td>
              <td>
                <button id="show-modal" @click="showModal = true">
                  CHOOSE DESIGN
                </button>
              </td>
              <td>
                <label for="content">CONTENT</label>
                <input id="content" name="content" type="text" />
              </td>
            </tr>
            <tr>
              <td><h4>SIZE</h4></td>
              <td colspan="2">
                <select id="size" name="size">
                  <option value="2.5cm">2.5cm</option>
                  <option value="3 cm">3 cm</option>
                  <option value="3.5 cm">3.5 cm</option>
                  <option value="4 cm">4 cm</option>
                  <option value="4.5 cm">4.5 cm</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><h4>POSITION</h4></td>
              <td colspan="2"><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
            <tr>
              <td><h4>THANK YOU CARD</h4></td>
              <td colspan="2">
                <button id="show-modal" @click="showModal = true">
                  CHOOSE DESIGN
                </button>
              </td>
            </tr>
            <tr>
              <td><h4>NOTES</h4></td>
              <td colspan="2"><input id="notes" name="notes" type="text" /></td>
            </tr>
          </table>
          <div class="progressbarContainer">
            <div class="progressbar-wrapper">
              <ul class="progressbar">
                <li>Product Details</li>
                <li class="active">Design</li>
                <li>Customer Details</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- PAGE 3 -->
        <div v-if="counter === 2">
        <table >
          <tr>
            <td><h4>DATA PEMESAN</h4></td>
            <td>
              <table>
                <tr>
                  <td><label for="namapemesan">NAME</label></td>
                  <td>
                    <input id="namapemesan" name="namapemesan" type="text" />
                  </td>
                </tr>
                <tr>
                  <td><label for="nohppemesan">PHONE NUMBER</label></td>
                  <td>
                    <input id="nohppemesan" name="nohppemesan" type="text" />
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <label for="emailpemesan">EMAIL</label>
              <input id="emailpemesan" name="emailpemesan" type="text" />
            </td>
          </tr>
          <tr>
            <td><h4>NAMA MEMPELAI</h4></td>
            <td>
              <label for="bride">BRIDE</label>
              <input id="bride" name="bride" type="text" />
            </td>
            <td>
              <label for="groom">GROOM</label>
              <input id="groom" name="groom" type="text" />
            </td>
          </tr>
          <tr>
            <td><h4>EVENT DETAIL</h4></td>
            <td>
              <label for="date">DATE</label>
              <input id="date" name="date" type="text" />
            </td>
            <td>
              <label for="venue">VENUE</label>
              <input id="venue" name="venue" type="text" />
            </td>
          </tr>
          <tr>
            <td><h4>SHIPPING ADDRESS</h4></td>
            <td colspan="4">
              <table>
                <tr>
                  <td><label for="provinsi">PROVINSI</label></td>
                  <td>
                    <select id="provinsi" name="provinsi">
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                  </td>
                  <td><label for="kecamatan">DISTRICT</label></td>
                  <td>
                    <select id="kecamatan" name="kecamatan">
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                  </td>
                  <td rowspan="2">
                    <label for="kodepos">POSTAL CODE</label>
                    <select id="kodepos" name="kodepos">
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label for="kota">CITY</label></td>
                  <td>
                    <select id="kota" name="kota">
                      <option value="DKI Jakarta">Jakarta</option>
                      <option value="Jawa Barat">Bekasi</option>
                      <option value="Jawa Timur">Bandung</option>
                      <option value="Jawa Tengah">Jogja</option>
                    </select>
                  </td>
                  <td><label for="kelurahan">KELURAHAN</label></td>
                  <td>
                    <select id="kelurahan" name="kelurahan">
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label for="addressdetail">ADDRESS DETAIL</label></td>
                  <td colspan="4">
                    <input
                      id="addressdetail"
                      name="addressdetail"
                      type="text"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td><h4>ESTIMATION</h4></td>
            <td colspan="4">
              <table>
                <tr>
                  <td>
                    <h5>Price</h5>
                    <h4>Automatic Totals</h4>
                  </td>
                  <td>
                    <h5>Total Price</h5>
                    <h4>Automatic Totals</h4>
                  </td>
                  <td>
                    <h5>Product Weight</h5>
                    <h4>Automatic Totals</h4>
                    <h5>Actual weight and box may vary</h5>
                  </td>
                  <td>
                    <h5>Total Boxes</h5>
                    <h4>Automatic Totals</h4>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td><h4>PREFERRED SHIPPING VENDOR</h4></td>
            <td colspan="2" class="shippingvendor">
              <input
                id="shippingvendor-self"
                name="shippingvendor"
                type="checkbox"
              />
              <label for="shippingvendor-self">SELF PICKUP</label>
              <input
                id="shippingvendor-sicepat"
                name="shippingvendor"
                type="checkbox"
              />
              <label for="shippingvendor-sicepat">SICEPAT</label>
              <input
                id="shippingvendor-tutorials"
                name="shippingvendor"
                type="checkbox"
              />
              <label for="shippingvendor-indahcargo">INDAH CARGO</label>
              <input
                id="shippingvendor-gojek"
                name="shippingvendor"
                type="checkbox"
              />
              <label for="shippingvendor-gojek">GOJEK / GRAB</label>
            </td>
          </tr>
          <tr>
            <td><h4>PREFFERED PACKING</h4></td>
            <td colspan="2">
              <input
                id="prefferedpacking"
                name="prefferedpacking"
                type="checkbox"
              />
              <label for="prefferedpacking">WOODEN CRATE</label>
            </td>
          </tr>
          
        </table>
        <div class="progressbarContainer">
            <div class="progressbar-wrapper">
              <ul class="progressbar">
                <li>Product Details</li>
                <li>Design</li>
                <li class="active">Customer Details</li>
              </ul>
            </div>
          </div>
      </div>
      </form>

      <div class="buttons">
        <button @click="previous">PREVIOUS</button>
        <button v-if="counter === 0 || (counter === 1)" @click="next">NEXT</button>
        <button v-if="counter === 2" @click=goToInvoice>NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheMaterials from "../orders/OrderForm/TheMaterials.vue";
import CarrouselCheckbox from "../orders/OrderForm/CarrouselCheckbox.vue";
export default {
  components: { TheMaterials, CarrouselCheckbox },
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
    goToInvoice(){
            this.$router.push('/invoiceSouvenir')
        }
  },
};
</script>

<style scoped>
.progressbarContainer {
  margin-top: 30px;
  display: flex;
}
.progressbar-wrapper {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
}

.progressbar li {
  list-style-type: none;
  width: 33%;
  float: left;
  font-size: 16px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
}
.progressbar li:before {
  width: 30px;
  height: 30px;
  content: "";
  line-height: 30px;
  border: 2px solid #7d7d7d;
  display: block;
  text-align: center;
  margin: 0 auto 3px auto;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.progressbar li:after {
  width: 100%;
  height: 2px;
  content: "";
  position: absolute;
  background-color: #7d7d7d;
  top: 15px;
  left: -50%;
  z-index: 0;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: rgb(61, 61, 61);
  font-weight: bold;
}
.progressbar li.active:before {
  border-color: #ffadad;
  background: rgb(250, 155, 155);
}
.progressbar li.active + li:after {
  background-color: #f58181;
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
}
tr,
td {
  border: 1px solid;
  border-color: #acacac;
  padding: 16px;
  text-align: left;
}
input {
  border: 2px solid;
  border-color: #b6b6b6;
  margin: 10px;
  height: 40px;
  width: 80%;
}
select {
  height: 40px;
  border: 2px solid;
  border-color: #b6b6b6;
  margin: 5px;
  padding: 5px;
}
label {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 20px;
  margin: 5px;
}
input[type="checkbox"] {
  display: inline-block;
  width: 20px;
  margin-right: 1rem;
}
.shippingvendor {
  align-items: center;
}
</style>