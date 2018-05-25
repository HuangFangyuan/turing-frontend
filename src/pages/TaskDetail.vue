<template>
  <div>
    <p class="title">任务详情</p>
    <el-form class="form" ref="form" :model="form" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.taskName" disabled class="input-content"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="form.description" disabled></el-input>
      </el-form-item>
      <el-form-item label="任务完成进度">
        <el-progress :percentage="form.percentage" color="#8e71c7"></el-progress>
      </el-form-item>
      <el-form-item label="音频">
        <template>
          <audio :src="src" controls></audio>
        </template>
      </el-form-item>
      <el-form-item label="你的翻译">
        <el-input v-model="form.content" :disabled="editable1 !== '1'"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="editable1 !== '1'">上传</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  export default {
    data() {
      return {
        form:{
          taskName:'',
          description:'',
          percentage:0,
          comments:[],
          content:''
        },
        src:'',
        userId:2,
        editable1: this.editable
      }
    },
    props: {
      id: String,
      editable: String
    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      onSubmit(){
        let params = new URLSearchParams();
        params.append('content',this.form.content);
        params.append('userId', this.userId);
        this.$http.post( baseUrl + '/task/' + this.id + '/comment', params)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$message.success("submit successfully");
              this.editable1 = '0';
            }
          })
      },
      getData() {
        this.$http.get( baseUrl + '/task/' + this.id, {
          params:{
            userId: this.userId
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.form = rep.data.data;
              this.form.progress = this.form.currentParticipant / this.form.finishHit * 100;
              this.src = baseUrl + this.form.audioUri;
              if (this.form.comments.length > 0) {
                this.form.content = this.form.comments[0].content;
              }
            }
          })
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .form {
    margin-left: 50px;
    width:500px;
  }
  .input-content {
    color: black;
  }
</style>
