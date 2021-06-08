// External Dependencies ===========================
import Vue from "vue";
import VueI18n from "vue-i18n";

// Load Vuex =======================================
Vue.use(VueI18n);

// Array translation ===============================
const messages = {
  en: {
    log: {
      login: "Connection",
      logout: "Disconnection",
    },
    titlePage: {
      productList: "Product list",
      addProduct: "New product",
      editProduct: "Edit the product",
    },
    action: {
      addProduct: "Add New Product",
      goBack: "Back to List Products",
      newProduct: "New product",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search...",
    },
    name: {
      title: "Product Name",
      placeholder: "Enter product name",
      msgError: "Title is required a minimum 2 length",
    },
    category: {
      title: "Category",
      placeholder: "",
      msgError: "",
    },
    price: {
      title: "Price",
      placeholder: "Enter product price",
      msgError: "Price cannot be in negative",
    },
    image: {
      title: "Image (url)",
      placeholder: "Enter product image url",
      msgError: "",
    },
    description: {
      title: "Description",
      placeholder: "Enter product description",
      msgError: "Description is required a maximum 200 length",
    },
    modalDelete:{
      titleModal: "Please confirm",
      msgModal: "Please confirm that you want to delete product",
      refuse: "No",
      validate: "Yes",
    },
  },
  fr: {
    log: {
      login: "Connexion",
      logout: "Déconnexion",
    },
    titlePage: {
      productList: "Liste des produits",
      addProduct: "Nouveau produit",
      editProduct: "Modifier le produit",
    },
    action: {
      addProduct: "Ajouter un nouveau produit",
      goBack: "Retour à la liste des produits",
      newProduct: "Nouveau produit",
      save: "Enregistre",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      search: "Rechercher...",
    },
    name: {
      title: "Nom du produit",
      placeholder: "Entrez le nom du produit",
      msgError: "Le titre doit avoir une longueur de 2 minimum",
    },
    category: {
      title: "Catégorie",
      placeholder: "",
      msgError: "",
    },
    price: {
      title: "Prix",
      placeholder: "Ajouter le prix du produit",
      msgError: "Le prix ne peut pas être négatif",
    },
    image: {
      title: "Image (url)",
      placeholder: "Ajouter l'url de l'image du produit",
      msgError: "",
    },
    description: {
      title: "Description",
      placeholder: "Ajouter la description du produit",
      msgError: "La description doit avoir une longueur maximale de 200",
    },
    modalDelete:{
      titleModal: "Veuillez confirmer",
      msgModal: "Veuillez confirmer que vous souhaitez supprimer le produit",
      refuse: "Non",
      validate: "Oui",
    },
  },
};

// Export translate modules ========================
export default new VueI18n({
  locale: "fr", // set locale
  messages, // set locale messages
});
