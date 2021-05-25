<template>
  <div class="login">
    <div class="layout">
      <div class="w-full max-w-lg">
        <div class="leading-loose">
          <form class="card" @submit="login">
            <div class="card-title">
              <h1>Login</h1>
            </div>
            <div class="mt-4">
              <label class="form-label">E-mail</label>
              <input type="text" class="form-control" v-model="user.email" />
            </div>
            <div class="mt-4">
              <label class="form-label">Password</label>
              <input type="text" class="form-control" v-model="user.password" />
            </div>
            <div class="mt-6 items-center flex justify-between">
              <button class="btn-login">Connection</button>
              <a href="#" class="form-text"> Mot de passe oublié ? </a>
            </div>
            <div class="mt-4 text-center">
              <a href="#" class="form-text"> create a new account </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const email = "test@test.be";
const password = "test";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "test@test.be",
        password: "test",
      },
    };
  },
  methods: {
    login() {
      const currentEmail = this.user.email;
      const currentPassword = this.user.password;

      if (email === currentEmail && password === currentPassword) {
        localStorage.connected = "true";
        this.$router.push({ name: "products-list" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  @apply h-screen font-sans bg-gray-900 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-800;
  .layout {
    @apply container mx-auto h-full flex flex-1 justify-center items-center;
  }
  .card {
    @apply max-w-sm p-10 bg-white bg-opacity-25 rounded shadow-xl;
    &-title {
      @apply text-white uppercase font-medium text-center mb-4 tracking-widest text-xl font-bold;
    }
  }
  .btn-login {
    @apply px-4 py-1 uppercase text-white font-semibold tracking-wider bg-gray-900 rounded;
    &:hover {
      @apply bg-gray-800;
    }
  }
}
.form {
  &-label {
    @apply block text-left font-light text-sm text-white;
  }
  &-control {
    @apply w-full px-5 py-1 border border-gray-300 shadow-sm text-gray-700 bg-gray-100 rounded;
    &:focus {
      @apply ring-gray-500 border border-gray-500 bg-white;
    }
  }
  &-text {
    @apply inline-block right-0 align-baseline font-light text-xs text-white;
    &:hover {
      @apply text-red-300;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
