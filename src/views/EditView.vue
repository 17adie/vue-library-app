<template>
  <div class="container-sm custom-margin-top">
    <div class="card">
      <div class="card-header">Update Books</div>
      <div class="card-body">
        <form
          class="row g-3"
          @submit.prevent="updateBook"
        >
          <div class="col-md-6">
            <label
              for="bookName"
              class="form-label"
              >Book Name</label
            >
            <input
              v-model="updateForm.name"
              type="text"
              class="form-control form-control-sm"
              id="bookName"
              placeholder="Enter Book Name (Required)"
              required
              maxlength="50"
            />
          </div>
          <div class="col-md-6">
            <label
              for="bookAuthor"
              class="form-label"
              >Author(s)</label
            >
            <input
              v-model="updateForm.author"
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
              v-model="updateForm.description"
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
            />
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary btn-sm"
            >
              Update Book
            </button>
            <button class="btn btn-danger btn-sm m-2">
              <router-link
                class="custom-link"
                :to="'/'"
                >Cancel</router-link
              >
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { storage } from "../firebase"
import { ref, uploadBytes } from "firebase/storage"
import { formValidations } from "./../validations"

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)
    const booksCollection = doc(db, "books", userId.value)

    // I used reactive to explore
    const updateForm = reactive({
      name: "",
      author: "",
      description: "",
      icon: null,
      fileNameRef: "",
      fileInputRef: null,
    })

    // get file function
    const getFileNameHandleChange = (event) => {
      // for handling error when no selected file
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        updateForm.fileInputRef = file
        updateForm.fileNameRef = file.name
      } else {
        updateForm.fileInputRef = null
        updateForm.fileNameRef = ""
      }
    }

    onMounted(async () => {
      const docRef = booksCollection
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const { name, author, description, icon } = docSnap.data()
        updateForm.name = name
        updateForm.author = author
        updateForm.description = description
        updateForm.icon = icon
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!")
      }
    })

    const updateBook = async () => {
      if (updateForm.name.length == 0) {
        alert("please fill out required field(s).")
        return
      }

      // validations
      const validation = formValidations(updateForm.name, updateForm.author, updateForm.description)

      // don't continue if false
      if (!validation) return

      // create unique file name base on date
      const haveNewFile = updateForm.fileNameRef != ""
      const uniqueFileName = haveNewFile ? Date.now() + "-" + updateForm.fileNameRef : updateForm.icon

      // upload icon function
      const storageRef = ref(storage, `icon/${uniqueFileName}`)

      if (haveNewFile) {
        await uploadBytes(storageRef, updateForm.fileInputRef).then((snapshot) => {
          console.log(snapshot, "uploaded")
        })
        // todo: delete the old or unused icon
      }

      await updateDoc(booksCollection, {
        name: updateForm.name,
        author: updateForm.author,
        description: updateForm.description,
        icon: uniqueFileName,
        date_updated: Date.now(),
      })
      router.push("/")
    }

    return { updateForm, updateBook, getFileNameHandleChange }
  },
}
</script>

<style scoped>
.custom-margin-top {
  margin-top: 5rem;
}
.custom-link {
  color: white;
  text-decoration: none; /* no underline */
}
</style>
