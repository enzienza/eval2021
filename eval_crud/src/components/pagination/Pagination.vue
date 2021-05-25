<template>
  <div class="intro-y">
    <ul class="pagination">
      <li>
        <a class="pagination__link" href="">
          <IconChevronLeftDouble />
        </a>
      </li>
      <li>
        <a class="pagination__link" href="">
          <IconChevronLeft />
        </a>
      </li>
      <li><a class="pagination__link" href="">...</a></li>
      <li><a class="pagination__link" href="">1</a></li>
      <li><a class="pagination__link active" href="">2</a></li>
      <li><a class="pagination__link" href="">3</a></li>
      <li><a class="pagination__link" href="">...</a></li>
      <li>
        <a class="pagination__link" href="">
          <IconChevronRight />
        </a>
      </li>
      <li>
        <a class="pagination__link" href="">
          <IconChevronRightDouble />
        </a>
      </li>
    </ul>
    <select class="form-select">
      <option>10</option>
      <option>25</option>
      <option>35</option>
      <option>50</option>
    </select>
  </div>
</template>

<script>
import IconChevronLeftDouble from "../icons/IconChevronLeftDouble";
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";
import IconChevronRightDouble from "../icons/IconChevronRightDouble";
export default {
  name: "Pagination",
    components: {IconChevronRightDouble, IconChevronRight, IconChevronLeft, IconChevronLeftDouble},
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
