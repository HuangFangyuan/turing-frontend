<template>
  <div class="rate-container">
    <p class="title">我的评价</p>
    <div class="block">
      <p class="title2">我的总评</p>
      <el-rate class="rate1" v-model="rate" disabled></el-rate>
    </div>
    <div style="width: 100px"></div>
    <p class="title2">历史任务评分</p>
    <ul>
      <li class="list" v-for="r in rates">
        <p class="taskName"> {{ r.taskName }}</p>
        <div style="display: flex">
          <el-rate v-model="r.rate" disabled></el-rate>
          <span class="time" style="margin-left: auto"> {{ r.time | moment }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        rate:0,
        rates:[],
        taskName:''
      }
    },
    computed:mapState(['userId']),
    methods:{
      getData() {
        this.$http.get(baseUrl + '/rate', {
          params: {
            userId: this.userId
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.rate = rep.data.data[0];
              this.rates = rep.data.data[1];
            }
          });
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .rate1 {
    width: 500px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .title2 {
    font-size: 20px;
    margin: 20px 0;
  }
  .block {
    height: 100px;
    width: 200px;
  }
  .rate1 i{
    font-size: 50px;
  }
   ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li:first-child {
    margin-top: 20px;
    border-top: 1px #e1e4e8 solid !important;
  }
  .list {
    border-bottom: 1px #e1e4e8 solid !important;
    width: 300px
  }
  .taskName {
    font-size: 20px;
    color: #0366d6;
    margin: 10px 0 15px 0;
  }
  .time {
    font-size:  12px !important;
  }
</style>
