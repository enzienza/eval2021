<template>
  <div>
    <div class="flex px-4 py-6 items-center justify-end">
      <button class="btn-back" @click="goBack">Back to List Products</button>
    </div>

    <div v-if="!submitted" class="card">
      <div class="flex mb-6">
        <h1 class="text-3xl tracking-wider font-bold">Edit the product</h1>
      </div>
      <div class="form text-left space-y-4">
        <div class="p-2 w-full">
          <label class="form-label">Product Name</label>
          <input
            type="text"
            class="form-control"
            v-model="product.title"
            placeholder="Enter product name"
            :class="{ 'is-invalid': isSubmitted && $v.product.title.$error }"
          />
          <span
            class="msg-error"
            v-if="isSubmitted && !$v.product.title.required"
          >
            Title is required a minimum 2 length
          </span>
        </div>

        <div class="flex flex-wrap">
          <div class="p-2 w-1/2">
            <label class="form-label">Category</label>
            <p>{{ product.category }}</p>
            <select class="form-select">
              <option
                v-for="category in allCategories"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
            <!--            <span class="msg-error">Category has to be selected</span>-->
          </div>

          <div class="p-2 w-1/2">
            <label class="form-label">Price</label>
            <div class="form-group">
              <input
                type="text"
                class="form-group-control"
                v-model="product.price"
                placeholder="Enter product price"
                :class="{
                  'is-invalid': isSubmitted && $v.product.price.$error,
                }"
              />
              <div class="form-group-text">€</div>
            </div>
            <span
              class="msg-error"
              v-if="isSubmitted && !$v.product.price.minLenght"
            >
              Price cannot be in negative
            </span>
          </div>
        </div>

        <div class="p-2 w-full">
          <label class="form-label">Image (url)</label>
          <input
            type="text"
            v-model="product.image"
            class="form-control"
            placeholder="Enter product image url"
          />
          <!--          <span class="msg-error">Image is required</span>-->
        </div>

        <div class="p-2 w-full">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            v-model="product.description"
            placeholder="Enter product description"
            :class="{
              'is-invalid': isSubmitted && $v.product.description.$error,
            }"
          ></textarea>
          <span
            class="msg-error"
            v-if="isSubmitted && !$v.product.description.maxLength"
          >
            Description is required a maximum 200 length
          </span>
        </div>

        <div class="flex flex-wrap mt-5 justify-between">
          <div>
            <button class="btn-delete" @click="setDeleteProduct(product)">
              Delete
            </button>
          </div>

          <div class="flex justify-end">
            <div class="p-2 w-1/2">
              <button class="btn-cancel" @click="goBack">Cancel</button>
            </div>
            <div class="p-2 w-1/2">
              <button class="btn-save" @click="onSubmit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- START card submitted true -->
    <div v-else class="card">
      <div>
        <h4 class="text-2xl text-center">You submitted successfully !</h4>
        <div class="flex flex-wrap mt-5 justify-center">
          <div class="p-2 w-1/3">
            <button class="btn-cancel" @click="goBack">List Products</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END card submitted true -->

    <!-- START model deleted -->
    <div v-if="deleted" class="modal">
      <div class="bg-white rounded-lg w-1/2">
        <div class="flex flex-col items-start p-4">
          <div class="modal-head">
            <div class="text-gray-800 font-semibold py-4">Please confirm</div>
          </div>
          <div class="modal-body">
            <p class="">Please confirm that you want to delete product</p>
            <p class="font-bold text-center py-2">
              {{ currentProduct.title }}
            </p>
          </div>
          <div class="modal-footer">
            <div class="px-5">
              <button class="btn-cancel" @click="noDeleted">No</button>
            </div>
            <div class="">
              <button
                class="btn-delete"
                @click="deletedProduct(currentProduct.id)"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END modal deleted-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "ProductEdit",
  data() {
    return {
      //product: "",
      submitted: false,
      isSubmitted: false,
      deleted: false,
      currentProduct: null,
    };
  },
  computed: {
    ...mapGetters(["allCategories", "product"]),
  },
  validations: {
    product: {
      title: { required, minLength: minLength(2) },
      price: { minLenght: minLength(0) },
      description: { maxLength: maxLength(200) },
    },
  },

  methods: {
    ...mapActions(["updateProduct", "getProduct", "removeProduct"]),

    // Definir Route ....................................
    goBack() {
      this.$router.push({ name: "products-list" });
    },

    // Delete the product selected ......................
    setDeleteProduct(product) {
      //this.product = this.$store.dispatch("getProduct", id);
      this.currentProduct = product;
      this.deleted = true;
      console.log("product selected is ", this.getProduct);
    },
    noDeleted() {
      this.deleted = false;
    },
    deletedProduct(id) {
      //this.$store.commit("deleteProduct", id);
      this.$store.dispatch("removeProduct", id);
      console.log("supprimer ", id);
      this.$router.push({ name: "products-list" });
    },

    // submit the product updated .....................
    onSubmit() {
      const updatedProduct = {
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        category: this.product.category,
        image: this.product.image,
        description: this.product.description,
      };

      console.log(this.product);
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.$store.commit("updateProduct", updatedProduct);
        this.submitted = true;
      }
      console.log("this is updated", updatedProduct);
    },
  },

  mounted() {},

  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch("getProduct", this.id);
    this.$store.dispatch("fetchCategories");
  },
};
</script>

<style scoped lang="scss">
.btn {
  &-back {
    @apply px-4 py-3 text-white font-semibold  bg-gray-700 rounded;
    &:hover {
      @apply bg-gray-600;
    }
  }
  &-delete {
    @apply w-full text-white px-6 py-3 mt-3 text-lg bg-red-500 transition-all duration-150 ease-linear rounded-lg shadow outline-none;
    &:hover {
      @apply bg-red-600 shadow-lg;
    }
    &:focus {
      @apply outline-none;
    }
  }
  &-cancel {
    @apply w-full px-6 py-3 mt-3 text-lg mr-5 transition-all duration-150 ease-linear rounded-lg shadow outline-none;
    &:hover {
      @apply shadow-lg;
    }
    &:focus {
      @apply outline-none;
    }
  }
  &-save {
    @apply w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-purple-500;
    &:hover {
      @apply bg-purple-600 shadow-lg;
    }
    &:focus {
      @apply outline-none;
    }
  }
}

.card {
  @apply w-1/2 bg-white shadow-xl p-10 rounded-md mx-auto mb-10;
}

.form {
  &-label {
    @apply leading-7 text-sm text-gray-600;
  }
  &-control {
    @apply w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out;
    &:focus {
      @apply border-indigo-500 bg-white ring-2 ring-indigo-200;
    }
  }
  &-select {
    @apply w-full py-2 px-3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out;
  }

  &-group {
    @apply flex items-center;
    &-control {
      @apply w-full py-1 px-3 bg-gray-100 rounded-tl rounded-bl text-base border outline-none text-gray-700 bg-opacity-50 leading-8 transition-colors duration-200 ease-in-out;
      &:focus {
        @apply border-indigo-500 bg-white ring-2 ring-indigo-200;
      }
    }
    &-text {
      @apply bg-gray-200 py-2 px-4 font-bold  border rounded-tr rounded-br;
    }
  }

  .msg-error {
    @apply text-sm text-red-600;
  }
}
.modal {
  @apply flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50;
  &-head {
    @apply flex items-center w-full border-b border-gray-100 mb-4 text-2xl;
  }
  &-body {
    @apply text-lg w-full space-y-4;
  }
  &-footer {
    @apply ml-auto mb-4 flex;
  }
}
</style>
