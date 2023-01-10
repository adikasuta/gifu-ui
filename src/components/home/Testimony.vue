<template>
  <div>
    <h2>TESTIMONY</h2>
    <v-carousel>
      <v-carousel-item >
        <v-container
      class="grey lighten-5 mb-6"
    >
      <v-row
      >
        <v-col md="4"
        >
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        </v-col>
        <v-col md="4"
        >
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        </v-col>
        <v-col md="4"
        >
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        </v-col>
      </v-row>
    </v-container>
      </v-carousel-item>

      <v-carousel-item >
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
      </v-carousel-item>

      <v-carousel-item >
        <ImageCardComponent 
        img="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="Docks Image"
        subtitle="somewhere in the lake"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ImageCardComponent from "./ImageCard";
export default {
  name: "TestimonyComponent",
  components: {ImageCardComponent},
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>