import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogIn from '../pages/login.vue'
import Home from '../pages/home.vue'
import AllTask from '../pages/AllTask.vue'
import TaskDetail from '../pages/TaskDetail.vue'
import MyTask from '../pages/MyTask.vue'
import CreateTask from '../pages/CreateTask.vue'
import MyCreated from '../pages/MyCreated.vue'
import MyRating from '../pages/MyRating.vue'
import Profile from '../pages/Profile.vue'
import ChangePass from '../pages/ChangPass.vue'
import TaskPerformance from '../pages/TaskPerformance.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      component:LogIn
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'/all-task',
          component:AllTask
        },
        {
          path:'/my-task',
          component:MyTask
        },
        {
          path:'/task-detail/:id/:editable',
          props:true,
          component:TaskDetail
        }
        ,
        {
          path:'/create-task',
          component:CreateTask
        }
        ,
        {
          path:'/my-created-task',
          component:MyCreated
        }
        ,
        {
          path:'/my-rating',
          component:MyRating
        }
        ,
        {
          path:'/profile',
          component:Profile
        }
        ,
        {
          path:'/change-pass',
          component:ChangePass
        }
        ,
        {
          path:'/task-performance/:id',
          props:true,
          component:TaskPerformance
        }
      ]
    }
  ]
})
