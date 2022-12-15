
<template>
    <span>
        <div :class="'v-input theme--light v-text-field v-text-field--is-booted ' +(errorMessages?'error--text v-input--has-state':'')">
            <div class="v-input__control">
                <div class="v-input__slot">
                    <div class="v-text-field__slot" :style="{'height': '32px', 'padding': '6px 0px!important', 'color':'black'}">
                        {{display}}
                    </div>
                </div>
                <div class="v-text-field__details">
                    <div :class="'v-messages theme--light '+(errorMessages?'error--text':'')" role="alert">
                        <div class="v-messages__wrapper">
                            <div class="v-messages__message">{{errorMessages}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>
<script lang="js">
import Vue from 'vue'
export default Vue.extend({
    props: ['display', 'errorMessages']
})
</script>