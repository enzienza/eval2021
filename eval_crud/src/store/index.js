// External Dependencies ===========================
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// TO HANDEL STATE..................................
const state = {
  products: [],
  productApiURL: "https://fakestoreapi.com/products",
  categories: [],
  categoryApiURL: "https://fakestoreapi.com/products/categories",
  product: null,
  orderBy: "",
  orderDirection: "asc",
  pagination: {
    page: 0,
    currentPage: 1,
    perPage: 5,
  },
};

// TO HANDEL STATE..................................
const getters = {
  // Get all products
  allProducts: (state) => state.products,

  // Get all categories
  allCategories: (state) => state.categories,

  // Get the product
  product: (state) => state.product,

  // Get the order by filter
  getOrderBy: (state) => state.orderBy,

  // Get the order direction filter
  getOrderDirection: (state) => state.orderDirection,

  // Get the current Page
  getPages: (state) => state.pages,
};

// TO HANDEL ACTIONS................................
const actions = {
  /* --- Display all products --- */
  fetchProducts({ commit, state }) {
    axios
      .get(
        `${state.productApiURL}?_page=${state.pagination.currentPage}&_limit=${state.pagination.perPage}`
      )
      .then((res) => {
        commit("setProducts", res.data);
        commit("setPages", res.headers["x-total-count"]);
      })
      .catch((e) => {
        console.log("Erreur request fetch Product", e.data);
      });
    // axios
    //   .get(`${state.productApiURL}`)
    //   .then((res) => {
    //     commit("setProducts", res.data);
    //   })
    //   .catch((e) => {
    //     console.log("Erreur request fetch Product", e.data);
    //   });
  },

  fetchPages({ commit, dispatch }, page) {
    commit("setCurrentPage", page);
    dispatch("fetchProducts");
  },

  /* --- Display all categories --- */
  fetchCategories({ commit, state }) {
    axios
      .get(`${state.categoryApiURL}`)
      .then((res) => {
        commit("setCategories", res.data);
      })
      .catch((e) => {
        console.log("Error request fetch Categories", e.data);
      });
  },

  /* --- Adding a New Product --- */
  addProduct({ commit, state }, product) {
    axios
      .post(`${state.productApiURL}`, product)
      .then((res) => {
        commit("newProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request Add Product", e.data);
      });
  },

  /* --- Display the product selected --- */
  getProduct({ commit, state }, id) {
    axios
      .get(`${state.productApiURL}/${id}`)
      .then((res) => {
        commit("productID", res.data);
      })
      .catch((e) => {
        console.log("Error request get Product", e.data);
      });
  },

  /* --- Edit the product selected --- */
  updateProduct({ commit, state }, updatedProduct) {
    axios
      .put(`${state.productApiURL}/${updatedProduct.id}`, updatedProduct)
      .then((res) => {
        commit("editProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request update product", e.data);
      });
  },

  /* --- Deleted Product selected --- */
  removeProduct({ commit, state }, id) {
    axios
      .delete(`${state.productApiURL}/${id}`)
      .then((res) => {
        commit("deleteProduct", res.data);
      })
      .catch((e) => {
        console.log("Error request remove product", e.date);
      });
  },

  /* --- Filter Order Asc / Desc --- */
  sortOrderBy({ commit }, payload) {
    commit("setOrderBy", payload);
  },

  sortOrderDirection({ commit, state }) {
    axios
      .get(`${state.productApiURL}?sort=${state.orderDirection}`)
      .then((res) => {
        commit("setOrderDirection", res.data);
      })
      .catch((e) => {
        console.log("Eror request sortOrderDirection", e.data);
      });
  },

  /* --- pagination --- */
};

// TO HANDEL MUTATIONS..............................
const mutations = {
  /* --- Display all products --- */
  setProducts(state, products) {
    state.products = products;
  },

  setPages(state, pages) {
    state.pagination.pages = pages;
  },

  setCurrentPage(state, currentPage) {
    state.pagination.currentPage = currentPage;
  },

  /* --- Display all categories --- */
  setCategories(state, categories) {
    state.categories = categories;
  },

  /* --- Adding a New Product --- */
  newProduct(state, product) {
    state.products.unshift(product);
  },

  /* --- Display the product selected --- */
  productID(state, product /* id */) {
    //state.products = state.products.filter((product) => product.id === id);
    state.product = product;
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

  /* --- Filter Order Asc / Desc --- */
  setOrderBy(state, orderBy) {
    state.orderBy = orderBy;
  },
  setOrderDirection(state, orderDirection) {
    state.orderDirection = orderDirection;
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
