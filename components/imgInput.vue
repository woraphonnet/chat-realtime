<template>
    <div
    class="image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span
      v-if="!imageData"
      class="placeholder"
    >
      Choose an Image
    </span>
    <input
      class="file-input"
      ref="fileInput"
      type="file"
      @input="onSelectFile"
    >
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      imageData: null
    }
  },

  methods: {
    chooseImage () {
      this.$refs.fileInput.click()
    },

    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        // upload file
        const formData = new FormData();
        formData.append('file',files[0]);
       try {
           axios.post('/upload',formData).then((res)=>{
              this.$emit('input', res.data)
           });
       } catch (error) {
       }
      }
    }
  }
}
</script>

<style>
.image-input{
    display: block;
    width: 180px;
    height: 180px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.placeholder{
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
    border-radius: 50%;
    font-weight: bold;
}

.placeholder:hover{
  background: #E0E0E0;
}
.file-input{
  display: none;
}
</style>