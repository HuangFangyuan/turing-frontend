<template>
  <div class="wrapper">
    <div class="block-center mt-xl wd-xl">
      <div class="panel panel-dark panel-flat">
        <div class="panel-heading text-center">
          <h2>众包翻译平台</h2>
        </div>
        <div class="panel-body" id="loginPage">
          <p class="text-center pv">请登录</p>
          <form id="form" data-parsley-validate="true" onsubmit="return false">
            <div class="form-group has-feedback">
              <input placeholder="邮箱地址或登录名称" v-model="email" class="form-control" data-parsley-error-message="请输入邮箱地址或登录名称" required />
              <span class="fa fa-envelope form-control-feedback text-muted"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="password" placeholder="密码" v-model="password" class="form-control" data-parsley-error-message="请输入密码" required />
              <span class="fa fa-lock form-control-feedback text-muted"></span>
            </div>
            <div class="clearfix">
              <div class="pull-right">
                <router-link to="/signin"> <a class="text-muted">忘记密码？</a></router-link>
              </div>
            </div>
            <button @click="login" class="btn btn-block btn-primary mt-lg">登录</button>
          </form>
          <p></p>
          <div id="errorMsg" class="alert alert-danger text-center" style="display:none;"></div>
          <p class="pt-lg text-center">需要注册？</p>
          <a class="btn btn-block btn-default">现在就注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods:{
      login(){
        let params = new URLSearchParams();
        params.append('email', this.email);
        params.append('password', this.password);
        this.$http.post( baseUrl + '/login',params)
          .then( rep =>{
            if(rep.data.rspCode === '000000'){
              this.$store.commit("SET_LOG_FLAG", true);
              this.$store.commit("SET_USER_ID", rep.data.data.id);
              this.$store.commit("SET_USER_ROLE", rep.data.data.role.id);
              this.$router.push('/home');
            }else{
              this.$message.error("log in failed")
            }
          })
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 500px;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>
