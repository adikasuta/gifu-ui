<template>
    <div>
        <ValidationProvider v-if="!isDisabled" v-slot="{ errors }" name="cvv" rules="required|min:3|max:4"
            ref="cvvProvider">
            <v-text-field v-mask="'####'" autocomplete="off" :error-messages="errors" id="cvv" :value="content"  @input="handleInput" type="password" xs/>
        </ValidationProvider>
        <v-text-field v-else disabled id="cvv" value="***" type="password"></v-text-field>
    </div>
</template>
<script lang="js">
import Vue from 'vue'
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";

import { VueMaskDirective } from "v-mask";

Vue.directive('mask', VueMaskDirective);
export default Vue.extend({
    props: ['value', 'isDisabled'],
    data() {
        return {
            content: this.value
        }
    },
    methods: {
        handleInput(e) {
            let value = e.replace(/\s/g, '');
            this.content = value
            this.$emit('input', value)
        }
    },
    components: {
        ValidationProvider
    },
})
</script>