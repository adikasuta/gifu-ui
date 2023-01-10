<template>
    <v-container class="sample lighten-5"> 
        <v-row >
            <v-col md="12" class="text-center mb-5" >
                <h2>SAMPLE KIT</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6" class="text-right" >
                <v-btn >SHOPEE</v-btn>
            </v-col>
            <v-col md="6">
                <v-btn variant="tonal" color="secondary">TOKOPEDIA</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "SampleComponent",
    components: {},
};
</script>

<style scoped>
.sample {
    background-color: antiquewhite;
}
</style>