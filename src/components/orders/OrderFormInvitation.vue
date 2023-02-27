<template>
  <div>
    <div>
      <form>
        <!-- PAGE 1 -->
        <div v-if="counter === 0">
          <table>
            <tr>
              <td><h4>QTY</h4></td>
              <td colspan="2">
                <input id="notes" name="notes" type="number" />
              </td>
            </tr>
            <tr>
              <td><h4>BOARD PAPER</h4></td>
              <td colspan="2"><TheMaterials></TheMaterials></td>
            </tr>
            <tr>
              <td><h4>ENVELOPE PAPER</h4></td>
              <td colspan="2"><TheMaterials></TheMaterials></td>
            </tr>
            <tr>
              <td><h4>ORIENTATION</h4></td>
              <td>
                <h4>AMPLOP</h4>
                <select id="AMPLOP" name="AMPLOP">
                  <option value="POTRAIT">POTRAIT</option>
                  <option value="LANDSCAPE">LANDSCAPE</option>
                </select>
              </td>
              <td>
                <h4>BOARD</h4>
                <select id="AMPLOP" name="AMPLOP">
                  <option value="POTRAIT">POTRAIT</option>
                  <option value="LANDSCAPE">LANDSCAPE</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><h4>LANGUAGE</h4></td>
              <td colspan="2" class="language">
                <input id="language-id" name="language" type="checkbox" />
                <label for="language-id">INDONESIA</label>
                <input id="language-en" name="language" type="checkbox" />
                <label for="language-en">ENGLISH</label>
                <input id="language-mantrans" name="language" type="checkbox" />
                <label for="language-mantrans"
                  >MANDARIN (DENGAN JASA TRANSLATE)</label
                >
                <input id="language-man" name="language" type="checkbox" />
                <label for="language-man"
                  >MANDARIN (TANPA JASA TRANSLATE)</label
                >
              </td>
            </tr>
            <tr>
              <td><h4>FOIL COLOR</h4></td>
              <td colspan="2" class="language">
                <input id="language-id" name="language" type="checkbox" />
                <label for="language-id">GOLD</label>
                <input id="language-en" name="language" type="checkbox" />
                <label for="language-en">SILVER</label>
                <input id="language-mantrans" name="language" type="checkbox" />
                <label for="language-mantrans">BLUE</label>
                <input id="language-man" name="language" type="checkbox" />
                <label for="language-man">GREEN</label>
              </td>
            </tr>
            <tr>
              <td><h4>FOIL POSITION</h4></td>
              <td colspan="2">
                <!-- autocomplete without dropdown -->
                <div class="chip-container">
                  <div
                    class="chip"
                    v-for="(chip, i) of chips"
                    :key="chip.label"
                  >
                    {{ chip }}
                    <i class="material-icons" @click="deleteChip(i)">clear</i>
                  </div>
                  <input
                    v-model="currentInput"
                    placeholder="ENTER TO SEPARATE"
                    @keypress.enter="saveChip"
                    @keydown.delete="backspaceDelete"
                  />
                </div>
                <!-- autocomplete without dropdown -->
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

            <!-- <tr>
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
            </tr> -->
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
              <td colspan="4"><h4>ADDITIONALS</h4></td>
            </tr>
            <tr>
              <td><h4>EMBOSS</h4></td>
              <td>
                <!-- autocomplete without dropdown -->
                <div class="chip-container">
                  <div
                    class="chip"
                    v-for="(chip, i) of chips"
                    :key="chip.label"
                  >
                    {{ chip }}
                    <i class="material-icons" @click="deleteChip(i)">clear</i>
                  </div>
                  <input
                    v-model="currentInput"
                    placeholder="ENTER TO SEPARATE"
                    @keypress.enter="saveChip"
                    @keydown.delete="backspaceDelete"
                  />
                </div>
                <!-- autocomplete without dropdown -->
                <!-- <button id="show-modal" @click="showModal = true">
                  CHOOSE DESIGN
                </button> -->
              </td>
              <!-- <td>
                <label for="content">CONTENT</label>
                <input id="content" name="content" type="text" />
              </td> -->
            </tr>
            <tr>
              <td><h4>WAXSEALS</h4></td>
              <td colspan="2">
                <input id="language-man" name="language" type="checkbox" />
                <label for="language-man"
                  ><button id="show-modal" @click="showModal = true">
                    CHOOSE DESIGN
                  </button></label
                >
              </td>
            </tr>
            <tr>
              <td><h4>DRIED FLOWERS</h4></td>
              <td colspan="2">
                <CarouselContent
                  v-for="item in AdditionalInvitation"
                  :key="item.name"
                  :img="item.img"
                  :name="item.name"
                ></CarouselContent>
              </td>
            </tr>

            <tr>
              <td><h4>RIBBON COLOR</h4></td>
              <td colspan="2"><CarrouselCheckbox></CarrouselCheckbox></td>
            </tr>
            <tr>
              <td><h4>PACKING SERVICE</h4></td>
              <td colspan="2">
                <h4>YES</h4><input type="checkbox">
                <h4>NO</h4><input type="checkbox">
              </td>
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
          <table>
            <tr>
              <td><h4>DATA PEMESAN</h4></td>
              <td>
                <table class="noborder">
                  <tr>
                    <td>
                      <label for="namapemesan"><h5>NAME</h5></label>
                    </td>
                    <td>
                      <input id="namapemesan" name="namapemesan" type="text" />
                    </td>
                    <td>
                      <label for="emailpemesan"><h5>EMAIL</h5></label>
                    </td>
                    <td>
                      <input
                        id="emailpemesan"
                        name="emailpemesan"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="nohppemesan"><h5>PHONE NUMBER</h5></label>
                    </td>
                    <td>
                      <input id="nohppemesan" name="nohppemesan" type="text" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td><h4>THE BRIDE</h4></td>
              <td>
                <table class="noborder">
                  <tr>
                    <td width="10%">
                      <label for="bridefullname"><h5>FULLNAME</h5> </label>
                    </td>
                    <td>
                      <input
                        id="bridefullname"
                        name="bridefullname"
                        type="text"
                      />
                    </td>

                    <td>
                      <label for="bridemothersname"
                        ><h5>MOTHER'S NAME</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="bridemothersname"
                        name="bridemothersname"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="bridenickname"><h5>NICKNAME</h5> </label>
                    </td>
                    <td>
                      <input
                        id="bridenickname"
                        name="bridenickname"
                        type="text"
                      />
                    </td>

                    <td>
                      <label for="bridefathersname"
                        ><h5>FATHER'S NAME</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="bridefathersname"
                        name="bridefathersname"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="brideinstagram"
                        ><h5>INSTAGRAM ACCOUNT</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="brideinstagram"
                        name="brideinstagram"
                        type="text"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td><h4>THE GROOM</h4></td>
              <td>
                <table class="noborder">
                  <tr>
                    <td width="10%">
                      <label for="groomfullname"><h5>FULLNAME</h5> </label>
                    </td>
                    <td>
                      <input
                        id="groomfullname"
                        name="groomfullname"
                        type="text"
                      />
                    </td>

                    <td>
                      <label for="groommothersname"
                        ><h5>MOTHER'S NAME</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="groommothersname"
                        name="groommothersname"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="groomnickname"><h5>NICKNAME</h5> </label>
                    </td>
                    <td>
                      <input
                        id="groomnickname"
                        name="groomnickname"
                        type="text"
                      />
                    </td>

                    <td>
                      <label for="groomfathersname"
                        ><h5>FATHER'S NAME</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="groomfathersname"
                        name="groomfathersname"
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="groominstagram"
                        ><h5>INSTAGRAM ACCOUNT</h5>
                      </label>
                    </td>
                    <td>
                      <input
                        id="groominstagram"
                        name="groominstagram"
                        type="text"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td><h4>EVENT DETAIL</h4></td>
              <td>
                <div class="eventdetail">
                  <table class="noborder">
                    <tr>
                      <td>
                        <label for="eventname"><h5>EVENT NAME</h5></label>
                      </td>
                      <td>
                        <input id="eventname" name="eventname" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="date"><h5>DATE & TIME</h5></label>
                      </td>
                      <td><input id="date" name="date" type="text" /></td>
                    </tr>
                    <tr>
                      <td>
                        <label for="venue"><h5>VENUE</h5></label>
                      </td>
                      <td><input id="venue" name="venue" type="text" /></td>
                    </tr>
                  </table>
                  <button>REMOVE</button>
                </div>
                <button>ADD EVENT</button>
              </td>
            </tr>
            <tr>
              <td><h4>NOTES</h4></td>
              <td colspan="2"><input id="notes" name="notes" type="text" /></td>
            </tr>
            <tr>
              <td><h4>SHIPPING ADDRESS</h4></td>
              <td colspan="4">
                <table class="noborder">
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
                <li>Additionals</li>
                <li class="active">Customer Details</li>
              </ul>
            </div>
          </div>
        </div>
      </form>

      <div class="buttons">
        <button @click="previous">PREVIOUS</button>
        <button v-if="counter === 0 || counter === 1" @click="next">
          NEXT
        </button>
        <button v-if="counter === 2" @click="goToInvoice">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import AdditionalInvitation from "../../../assets/AdditionalInvitation.json";
import TheMaterials from "./OrderForm/TheMaterials.vue";
import CarouselContent from "./OrderForm/CarouselContent.vue";
import CarrouselCheckbox from "./OrderForm/CarrouselCheckbox.vue";
export default {
  components: { TheMaterials, CarouselContent, CarrouselCheckbox },
  data() {
    return {
      counter: 0,
      AdditionalInvitation,
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
    goToInvoice() {
      this.$router.push("/invoiceSouvenir");
    },
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
.noborder td,
tr {
  border: 0px;
  padding: 0%;
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
.eventdetail {
  background-color: #e0e0e0;
  border-radius: 15px;
  padding: 10px;
}
</style>