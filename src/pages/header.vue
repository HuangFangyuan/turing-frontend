<template xmlns:th="http://www.w3.org/1999/xhtml">
  <header class="topnavbar-wrapper" th:fragment="header">
    <nav class="navbar topnavbar" role="navigation">
      <div class="navbar-header" style="margin-top: 8px">
        <div >
          <h4>
            <span style="color: #9c9c9c; text-align:center">个人中心</span>
          </h4>
        </div>
      </div>
      <div class="nav-wrapper">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a title="退出" data-no-persist="true" data-toggle-state="offsidebar-open" href="javascript:void(0);">
              <img class="img-responsive" alt="App Logo" src="../assets/img/logout.png" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {

  }
</script>

<style>
  header {
    background-color: #545c64;
  }
</style>
