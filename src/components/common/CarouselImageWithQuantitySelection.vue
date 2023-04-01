<template>
  <div>
    <v-carousel show-arrows-on-hover :hide-delimiters="true" height="150">
      <v-carousel-item v-for="(pages, index) in paginatedItems" :key="index">
        <v-container class="grey lighten-5 mb-6">
          <v-row>
            <v-col
              style="padding: 3px"
              cols="2"
              v-for="(item, itemIndex) of pages"
              :key="itemIndex"
            >
              <label
                @click="onclickOption(item.id)"
                :class="`v-carousel-qty-label ${
                  isSelected(item.id) ? 'v-carousel-qty-active' : ''
                }`"
              >
                <img :src="fileUrl(item.picture)" width="50" height="50" />

                <div
                  class="text-center"
                  style="width: 100%"
                  v-if="isSelected(item.id)"
                >
                  {{ getQuantity(item.id) }}
                </div>
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

    <v-dialog v-if="showDialog" v-model="showDialog" persistent width="50%">
      <ValidationObserver ref="observer">
        <PainForm>
          <template v-slot:body>
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  :name="$t('views.order.fields.quantity')"
                  :vid="`variantQty`"
                  :rules="{
                    required: true,
                    numeric: true,
                  }"
                >
                  <v-text-field
                    outlined
                    v-model="quantity"
                    :error-messages="errors"
                    :label="$t('views.order.fields.quantity')"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer>
            <v-btn color="pink lighten-1" class="ml-5" @click="handleSubmit">
              {{ $t("views.order.fields.save") }}
            </v-btn>
            <v-btn color="pink lighten-1" text @click="handleCancel">
              {{ $t("views.order.fields.cancel") }}
            </v-btn>
          </template>
        </PainForm>
      </ValidationObserver>
    </v-dialog>
  </div>
</template>

<script>
const BASE_URL =
  process.env.VUE_APP_BACKEND_BASE_URL || "http://localhost:3000";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";
import PainForm from "../layout/PlainForm";
import PaginationUtils from "../../utils/PaginationUtils";
export default {
  components: {
    PainForm,
    ValidationObserver,
    ValidationProvider,
  },
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
    this.selectedItems = this.value;
    if (this.multiple && !Array.isArray(this.selectedItems)) {
      this.selectedItems = [];
    }

    if (this.multiple) {
      if (!Array.isArray(this.value)) {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.value.map((it) => {
          return {
            id: it.contentId,
            quantity: it.quantity,
          };
        });
      }
    } else {
      if (!this.value) {
        this.selectedItems = {};
      } else {
        this.selectedItems = {
          id: this.value.contentId,
          quantity: this.value.quantity,
        };
      }
    }
  },
  data() {
    return {
      popupId: null,
      showDialog: false,
      quantity: null,
      selectedItems: this.multiple ? [] : null,
      perPage: 6,
    };
  },
  methods: {
    getQuantity(id) {
      const selected = this.getSelectedItem(id);
      if (selected) {
        return selected.quantity;
      }
      return null;
    },
    getSelectedItem(id) {
      if (this.multiple) {
        const filterred = this.selectedItems.filter((item) => item.id == id);
        if (filterred.length > 0) {
          return filterred[0];
        }
        return null;
      }
      return this.selectedItems;
    },
    fileUrl(filename) {
      if (!filename) {
        return "no_image.jpg";
      }
      return BASE_URL + "/public/api/assets/images?filename=" + filename;
    },
    isSelected(id) {
      if (this.multiple) {
        if (this.selectedItems.length > 0) {
          return this.selectedItems.map((item) => item.id).includes(id);
        }
        return false;
      } else {
        return this.selectedItems.id == id;
      }
    },
    onclickOption(id) {
      this.popupId = id;
      this.quantity = null;
      this.showDialog = true;
    },
    handleCancel() {
      this.popupId = null;
      this.quantity = null;
      this.showDialog = false;
    },
    handleSubmit() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          this.selectOption(this.popupId, this.quantity);
          this.popupId = null;
          this.quantity = null;
          this.showDialog = false;
        }
      });
    },
    selectOption(id, quantity) {
      if (this.multiple) {
        if (this.isSelected(id)) {
          this.selectedItems = this.selectedItems.filter(
            (item) => item.id != id
          );
        } else {
          this.selectedItems.push({
            id,
            quantity,
          });
        }
        let publishedData = [];
        for (const opt of this.options) {
          for (let i = 0; i < this.selectedItems.length; i++) {
            if (opt.id == this.selectedItems[i].id) {
              publishedData.push({
                variantId: opt.variantId,
                contentId: opt.id,
                quantity: this.selectedItems[i].quantity,
              });
              break;
            }
          }
        }
        this.$emit("input", publishedData);
      } else {
        this.selectedItems = { id, quantity };
        const filterred = this.options.filter(
          (opt) => opt.id == this.selectedItems.id
        );
        let publishedData = null;
        if (filterred.length > 0) {
          publishedData = {
            variantId: filterred[0].variantId,
            contentId: filterred[0].id,
            quantity: parseInt(this.selectedItems.quantity),
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
.v-carousel-qty-label {
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

.v-carousel-qty-active {
  box-shadow: 0 1px 5px 0 rgb(255, 162, 0);
  border: 1px solid rgb(255, 162, 0);
}
</style>
