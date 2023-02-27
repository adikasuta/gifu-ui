<template>
    <div class="container">
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="emailRules"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        :rules="passwordRules"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</div>
</template>

<script>
</script>

<style scoped>
.container {
  margin:90px auto;
}
</style>