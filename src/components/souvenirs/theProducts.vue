<template>
    <v-card class="mx-auto" max-width="344">
        <v-img :src="img" height="200px"></v-img>
        <v-card-title>
            {{name}}
        </v-card-title>
        <v-card-subtitle>
            {{price}}
        </v-card-subtitle>
        <v-card-subtitle>
            {{size}}
        </v-card-subtitle>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    {{description}}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>
<script>
export default {
    props:{
        img: String,
        name: String,
        price: String,
        size: String
    },
    data: () => ({
        show: false,
    }),
}
</script>