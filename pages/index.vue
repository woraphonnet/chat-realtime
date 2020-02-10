<template>
  <div class="container">
    <div class="card">
      <img src="../assets/imgs/cat.jpg" alt="">
      <input type="text" v-model="name">
      <span v-if="error">{{this.error}}</span>
      <button @click="setUserName">create</button>
    </div>
  </div>
</template>

<script>
  import socket from '../plugins/socket.io'
  export default {
    data() {
      return {
        name: null,
        error: null,
      }
    },
    methods: {
      setUserName() {
        socket.emit('setUserName', this.name);
        socket.on('userSet', (data) => {
          if (data.status == 'Y') {
              this.$router.push({ name: 'dashboard',query:{
                name:this.name
              }})
          } else {
            this.name = data.username;
            this.error = 'Have username in the system';
          }
        })
      }
    }
  }

</script>

<style scoped>
  .card {
    background-color: #fff;
    width: 22rem;
    height: 33rem;
    border-radius: 13px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: -webkit-fill-available;
    background-color: rgb(214, 240, 248);
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 1px solid #6d6868;
    margin: 0 0 24px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  input {
    height: 30px;
    text-align: center;
    border-radius: 6px;
    width: 213px;
    margin: 0 0 17px 0;
    border: none;
    outline: none;
    border: 1px solid #75bfd5;
    font-weight: bold;
  }

  button {
    border: 4px solid #f5ecec;
    height: 40px;
    width: 140px;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background-color: #75bfd5;
    border-radius: 10px;
    outline: none;
  }

  button:hover {
    background-color: #03baf1;
  }

  span {
    font-size: 12px;
    color: red;
    color: 0 0 0 0;
    margin: -6px 0 15px 0;
  }

</style>
