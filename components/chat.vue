<template>
  <div class="card-chat">
    <div class="head">
      <div class="flex-head">
        <div class="name-join">
          Chat Group
        </div>
      </div>

    </div>
    <div class="detail">
      <div class="detail-item">
        <div class="msger-chat">
          <!-- <div v-for="(msg, index) in messages" :key="index">
            <p>{{ `${msg.message}   ${msg.name}`}}</p>
          </div> -->
          <div :class="msg.name==name?'msger chat-right':'msger chat-left'" v-for="(msg, index) in messages" :key="index">
            <div class="msg-img">
              <img :src="require(`@/assets/imgs/${msg.img}`)" alt="">
            </div>
            <div class="msger-box">
              <div class="msger-label">
                <div class="msger-title">{{msg.name}}</div>
                <div class="msger-time">{{msg.dateTime}}</div>
              </div>
              <div class="msger-text">
                {{msg.message}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-item input-message">
        <input autocomplete="off" v-model="message" placeholder="Enter your message..." @keyup.enter="sendMessage"/>
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
        name:this.$route.query.name,
        img:this.$route.query.img,
      }
    },
    mounted() {
      socket.on('sendMessage', (msg) => {
        this.messages.push(msg)
      })
    },
    updated() {
      this.scrollToEmd();
    },
    methods: {
      sendMessage() {
        socket.emit('sendMessage',{message :this.message,name:this.name,img:this.img,dateTime:this.dateNowFomat()} )
        this.message = ''
      },
      dateNowFomat(){
        var today = new Date();
        var Hours = today.getHours();
        var Minutes = today.getMinutes();
        today = `${Hours}:${Minutes}`;
        return today;
      },
      scrollToEmd() {
          var container = this.$el.querySelector(".msger-chat");
          container.scrollTop = container.scrollHeight;
      }
    },
    watch: {
      messages(val){
        console.log("messages :",val);
        
      }
    },
  }

</script>
<style>
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
    height: 40px;
    border-bottom: 1px solid #e3e5ea;
  }

  .flex-head {
    display: flex;
    flex-direction: row;
    padding: 8px 34px;
    align-items: center
  }

  .msg-img img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin: 0px 5px;
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
  /* chat */
  .msger-chat {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0 0 0;
    height: 349px;
  }
  .msger-chat::-webkit-scrollbar {
    width: 6px;
  }
  .msger-chat::-webkit-scrollbar-track {
    background: #ddd;
  }
  .msger-chat::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }
  .msger{
    display: flex;
    margin: 0 0 10px 0;
  }
  .msger-label{
    justify-content: space-between;
    display: flex;
    margin: 0 0 5px 0;
  }
  .msger-box{
    padding: 10px;
    background-color: #ececec;
    max-width: 253px;
  }
  .msger-title{
    font-size: 14px;
    font-weight: bold;
    margin: 0 20px 0 0;
  }
  .msger-time{
    font-size: 11px;
  }
  .msger-text{
    font-size: 12px;
    word-wrap: break-word;
  }
   .chat-left{
    flex-direction: row;
  }
  .chat-right{
    flex-direction: row-reverse;
  }
  .chat-left .msger-box{
      border-bottom-right-radius: 11px;
      border-bottom-left-radius: 11px;
      border-top-right-radius: 11px;
  }
  .chat-right .msger-box{
      background-color: #579ffb;
      color: #fff;
      border-bottom-right-radius: 11px;
      border-bottom-left-radius: 11px;
      border-top-left-radius: 11px;
  }
</style>
