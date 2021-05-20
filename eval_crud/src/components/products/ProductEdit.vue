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
          <input type="text" class="form-control" />
          !-- <span class="msg-error">Category has to be selected</span>-->
        </div>

        <div class="flex flex-wrap">
          <div class="p-2 w-1/2">
            <label class="form-label">Category</label>
            <p></p>
            <!--            <span class="msg-error">Category has to be selected</span>-->
          </div>

          <div class="p-2 w-1/2">
            <label class="form-label">Price</label>
            <div class="form-group">
              <input type="text" class="form-group-control" />
              <div class="form-group-text">€</div>
            </div>
          </div>
        </div>

        <div class="p-2 w-full">
          <label class="form-label">Image (url)</label>
          <input type="text" class="form-control" />
          <!--          <span class="msg-error">Image is required</span>-->
        </div>

        <div class="p-2 w-full">
          <label class="form-label">Description</label>
          <textarea class="form-control"></textarea>
        </div>

        <div class="flex flex-wrap mt-5 justify-end">
          <div class="p-2 w-1/5">
            <button class="btn-cancel" @click="goBack">Cancel</button>
          </div>
          <div class="p-2 w-1/5">
            <button class="btn-save">Save</button>
          </div>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script>
export default {
  name: "ProductEdit",
  data() {
    return {
      submitted: false,
    };
  },
  methods: {
    // Definir Route -------------------------------
    goBack() {
      this.$router.push({ name: "products-list" });
    },

    newProduct() {
      this.submitted = false;
    },
  },
};
</script>

<style scoped></style>
