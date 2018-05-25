<template>
  <div>
    <p class="title">创建任务</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm form">
      <el-form-item label="活动名称" prop="taskName">
        <el-input v-model="ruleForm.taskName"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="description">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
      <el-form-item label="需要人数" prop="finishHit">
        <el-input v-model="ruleForm.finishHit"></el-input>
      </el-form-item>
      <el-form-item label="预设定翻译内容(可选)" prop="ownerDefTxt">
        <el-input v-model="ruleForm.ownerDefTxt"></el-input>
      </el-form-item>
      <el-form-item label="音频文件" prop="name">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :on-change="handleChange"
          :file-list="ruleForm.audios"
          :on-success = "handleSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过10MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
       actionUrl:baseUrl + '/audio',
       ruleForm:{
         taskName:'',
         description:'',
         ownerDefTxt:'',
         finishHit:null,
         ownerId:2,
         audios:[],
         audioUri:''
       },
       rules:{}
     }
   },
   methods: {
     back() {
       this.$router.go(-1);
     },
     submitForm() {
       let params = new URLSearchParams();
       params.append('taskName', this.ruleForm.taskName);
       params.append('description', this.ruleForm.description);
       params.append('ownerId', this.ruleForm.ownerId);
       params.append('finishHit', this.ruleForm.finishHit);
       params.append('ownerDefTxt', this.ruleForm.ownerDefTxt);
       params.append('audioUri', this.ruleForm.audioUri);
       this.$http.post(baseUrl + '/task', params)
         .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$router.push('/task-performance/' + rep.data.data);
            }
         });
     },
     handleSuccess(response, file, fileList) {
        this.ruleForm.audioUri = response.data;
        console.log(this.ruleForm.audioUri);

     }
   }
 }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .form {
    margin-top: 50px;
    width: 500px;
  }
</style>
