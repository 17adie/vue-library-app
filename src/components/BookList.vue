<template>
  <div class="d-flex justify-content-between">
    <h5 class="p-2">Book List</h5>
    <a
      href="#"
      @click="exportDataToCSV"
    >
      Export File to CSV
    </a>
  </div>
  <div
    class="p-5 text-center"
    v-if="books.length === 0"
  >
    No Data
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div
      class="col"
      v-for="book in books"
      :key="book.id"
    >
      <div class="card h-100">
        <CloudImage :path="book.icon" />
        <div class="card-body">
          <h6 class="card-title">{{ book.name }}</h6>
          <small class="text-muted">{{ book.author || "No author" }}</small>
          <hr />
          <p class="card-text">{{ book.description || "No description" }}</p>
          <!-- <p>{{ book.date_created }}</p> -->
        </div>
        <div class="card-footer">
          <div class="d-flex flex-row-reverse gap-2">
            <button
              class="btn btn-danger btn-sm"
              @click="deleteBook(book.id, book.icon)"
            >
              Delete
            </button>
            <button class="btn btn-info btn-sm">
              <router-link
                class="custom-link"
                :to="`/edit/${book.id}`"
                >Edit</router-link
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import CloudImage from "./CloudImage.vue"
import { storage } from "../firebase"
import { ref, deleteObject } from "firebase/storage"

export default {
  name: "BookList",
  props: {
    books: Object,
  },
  components: {
    CloudImage,
  },
  setup() {
    const booksCollection = collection(db, "books") // todo: must be in one file to easy export

    // delete data collection
    const deleteBook = async (id, fileName) => {
      // Create a reference to the file to delete
      const desertRef = ref(storage, `icon/${fileName}`)

      await deleteDoc(doc(booksCollection, id))

      // Delete the file
      await deleteObject(desertRef)
        .then(() => {
          console.log("file deleted")
        })
        .catch((error) => {
          console.log("error: ", error)
        })
    }
    // todo: several npm packages are not working :(
    const exportDataToCSV = async () => {
      try {
        const querySnapshot = await getDocs(booksCollection)

        const data = []

        querySnapshot.forEach((doc) => {
          data.push(doc.data()) // Add the selected columns to the data array
        })

        console.log("Not working yet. :(", data)
      } catch (error) {
        console.error("Error exporting data:", error)
      }
    }

    return { deleteBook, exportDataToCSV }
  },
}
</script>

<style scoped>
.custom-link {
  color: white;
  text-decoration: none; /* no underline */
}
</style>
