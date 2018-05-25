<template>
  <div>
    <p class="title">我创建的</p>
    <p class="c-title">已完成</p>
    <div class="task-container">
      <div class="task" v-for="(t, index) in completedTasks" @mouseenter="showDes1(index, 1)" @mouseleave="showDes1(index)" @click="linkToDetail(t.id)">
        <span class= 'task-name' v-if="show1[index]"> {{ t.taskName }} </span>
        <span class="task-des" v-else> {{ t.description }} </span>
      </div>
      <div></div>
    </div>
    <p class="u-title">未完成</p>
    <div class="task-container">
      <div class="task" v-for="(t, index) in uncompletedTasks" @mouseenter="showDes2(index)" @mouseleave="showDes2(index)" @click="linkToDetail(t.id)">
        <span class= 'task-name' v-if="show2[index]"> {{ t.taskName }} </span>
        <span class="task-des" v-else> {{ t.description }} </span>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  export default {
    data() {
      return {
        completedTasks:[],
        uncompletedTasks:[],
        show1:[],
        show2:[],
        userId:2
      }
    },
    methods: {
      showDes1(index){
        this.$set(this.show1, index, !this.show1[index])
      },
      showDes2(index){
        this.$set(this.show2, index, !this.show2[index])
      },
      linkToDetail(id) {
        this.$router.push('/task-performance/' + id);
      },
      getData() {
        this.$http.get(baseUrl + '/task/u0',{
          params:{
            userId:this.userId
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.completedTasks = rep.data.data;
              this.show1 = new Array(this.completedTasks.length);
              this.show1.fill(true);
            }
          });

        this.$http.get(baseUrl + '/task/u1',{
          params:{
            userId:this.userId
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.uncompletedTasks = rep.data.data;
              this.show2 = new Array(this.uncompletedTasks.length);
              this.show2.fill(true);
            }
          })
      },
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .c-title, .u-title{
    margin-top: 30px;
    font-size: 20px;
  }
</style>
