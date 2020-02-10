<template>
  <div class="container">
    <div class="card">
      <div class="grid-card">
        <div class="navbar">
          <img src="../../assets/imgs/cat.jpg" alt="">
          <p class="name">woraphon netnim</p>
        </div>
        <div class="section">
          <chatCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import chatCard from '../../components/chat'
  import socket from '../../plugins/socket.io'
  export default {
    components: {
      chatCard
    },
    data() {
      return {
        name: null
      }
    },
    created() {
      socket.emit('getuser',this.$route.query.name);
      socket.on('user', (data) => {
          if(data.status == 'N'){
            this.$router.push({ name: 'index'})
          }
      })
    },
    methods: {

    }
  }

</script>

<style scoped>
  .card {
    background-color: #fff;
    width: 97%;
    height: 33rem;
    border-radius: 13px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: -webkit-fill-available;
    background-color: rgb(214, 240, 248);
  }

  .grid-card {
    display: grid;
    grid-template-columns: 1fr 4fr
  }

  .navbar img {
    border-radius: 17;
    height: 100px;
    border-radius: 50%;
    width: 100px;
    margin: 23px 23px 5px 23px;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar P {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0 5px 0;

  }

  .section {
    background-color: #d6f0f894;
    height: 33rem;
    border-radius: 0 13px 13px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin: 22px;
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bold;
  }

</style>
