<template>
  <h5 class="p-2">Book List</h5>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div
      class="col"
      v-for="book in books"
      :key="book.id"
    >
      <div class="card h-100">
        <img
          src=""
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{{ book.name }}</h5>
          <p class="card-text">{{ book.description }}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">{{ book.author }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    books: Object,
  },
}
</script>

<style></style>
