<template>
  <el-form class="form" ref="form" :model="form" label-width="110px">
    <el-form-item label="原密码">
      <el-input v-model="form.oldPass" ></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.newPass1" ></el-input>
    </el-form-item>
    <el-form-item label="再次输入新密码">
      <el-input v-model="form.newPass2" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { baseUrl } from '../util/http'
  export default {
    data() {
      return {
        form:{
          oldPass:'',
          newPass1:'',
          newPass2:''
        },
        userId:2
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      onSubmit(){
        if (this.newPass1 !== this.newPass2) {
          this.$message.success("new password is not in accordance");
        }
        else{
          let params = new URLSearchParams();
          params.append('oldpass', this.form.oldPass);
          params.append('newpass', this.form.newPass1);
          this.$http.post( baseUrl + '/password/' + this.userId)
            .then( rep => {
              if (rep.data.rspCode === '000000') {
                this.$message.success("update successfully!");
              }
            })
        }

      }
    }
  }
</script>

<style>
@import '../assets/css/common.css';
</style>
