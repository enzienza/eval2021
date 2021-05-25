<template>
  <div id="app" class="h-screen flex flex-col justify-between">
    <router-view />
    <div class="bg-gray-800">
      <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-white opacity-50 text-sm text-left">
          © 2021 Enza Lombardo
        </p>
        <span class="inline-flex text-white opacity-50 ml-auto">
          Eval VueJS
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>