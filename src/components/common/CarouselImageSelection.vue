<template>
  <div>
    <v-carousel show-arrows-on-hover :hide-delimiters="true" height="150">
      <v-carousel-item v-for="(pages, index) in paginatedItems" :key="index">
        <v-container class="grey lighten-5 mb-6">
          <v-row>
            <v-col cols="2" v-for="(item, itemIndex) of pages" :key="itemIndex">
              <label
                @click="selectOption(item.id)"
                :class="`v-carousel-label ${
                  isSelected(item.id) ? 'v-carousel-active' : ''
                }`"
              >
                <img :src="fileUrl(item.picture)" width="50" height="50" />
              </label>
              <div class="text-center text-container" style="width: 100%">
                {{ item.name }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
    <div class="pl-5" v-if="errorMessages && errorMessages.length > 0">
      <div class="v-messages theme--light error--text" role="alert">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">{{ errorMessages[0] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BASE_URL =
  process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
import PaginationUtils from "../../utils/PaginationUtils";
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [Object, Array],
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.multiple) {
      if (!Array.isArray(this.value)) {
        this.selectedItems = [];
      }else{
        this.selectedItems = this.value.map(it=>it.contentId)
      }
    } else {
      if (!this.value) {
        this.selectedItems = {};
      }else {
        this.selectedItems = this.value.contentId
      }
    }
  },
  data() {
    return {
      selectedItems: this.multiple ? [] : null,
      perPage: 6,
    };
  },
  methods: {
    fileUrl(filename) {
      if (!filename) {
        return "no_image.jpg";
      }
      return BASE_URL + "/public/api/assets/images?filename=" + filename;
    },
    isSelected(id) {
      if (this.multiple) {
        return this.selectedItems.includes(id);
      } else {
        return this.selectedItems == id;
      }
    },
    selectOption(id) {
      if (this.multiple) {
        if (this.isSelected(id)) {
          this.selectedItems = this.selectedItems.filter(
            (itemId) => itemId != id
          );
        } else {
          this.selectedItems.push(id);
        }
        let publishedData = [];
        for (const opt of this.options) {
          if (this.selectedItems.includes(opt.id)) {
            publishedData.push({
              variantId: opt.variantId,
              contentId: opt.id,
            });
          }
        }
        this.$emit("input", publishedData);
      } else {
        this.selectedItems = id;
        const filterred = this.options.filter(
          (opt) => opt.id == this.selectedItems
        );
        let publishedData = null;
        if (filterred.length > 0) {
          publishedData = {
            variantId: filterred[0].variantId,
            contentId: filterred[0].id,
          };
        }
        this.$emit("input", publishedData);
      }
    },
  },
  computed: {
    paginatedItems() {
      return PaginationUtils.paginateArray(this.options, this.perPage);
    },
  },
};
</script>

<style scoped>
.text-container {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-carousel-label {
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #eee;
  transition: all 500ms;
}

.v-carousel-active {
  box-shadow: 0 1px 5px 0 rgb(255, 162, 0);
  border: 1px solid rgb(255, 162, 0);
}
</style>
