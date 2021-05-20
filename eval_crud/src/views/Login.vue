<template>
  <div class="form-login">
    <div class="layout">
      <dit class="form-head">
        <h1>Login</h1>
      </dit>
      <div>
        <label>Email</label>
        <input type="text" v-model="user.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="user.password" />
      </div>
      <div>
        <button @click="login">Connection</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "products-list" });
    },
  },
};
</script>

<style scoped></style>
