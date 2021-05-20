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
                          width="50px" height="50px"
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
                  <router-link :to="{ name: 'product-edit', params: { id: product.id } }">
                    <button class="btn-edit" @click="setActiveProduct(product)">
                      Edit
                    </button>
                  </router-link>
                  <button class="btn-delete" @click="deletedProduct(product.id)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--<Pagination />-->
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
export default {
  name: "ProductList",
  data() {
    return {
      currentProduct: null
    };
  },
  computed:{
    ...mapGetters(["allProducts"])
  },
  methods: {
    ...mapActions(["fetchProducts", "deleteProduct"]),

    // Definir Route -------------------------------
    logout() {
      this.$router.push({ name: "login" });
    },

    newProduct() {
      this.$router.push({ name: "product-create" });
    },

    deletedProduct(id){
      this.$store.commit("deleteProduct", id)
      console.log("supprimer ", id)
    },

    setActiveProduct(product){
      console.log(product)
      this.currentProduct = product;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style scoped></style>
