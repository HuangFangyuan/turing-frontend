<template>
  <div>
    <h4 class="title">个人资料</h4>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="name">
        <el-input v-model="ruleForm.role.name" disabled class="role"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="apply4Admin" v-show="ruleForm.role.name !== 'SysAdmin'">成为管理员</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {
        ruleForm:{
          name:'',
          email:'tiangou@dog.com',
          roleName:'管理员',
        },
      }
    },
    computed:mapState(['userId']),
    methods:{
      back(){
        this.$router.go(-1);
      },
      submitForm(){
        let params = new URLSearchParams();
        params.append('description', this.ruleForm.description);
        this.$http.post( baseUrl + '/user/u0/' + this.userId, params)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$message.success('update successfully!');
              this.getData();
            }
          });
      },
      getData() {
        this.$http.get( baseUrl + '/user/' + this.userId)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.ruleForm = rep.data.data;
            }
          });
      },
      apply4Admin(){
        this.$http.post( baseUrl + '/admin/' + this.userId)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$message.success('apply successfully!');
            }
          });
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style>
  @import "../assets/css/common.css";
  .form {

  }
  .role:after {
    content: "若您当前已是管理员，则无法再次申请";
  }
</style>
