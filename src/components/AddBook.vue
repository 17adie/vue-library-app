<template>
  <!-- <div>
    <button @click="addBtn">ss</button>
  </div> -->
  <form
    class="row g-3"
    @submit.prevent="addBook"
  >
    <div class="col-md-6">
      <label
        for="bookName"
        class="form-label"
        >Book Name</label
      >
      <input
        v-model="nameRef"
        type="text"
        class="form-control form-control-sm"
        id="bookName"
      />
    </div>
    <div class="col-md-6">
      <label
        for="bookAuthor"
        class="form-label"
        >Author(s)</label
      >
      <input
        v-model="authorRef"
        type="text"
        class="form-control form-control-sm"
        id="bookAuthor"
      />
    </div>
    <div class="col-12">
      <label
        for="bookDescription"
        class="form-label"
        >Description</label
      >
      <input
        v-model="descriptionRef"
        type="text"
        class="form-control form-control-sm"
        id="bookDescription"
      />
    </div>
    <div class="col-12">
      <label
        for="bookIcon"
        class="form-label"
        >Icon</label
      >
      <input
        type="file"
        class="form-control form-control-sm"
        id="bookIcon"
        accept="image/*"
      />
    </div>
    <div class="col-12">
      <button
        type="submit"
        class="btn btn-primary btn-sm"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
// import
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { ref } from "vue"

export default {
  setup() {
    const nameRef = ref("")
    const authorRef = ref("")
    const descriptionRef = ref("")

    // clear fields function
    const clearFields = () => {
      nameRef.value = ""
      authorRef.value = ""
      descriptionRef.value = ""
    }

    // add book function
    const addBook = async () => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "books"), {
        name: nameRef.value,
        author: authorRef.value,
        description: descriptionRef.value,
      })
      console.log("Document written with ID: ", docRef.id)
      clearFields()
    }

    return { addBook, nameRef, authorRef, descriptionRef }
  },
}
</script>

<style></style>
