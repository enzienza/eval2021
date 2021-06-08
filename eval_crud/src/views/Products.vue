<template>
  <div class="container mx-auto mb-10 mb-auto">
    <div class="flex justify-end py-3">
      <select v-model="$i18n.locale" class="form-select">
        <option v-for="lang in langs" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      langs: ["en", "fr"],
    };
  },
};
</script>

<style scoped lang="scss">
.form-select {
  @apply h-full py-0 pl-2 pr-7 bg-transparent border-gray-200 border text-gray-500 rounded;
  &:focus {
    @apply ring-indigo-500 border-indigo-500;
  }
}
</style>
