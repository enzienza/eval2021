<template>
  <div class="intro-y">
    <ul class="pagination">
      <li>
        <a
          class="pagination__link"
          @click.prevent="previousPage"
          :class="{ 'opacity-20': this.currentPage === 1 }"
        >
          <IconChevronLeft />
        </a>
      </li>
      <li v-for="page in numberByPage" :key="page">
        <a class="pagination__link" :class="{ active: page === currentPage }">
          {{ page }}
        </a>
      </li>
      <li>
        <a
          class="pagination__link"
          @click.prevent="nextPage"
          :class="{ 'opacity-20': this.currentPage >= numberByPage - 1 }"
        >
          <IconChevronRight />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";
import { mapGetters } from "vuex";
export default {
  name: "Pagination",
  components: {
    IconChevronRight,
    IconChevronLeft,
  },
  data() {
    return {
      currentPage: 1,
      limited: 5,
    };
  },
  computed: {
    ...mapGetters(["allProducts"]),
    numberByPage() {
      let lengthProduct = this.allProducts.length;
      let perPage = this.limited;
      return Math.ceil(lengthProduct / perPage);
    },
  },
  methods: {
    previousPage() {
      this.currentPage--;
      if (this.currentPage <= 1) {
        this.currentPage = 1;
      }
      this.$emit("previous", this.limited);
    },
    nextPage() {
      this.currentPage++;
      if (this.currentPage >= this.limited) {
        this.currentPage = this.limited;
      }
      this.$emit("next", this.limited);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  @apply flex;
  &__link {
    @apply flex justify-center items-center mr-2 py-3 px-4;
  }
  .active {
    @apply bg-white shadow-md rounded-md border-transparent;
  }
}
.form-select {
  @apply w-20 bg-white py-3 px-4 border-transparent shadow-md rounded-md mt-3;
}
.intro-y {
  @apply col-span-12 mt-4 mb-5 flex flex-wrap justify-between items-center;
}
</style>
