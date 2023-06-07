<template>
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
        placeholder="Enter Book Name (Required)"
        maxlength="50"
        required
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
        placeholder="Enter Book Author"
        maxlength="100"
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
        placeholder="Enter Book Description"
        maxlength="100"
      />
    </div>
    <div class="col-12">
      <label
        for="bookIcon"
        class="form-label"
        >Icon</label
      >
      <input
        @change="getFileNameHandleChange"
        type="file"
        class="form-control form-control-sm"
        id="bookIcon"
        accept="image/*"
        ref="fileInputRef"
      />
    </div>
    <div class="col-12">
      <button
        type="submit"
        class="btn btn-primary btn-sm"
      >
        Add Book
      </button>
    </div>
  </form>
</template>

<script>
// import
import { collection, addDoc } from "firebase/firestore"
import { storage } from "../firebase"
import { ref as fbRef, uploadBytes } from "firebase/storage"
import { db } from "@/firebase"
import { ref } from "vue"
import { formValidations } from "./../validations"

export default {
  setup() {
    // refs
    const nameRef = ref("")
    const authorRef = ref("")
    const descriptionRef = ref("")
    const fileNameRef = ref("")
    const fileInputRef = ref(null)

    // get file function
    const getFileNameHandleChange = (event) => {
      // for handling error when no selected file
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        fileInputRef.value = file
        fileNameRef.value = file.name
      } else {
        fileInputRef.value = null
        fileNameRef.value = ""
      }
    }

    // clear fields function
    const clearFields = () => {
      nameRef.value = ""
      authorRef.value = ""
      descriptionRef.value = ""
      // to fix: can't remove the text value in file input ( fe issue)
      fileInputRef.value = null
      fileNameRef.value = ""
    }

    // add book function
    const addBook = async () => {
      if (nameRef.value.length == 0) {
        alert("please fill out required field(s).")
        return
      }

      // validations
      const validation = formValidations(nameRef.value, authorRef.value, descriptionRef.value)

      // don't continue if false
      if (!validation) return

      // create unique file name base on date
      const haveFile = fileNameRef.value != ""
      const uniqueFileName = haveFile ? Date.now() + "-" + fileNameRef.value : ""

      // upload icon function
      const storageRef = fbRef(storage, `icon/${uniqueFileName}`)

      if (haveFile) {
        await uploadBytes(storageRef, fileInputRef.value).then((snapshot) => {
          console.log(snapshot, "uploaded")
        })
      }

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "books"), {
        name: nameRef.value,
        author: authorRef.value,
        description: descriptionRef.value,
        date_created: Date.now(),
        icon: uniqueFileName, // for unique name
      })
      console.log("Document written with ID: ", docRef.id)

      clearFields()
    }

    return { addBook, nameRef, authorRef, descriptionRef, getFileNameHandleChange }
  },
}
</script>

<style></style>
