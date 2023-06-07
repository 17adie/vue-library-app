<template>
  <img
    class="card-img-top object-fit-cover border rounded h-50"
    :src="url"
    alt="image icon"
  />
</template>

<script>
import { storage } from "../firebase"
import { ref, getDownloadURL } from "firebase/storage"

export default {
  props: {
    path: String,
  },
  data: () => {
    return {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
    }
  },
  mounted() {
    const iconPath = `icon/${this.path}`
    getDownloadURL(ref(storage, iconPath))
      .then((download_url) => {
        return (this.url = download_url)
      })
      .catch(function (error) {
        // Handle the error
        if (error.code === "storage/object-not-found") {
          // The file does not exist
          console.log("File not found.")
        } else {
          // Handle other errors
          console.log("An error occurred: " + error.message)
        }
      })
  },
}
</script>

<style scoped></style>
