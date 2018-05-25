<template>
  <div class="outer">
    <p class="title">我的任务<span v-if="finished">（已完成）</span><span v-else>（未完成）</span></p>
    <div class="evaluate-wrapper" v-show="finished">
      <p class="evaluate-title">评估</p>
      <el-progress class="evaluate-circle" type="circle" :percentage="evaluation"></el-progress>
      <p class="evaluate-tip">评估结果由语音识别引擎自动识别的内容与参与用户的翻译内容通过文本相似度算法匹配得出，仅供参考</p>
    </div>
    <el-form class="form" ref="form" :model="form" label-width="140px">
      <el-form-item label="名称">
        <el-input v-model="form.taskName" v-if="!finished"></el-input>
        <el-input v-model="form.taskName" v-else disabled></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="form.description"  v-if="!finished"></el-input>
        <el-input v-model="form.description" v-else disabled></el-input>
      </el-form-item>
      <el-form-item label="任务需要参与人数">
        <el-input v-model="form.finishHit" disabled></el-input>
      </el-form-item>
      <el-form-item label="任务已参与人数">
        <el-input v-model="form.currentParticipant" disabled></el-input>
      </el-form-item>
      <el-form-item label="音频">
        <template>
          <audio :src="src" controls></audio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-show="!finished">更新任务信息</el-button>
      </el-form-item>
    </el-form>

    <div class="result-wrapper" style= "width:500px;">
      <p>完成情况</p>
      <p>任务完成度</p>
      <el-progress :percentage="percentage" color="#8e71c7"></el-progress>
      <ul v-for="c in form.comments">
        <li class="list">
          <p class="userName"> {{ c.userName }}</p>
          <div style="display: flex">
            <span class="content">翻译内容: {{ c.content }}</span>
            <el-rate v-model="c.rate" @change="changeRate($event, c.userId)" :disabled="c.rate !== 0" style="margin-left: auto"></el-rate>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { baseUrl } from '../util/http'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        form:{
          taskName:'',
          description:'',
          audioUri:'',
          finishHit:5,
          currentParticipant:0,
          comments:[]
        },
        percentage:0,
        finished:true,
        src:'',
        evaluation:0
      }
    },
    props: {
      id: String,
      editable: String
    },
    computed:mapState(['userId']),
    methods: {
      back(){
        this.$router.go(-1);
      },
      onSubmit(){
        let params = new URLSearchParams();
        params.append('id', this.id);
        params.append('taskName', this.form.taskName);
        params.append('userId', this.userId);
        params.append('description', this.form.description);
        this.$http.post(baseUrl + '/task/u0', params)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$message.success("update successfully!")
            }
          })
      },
      getData() {
        this.$http.get(baseUrl + '/task/'+ this.id, {
          params: {
            userId:this.userId
          }
        })
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.form = rep.data.data;
              this.percentage = this.form.currentParticipant / this.form.finishHit * 100;
              this.finished = this.percentage === 100;
              this.src = baseUrl + this.form.audioUri;
            }
          });

        this.$http.get(baseUrl + '/evaluation/'+ this.id)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.evaluation = rep.data.data;
            }
          })
      },
      changeRate(value, rateUser) {
        this.rate(value, rateUser);
      },
      rate(rate, rateUser) {
        let params = new URLSearchParams();
        params.append('rate', rate);
        params.append('userId', this.userId);
        params.append('rateUser', rateUser);
        this.$http.post(baseUrl + '/task/' + this.id + '/rate', params)
          .then( rep => {
            if (rep.data.rspCode === '000000') {
              this.$message.success("rate successfully");
            }
          });
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>
  @import "../assets/css/common.css";
  .outer {

  }
  .form {
    margin-top: 50px;
    margin-left: 20px;
    width:500px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .evaluate-wrapper {
    margin-left: 20px;
  }
  .evaluate-title {
    font-size: 20px;
  }
  .evaluate-circle {
    margin-left: 50px;
  }
  .evaluate-tip {
    margin-top: 10px;
    min-height: 17px;
    font-size: 12px;
    color: #586069;
  }
  .result-wrapper {
    margin-left: 20px;
  }
  li:first-child {
    margin-top: 20px;
    border-top: 1px #e1e4e8 solid !important;
  }
  .list {
    border-bottom: 1px #e1e4e8 solid !important;
  }
  .userName {
    font-size: 20px;
    color: #0366d6;
  }
  .content {
    font-size:  12px !important;
  }
</style>
