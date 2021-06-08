<template>
  <div>
    <div class="flex px-4 py-6 items-center justify-end space-x-8">
      <button class="btn-logout" @click="logout">{{ $t("log.logout") }}</button>
    </div>
    <div>
      <div class="flex mb-6">
        <h1 class="text-3xl tracking-wider font-bold">
          {{ $t("titlePage.productList") }}
        </h1>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 flex flex-wrap items-center mt-2">
          <button class="btn-adding" @click="newProduct">
            {{ $t("action.addProduct") }}
          </button>

          <div class="hidden md:block mx-auto text-gray-600">
            Showing {{ pagination.currentPage }} to {{ pagination.perPage }} of
            {{ allProducts.length }} entries
          </div>

          <!--          <div class="box-filter">-->
          <!--            <p class="flex">Filter</p>-->
          <!--            <span class="text-gray-200 cursor-pointer hover:text-gray-700">-->
          <!--              ASC-->
          <!--            </span>-->
          <!--            <span class="text-gray-200 cursor-pointer hover:text-gray-700">-->
          <!--              DESC-->
          <!--            </span>-->
          <!--          </div>-->

          <div class="flex w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              :placeholder="$t('action.search')"
              class="form-search"
              v-model="search"
            />
            <IconSearch />
          </div>
        </div>

        <div class="col-span-12 mt-4 overflow-auto">
          <table class="table-product">
            <thead>
              <tr>
                <th>Image</th>
                <th @click="sort('title')">
                  {{ $t("name.title") }}
                  <button
                    class="asc"
                    :class="[sortBy === 'title' ? sortDirection : 'desc']"
                  ></button>
                </th>
                <th @click="sort('price')">
                  {{ $t("price.title") }}
                  <button
                    class="asc"
                    :class="[sortBy === 'price' ? sortDirection : 'desc']"
                  ></button>
                </th>
                <th @click="sort('category')">
                  {{ $t("category.title") }}
                  <button
                    class="asc"
                    :class="[sortBy === 'category' ? sortDirection : 'desc']"
                  ></button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- START item product -->
              <tr v-for="product in sortedProducts" :key="product.id">
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
                <td class="w-40">{{ product.price.toFixed(2) }} €</td>
                <td class="w-64">{{ product.category }}</td>
                <td class="w-64">
                  <div class="flex justify-center space-x-8">
                    <router-link
                      :to="{ name: 'product-edit', params: { id: product.id } }"
                    >
                      <button
                        class="txt-edit"
                        @click="setActiveProduct(product)"
                      >
                        <IconPencil />
                        {{ $t("action.edit") }}
                      </button>
                    </router-link>
                    <button
                      class="txt-delete"
                      @click="setDeleteProduct(product)"
                    >
                      <IconDelete />
                      {{ $t("action.delete") }}
                    </button>
                  </div>
                </td>
              </tr>
              <!-- END item product -->
            </tbody>
          </table>
        </div>
        <!-- START pagination -->
        <Pagination @next="nextProducts" @previous="previousProducts" />
        <!-- END pagination -->

        <!-- START model deleted -->
        <div v-if="deleted" class="modal">
          <div class="bg-white rounded-lg w-1/2">
            <div class="flex flex-col items-start p-4">
              <div class="modal-head">
                <div class="text-gray-800 font-semibold py-4">
                  {{ $t("modalDelete.titleModal") }}
                </div>
              </div>
              <div class="modal-body">
                <p class="">{{ $t("modalDelete.msgModal") }}</p>
                <p class="font-bold text-center py-2">
                  {{ currentProduct.title }}
                </p>
              </div>
              <div class="modal-footer">
                <div class="px-5">
                  <button class="btn-cancel" @click="noDeleted">
                    {{ $t("modalDelete.refuse") }}
                  </button>
                </div>
                <div class="">
                  <button
                    class="btn-delete"
                    @click="deletedProduct(currentProduct.id)"
                  >
                    {{ $t("modalDelete.validate") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END modal deleted-->
      </div>
    </div>
  </div>
</template>

<script>
// Import element Store ===========================
import { mapState, mapGetters, mapActions } from "vuex";

// Import components ==============================
import IconPencil from "../icons/IconPencil";
import IconDelete from "../icons/IconDelete";
import IconSearch from "../icons/IconSearch";
import Pagination from "../pagination/Pagination";

// Export vue =====================================
export default {
  name: "ProductList",
  components: {
    Pagination,
    IconSearch,
    IconDelete,
    IconPencil,
  },
  data() {
    return {
      currentProduct: null,
      deleted: false,
      search: "",
      sortBy: "",
      sortDirection: "desc",
      limit: {
        from: 0,
        to: 5,
      },
    };
  },
  computed: {
    ...mapState(["pagination"]),
    ...mapGetters(["allProducts", "getPages"]),

    // filter Search ....................................
    filteredProducts() {
      return this.allProducts.filter((product) => {
        return product.title.match(this.search);
      });
    },

    // Order Asc / Desc ..................................
    sortedProducts() {
      return this.filteredProducts
        .concat()
        .sort((p1, p2) => {
          let payload = 1;
          if (this.sortDirection === "desc") payload = -1;
          if (p1[this.sortBy] < p2[this.sortBy]) return -1 * payload;
          if (p1[this.sortBy] > p2[this.sortBy]) return 1 * payload;
          return 0;
        })
        .slice(this.limit.from, this.limit.to);
    },
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchPages",
      "getProduct",
      "deleteProduct",
    ]),

    // Definir Route ....................................
    logout() {
      localStorage.clear();
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

    // Pagination ........................................
    nextProducts(numberByPage) {
      if (this.limit.to < this.allProducts.length) {
        this.limit = {
          from: this.limit.from + numberByPage,
          to: this.limit.to + numberByPage,
        };
        this.sortedProducts;
      }
    },
    previousProducts(numberByPage) {
      if (this.limit.from > 0) {
        this.limit = {
          from: this.limit.from - numberByPage,
          to: this.limit.to - numberByPage,
        };
        this.sortedProducts;
      }
    },

    // Order Asc / Desc ..................................
    sort(s) {
      if (s === this.sortBy) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      }
      this.sortBy = s;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchPages");
  },
};
</script>

<style scoped lang="scss">
.btn {
  &-logout {
    @apply px-4 py-3 uppercase text-white font-semibold  bg-gray-700 rounded;
    &:hover {
      @apply bg-gray-600;
    }
  }
  &-adding {
    @apply shadow-md mr-2 bg-purple-700 text-white rounded-md cursor-pointer px-4 py-3 inline-flex items-center justify-center font-bold;
    &:hover {
      @apply bg-purple-600;
    }
  }
  &-search {
    @apply w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0;
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
    @apply w-full px-6 py-3 mt-3 text-lg transition-all duration-150 ease-linear rounded-lg shadow outline-none;
    &:hover {
      @apply shadow-lg;
    }
    &:focus {
      @apply outline-none;
    }
  }
  &-filter {
    @apply w-4 h-4 text-gray-400;
    &:hover {
      @apply text-gray-800;
    }
    .active {
      @apply text-gray-800;
    }
  }
}
.txt {
  &-edit {
    @apply flex text-green-400 space-x-2;
  }
  &-delete {
    @apply flex text-red-400 space-x-2;
  }
}
.box-filter {
  @apply inline-flex bg-white rounded-md px-4 py-3 shadow items-center ml-16 mr-20 space-x-4;
}
.form {
  &-search {
    @apply px-4 py-3 shadow rounded w-56 pr-10;
  }
}

.table-product {
  @apply table table-auto border-collapse w-full;
  thead {
    @apply bg-gray-100 tracking-wider rounded font-medium text-gray-900 text-sm;
    th {
      @apply whitespace-nowrap px-4 py-3;
    }
  }
}

td {
  @apply px-4 py-3;
}
tr:nth-child(even) {
  @apply bg-gray-100 bg-opacity-40;
}
.box-action {
  @apply flex justify-center font-thin items-center space-x-5;
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

.asc:after {
  content: "\25B2";
  @apply text-gray-500;
  &:hover {
    @apply text-gray-600;
  }
}

.desc:after {
  content: "\25BC";
  @apply text-gray-500;
  &:hover {
    @apply text-gray-600;
  }
}
</style>
