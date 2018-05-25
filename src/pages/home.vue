<template>
  <el-container style="height: 100%;">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside width="210px" style="height: 100%;">
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>任务</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/all-task">全部任务</el-menu-item>
              <el-menu-item index="/my-task">我参与的</el-menu-item>
              <el-menu-item index="/create-task" v-show="role === 0">创建任务</el-menu-item>
              <el-menu-item index="/my-created-task"  v-show="role === 0">我创建的</el-menu-item>
              <el-menu-item index="/my-rating">我的评级</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-more"></i>
              <span>个人信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/profile">个人资料</el-menu-item>
              <el-menu-item index="/change-pass">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from './header.vue'
  import Left from './left.vue'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed:mapState(['userId', 'role']),
    components:{
      Header,
      Left
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style>
  .menu {
    height: 100%;
  }
</style>
