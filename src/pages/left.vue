<template xmlns:th="http://www.w3.org/1999/xhtml">
  <aside class="aside" th:fragment="left">
    <div class="aside-inner">
      <nav class="sidebar" data-sidebar-anyclick-close="">
        <ul class="nav">
          <li class="has-user-block">
            <div>
              <div class="item user-block">
                <div class="user-block-picture">
                  <div class="user-block-status">
                    <a href="javascript:void(0);" th:onclick="'locationUrl(\'/user/'+${user.id}+'/0\',\'\');'">
                      <img alt="" class="img-thumbnail img-circle"  th:src="${user.profilePicture == null?'img/favicon.png':user.profilePicture}" id="leftProfilePicture"/></a>
                    <div class="circle circle-success circle-lg"></div>
                  </div>
                </div>
                <div class="user-block-info">
                  <div class="user-block-name" th:text="'欢迎  '+${user.userName}" id="leftUserName">欢迎 欢迎</div>
                  <div class="user-block-role" th:text="${user.introduction == null ? '暂无简介' : user.introduction.length() gt 10 ? user.introduction.substring(0,10)+'...' : user.introduction}" id="leftIntroduction">暂无简介</div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-heading ">主导航</li>
          <li class="" id="home">
            <a title="首页"  href="/index">
              <em class="icon-home"></em>
              <span>首页</span>
            </a>
          </li>
          <li class=" " id="unread">
          </li>
          <li class=" " id="addTask" >
            <a th:if="${user.role.id == 0}" title="创建任务" href="javascript:void(0);"  onclick="locationUrl('/task/add','addTask')">
              <em class="icon-wrench"></em>
              <span>创建任务</span>
            </a>
          </li>
          <li class=" " id="explore" >
            <a title="发现任务" href="javascript:void(0);" onclick="locationUrl('/task/center','explore')">
              <em class="icon-compass"></em>
              <span>发现任务</span>
            </a>
          </li>

          <li class="nav-heading ">更多</li>
          <li class=" " id="me">
            <a title="个人信息" href="javascript:void(0);"  onclick="locationUrl('/standard/my/0','me')">
              <em class="icon-folder"></em>
              <span>个人信息</span>
            </a>
          </li>
          <!--         <li class=" " id="mobile">
                     <a title="移动客户端" href="javascript:void(0);" onclick="locationUrl('/mobile','mobile')">
                        <em class="icon-screen-smartphone"></em>
                        <span>移动客户端</span>
                     </a>
                  </li> -->
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
  export default {

  }
</script>

<style>

</style>
