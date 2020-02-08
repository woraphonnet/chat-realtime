<template>
  <div class="card-chat">
    <div class="head">
      <div class="flex-head">
        <img src="../assets/imgs/cat.jpg" alt="">
        <div class="name-join">
          test
        </div>
        <div class="status" style="font-size: 7px;">
          ⚪
        </div>
      </div>

    </div>
    <div class="detail">
      <div class="detail-item">
        <div class="message-list" v-for="(msg, index) in messages" :key="index">
          {{ msg }}
        </div>
      </div>
      <div class="detail-item input-message">
        <input autocomplete="off" v-model="message" placeholder="Send a message here" @keyup.enter="sendMessage"/>
        <button class="btn" type="button" @click="sendMessage"><img src="../assets/imgs/send_notification_334641.png" alt="" width="25"></button>
      </div>
    </div>
  </div>
</template>
<script>
  import socket from '../plugins/socket.io'
  export default {
    data() {
      return {
        message: '',
        messages: [],
      }
    },
    mounted() {
      socket.on('sendMessage', (msg) => {
        this.messages.push(msg)
      })
    },
    methods: {
      sendMessage() {
        socket.emit('sendMessage', this.message)
        this.message = ''
      }
    }
  }

</script>
<style>
  .form {}

  /* input {
    border: 0;
    padding: 10px;
    width: 90%;
    margin-right: .5%;
  } */

  /* .btn {
    width: 9%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
  } */

  .message {
    margin-left: 50px;
  }

  .card-chat {
    background-color: #fff;
    width: 90%;
    height: 90%;
    border-radius: 4px;
  }

  .card-chat .head {
    background-color: #f7f8fb;
    height: 66px;
    border-bottom: 1px solid #e3e5ea;
  }

  .flex-head {
    display: flex;
    flex-direction: row;
    padding: 8px 34px;
    align-items: center
  }

  .flex-head img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .name-join {
    font-size: 19px;
    margin: 0 9px 0 15px;
    font-weight: bold;
  }

  .detail {
    height: 85%;
    background-color: #fff;
    display: grid;
    grid-template-rows: 8fr 1fr;
    padding: 0 30px 12px 30px;
  }

  .input-message{
    display: grid;
    grid-template-columns: 8fr 1fr;
  }

  .input-message input{
   border: none;
    font-size: 16px;
    border-top: 1px solid #e3e5ea;
    padding: 0 0 0 45px;
     outline: none;
  }
.input-message button{
    background-color: white;
    border: none;
    border-top: 1px solid #e3e5ea;
     outline: none;
  }

  .input-message button:hover{
    background-color: #f4f1f1;
  }

</style>
