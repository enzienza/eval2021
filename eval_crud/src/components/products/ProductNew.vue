<template>
  <div>
    <div class="flex px-4 py-6 items-center justify-end">
      <button class="btn-back" @click="goBack">Back to List Products</button>
    </div>

    <div v-if="!submitted" class="card">
      <div class="flex mb-6">
        <h1 class="text-3xl tracking-wider font-bold">New product</h1>
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
            <select class="form-select">
              <option
                v-for="category in allCategories"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
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
            class="form-control"
            v-model="product.image"
            placeholder="Enter product image url"
          />
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

        <div class="flex flex-wrap mt-5 justify-end">
          <div class="p-2 w-1/5">
            <button class="btn-cancel" @click="goBack">Cancel</button>
          </div>
          <div class="p-2 w-1/5">
            <button class="btn-save" @click="onSubmit">Save</button>
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
            <button class="btn-cancel" @click="goBack">Cancel</button>
          </div>
          <div class="p-2 w-1/3">
            <button class="btn-save" @click="newProduct">New Product</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END card submitted true -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "ProductNew",
  data() {
    return {
      product: {
        id: null,
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
      },
      isSubmitted: false,
      submitted: false,
    };
  },
  computed: {
    ...mapGetters(["allCategories"]),
  },
  validations: {
    product: {
      title: { required, minLength: minLength(2) },
      price: { minLenght: minLength(0) },
      description: { maxLength: maxLength(200) },
    },
  },

  methods: {
    ...mapActions(["fetchCategories", "addProduct"]),

    // Definir Route -------------------------------
    goBack() {
      this.$router.push({ name: "products-list" });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    },

    onSubmit() {
      const product = {
        title: this.product.title,
        price: this.product.price,
        category: this.product.category,
        image: this.product.image,
        description: this.product.description,
      };
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.$store.dispatch("addProduct", product);
        this.submitted = true;
      }

      console.log("new product", product);
    },
  },

  created() {
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
</style>
