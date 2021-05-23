<template>
  <div>
    <div>
      <button @click="logout">Log out</button>
    </div>
    <div>
      <div class="flex mb-6">
        <h1 class="text-3xl tracking-wider font-bold">Product</h1>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 flex flex-wrap items-center mt-2">
          <button class="btn-adding" @click="newProduct">
            Add New Product
          </button>

          <div class="hidden md:block mx-auto text-gray-600">
            Showing 1 to 10 of {{ allProducts.length }} entries
          </div>

          <div class="box-filter">
            <p class="flex">Filter</p>
            <span class="text-gray-200 cursor-pointer hover:text-gray-700">
              ASC
            </span>
            <span class="text-gray-200 cursor-pointer hover:text-gray-700">
              DESC
            </span>
          </div>

          <div class="flex w-56 relative text-gray-700 dark:text-gray-300">
            <input type="text" placeholder="Search..." class="form-search" />
          </div>
        </div>

        <div class="col-span-12 mt-4 overflow-auto">
          <table class="table-product">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in allProducts" :key="product.id">
                <td class="w-40">
                  <div class="flex justify-center">
                    <img
                      :src="product.image"
                      :alt="product.title"
                      class="rounded w-20 h-auto"
                      width="50px"
                      height="50px"
                    />
                  </div>
                </td>
                <td>
                  {{ product.title }}
                </td>
                <td class="w-40">{{ product.price }} €</td>
                <td class="w-64">{{ product.category }}</td>
                <td class="w-64">
                  <div class="flex justify-center space-x-8">
                    <router-link
                      :to="{ name: 'product-edit', params: { id: product.id } }"
                    >
                      <button
                        class="btn-edit"
                        @click="setActiveProduct(product)"
                      >
                        Edit
                      </button>
                    </router-link>
                    <button
                      class="btn-delete"
                      @click="setDeleteProduct(product)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--<Pagination />-->

        <div v-if="deleted">
          <div>
            <h4 class="text-2xl text-center">
              Are you sure you want to delete this product?
              {{ currentProduct.title }}
            </h4>
            <div class="flex flex-wrap mt-5 justify-center">
              <div class="p-2 w-1/3">
                <button class="btn-cancel" @click="noDeleted">No</button>
              </div>
              <div class="p-2 w-1/3">
                <button
                  class="btn-save"
                  @click="deletedProduct(currentProduct.id)"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductList",
  data() {
    return {
      currentProduct: null,
      deleted: false,
    };
  },
  computed: {
    ...mapGetters(["allProducts"]),
  },
  methods: {
    ...mapActions(["fetchProducts", "getProduct", "deleteProduct"]),

    // Definir Route ....................................
    logout() {
      this.$router.push({ name: "login" });
    },

    // Add a new product ................................
    newProduct() {
      this.$router.push({ name: "product-create" });
    },

    // Delete the product selected ......................
    setDeleteProduct(product, id) {
      this.product = this.$store.dispatch("getProduct", id);
      this.currentProduct = product;
      this.deleted = true;
      console.log("product selected is ", this.getProduct);
    },
    deletedProduct(id) {
      this.$store.commit("deleteProduct", id);
      console.log("supprimer ", id);
      this.deleted = false;
    },
    noDeleted() {
      this.deleted = false;
    },

    // Display the product selected .....................
    setActiveProduct(product) {
      console.log(product);
      this.currentProduct = product;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style scoped></style>
