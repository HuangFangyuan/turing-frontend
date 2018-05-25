<template>
  <div class="outer">
    <p class="title">我参与的</p>
    <div class="task-container">
      <div class="task" v-for="(t, index) in tasks" ref = "task" @mouseenter="showDes(index)" @mouseleave="showDes(index)" @click="linkToDetail(t.id)">
        <span class= 'task-name' v-if="show[index]"> {{ t.taskName }} </span>
        <span class="task-des" v-else> {{ t.description }} </span>
      </div>
      <div></div>
    </div>
    <el-pagination class="pagination" layout="prev, pager, next" :total="pageNum"  @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  export default {
    data() {
      return {
        tasks:[],
        show:[],
        pageNum:0,
        userId:2
      }
    },
    methods: {
      showDes(index){
        this.$set(this.show, index, !this.show[index])
      },
      linkToDetail(id) {
        this.$router.push('/task-detail/' + id + '/' + 0);
      },
      getData(page) {
        this.$http.get(baseUrl + '/history/'+ this.userId + '/task',{
          params:{
            page: page
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.tasks = rep.data.data[1];
              this.pageNum = (Math.floor(rep.data.data[0] / 5) + 1) * 10;
              console.log(this.pageNum);
              this.show = new Array(this.tasks.length);
              this.show.fill(true);
            }
          })
      },
      handleCurrentChange(val) {
        getData(val - 1);
      }
    },
    mounted(){
      this.getData(0);
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .task-container {
    display: flex;
  }
</style>
