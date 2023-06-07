<template>
  <div class="container-sm custom-margin-top">
    <div class="card">
      <div class="card-header">Manage Books</div>
      <div class="card-body">
        <addBook></addBook>
        <hr />
        <bookList :books="books"></bookList>
      </div>
    </div>
  </div>
</template>

<script>
// import
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/firebase"
import { onMounted, ref } from "vue"
import BookList from "../components/BookList.vue"
import AddBook from "../components/AddBook.vue"

export default {
  components: {
    bookList: BookList,
    addBook: AddBook,
  },
  setup() {
    // refs
    const books = ref([])

    // query
    const booksCollectionRef = collection(db, "books")
    const booksCollectionQuery = query(booksCollectionRef, orderBy("date_created", "desc"))

    // run when page load
    onMounted(() => {
      // realtime
      onSnapshot(booksCollectionQuery, (querySnapshot) => {
        const fbBooks = []
        querySnapshot.forEach((doc) => {
          const { name, description, author, date_created, icon } = doc.data()

          const getDate = new Date(date_created)

          const books = {
            id: doc.id,
            name,
            description,
            author,
            date_created: getDate,
            icon,
          }
          fbBooks.push(books)
        })
        books.value = fbBooks
      })
    })
    return {
      books,
    }
  },
}
</script>

<style scoped>
.custom-margin-top {
  margin-top: 5rem;
}
</style>
