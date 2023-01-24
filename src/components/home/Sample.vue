<template>
    <div class="sample">
        <h2>SAMPLE KIT</h2>
        <button class="button">SHOPEE</button>
        <button class="button">TOKOPEDIA</button>
        <!-- <v-row >
            <v-col class="text-center mb-5" >
                <h2>SAMPLE KIT</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col  class="text-right" >
                <v-btn >SHOPEE</v-btn>
            </v-col>
            <v-col >
                <v-btn variant="tonal" color="secondary">TOKOPEDIA</v-btn>
            </v-col>
        </v-row> -->
    </div>
</template>

<script>
export default {
    name: "SampleComponent",
    components: {},
};
</script>

<style scoped>
.sample {
    text-align: center;
    background-color: rgb(250, 215, 215);
    width:100vw;
    padding:30px;
}
.button {
  transition-duration: 0.4s;
  margin:10px;
  padding: 10px;
  background-color: rgb(161, 161, 161);
  width:180px;
}

.button:hover {
  background-color: #ffc4ed; /* Green */
  color: white;
}
</style>