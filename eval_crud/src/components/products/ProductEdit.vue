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

    <div v-if="deleted">
      <div>
        <div class="text-center">
          <h4 class="text-2xl">Please confirm</h4>
          <p class="text-lg">Please confirm that you want to delete product</p>
          <p>{{ currentProduct.title }}</p>
        </div>
        <div class="flex flex-wrap mt-5 justify-center">
          <div class="p-2 w-1/3">
            <button class="btn-cancel" @click="noDeleted">No</button>
          </div>
          <div class="p-2 w-1/3">
            <button class="btn-save" @click="deletedProduct(currentProduct.id)">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
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

<style scoped></style>
