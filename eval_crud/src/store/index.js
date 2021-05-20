// External Dependencies ===========================
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// Component Dependencies ==========================
// TO HANDEL STATE..................................
const state = {
  products: [],
  categories: [],
};

// TO HANDEL STATE..................................
const getters = {
  allProducts: (state) => state.products,
  allCategories: (state) => state.categories,
};

// TO HANDEL ACTIONS................................
const actions = {
  /* --- Display all products --- */
  fetchProducts({ commit }) {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        commit("setProduct", res.data);
      })
      .catch((e) => {
        console.log("Erreur request fetch Product", e.data);
      });
  },

  /* --- Display all categories --- */
  fetchCategories({ commit }) {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        commit("setCategories", res.data);
      })
      .catch((e) => {
        console.log("Error request fetch Categories", e.data);
      });
  },

  /* --- Adding a New Product --- */
  addProduct({ commit }, product) {
    axios
      .post("https://fakestoreapi.com/products", product)
      .then((res) => {
        commit("newProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request Add Product", e.data);
      });
  },

  /* --- Edit the product selected --- */
  updateProduct({ commit }, updatedProduct) {
    axios
      .put(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        updatedProduct
      )
      .then((res) => {
        commit("editProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request update product", e.data);
      });
  },

  /* --- Deleted Product selected --- */
  removeProduct({ commit }, id) {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        commit("deleteProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request remove product", e.date);
      });
  },
};

// TO HANDEL MUTATIONS..............................
const mutations = {
  /* --- Display all products --- */
  setProduct(state, products) {
    state.products = products;
  },

  /* --- Display all categories --- */
  setCategories(state, categories) {
    state.categories = categories;
  },

  /* --- Adding a New Product --- */
  newProduct(state, product) {
    state.products.unshift(product);
  },

  /* --- Edit the product selected --- */
  editProduct(state, updatedProduct) {
    const index = state.products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },

  /* --- Deleted Product selected --- */
  deleteProduct(state, id) {
    state.products = state.products.filter((product) => product.id !== id);
  },
};

// Load Vuex =========================================
Vue.use(Vuex);

// Export store module ==============================
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
