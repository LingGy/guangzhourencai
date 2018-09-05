import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/Edit/personnelLists',
    },
    {
      path:'/login',
      name:'login',
      component: resolve => require(['@/components/login'],resolve),
    },
    {
      path: '/myheader',
      name:'myheader',
      component: resolve => require(['@/components/Header/myheader'],resolve),
      children:[
        {
          path: '/Edit',
          name: 'Edit',
          component: resolve => require(['@/components/Edit/Edit'],resolve),
          children:[
            {
              path: '/Edit',
              redirect:'/Edit/personnelLists'
            },
            {
              path: '/Edit/personnelLists',
              name: 'personnelLists',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/personnelLists'],resolve)
            },
            {
              path: '/Edit/personnelInfo',
              name: 'personnelInfo',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/personnelInfo'],resolve)
            },
            {
              path: '/Edit/resume',
              name: 'resume',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/resume'],resolve)
            },
            {
              path: '/Edit/achieve',
              name: 'achieve',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/achieve'],resolve)
            },
            {
              path: '/Edit/study',
              name: 'study',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/study'],resolve)
            },
            {
              path: '/Edit/work',
              name: 'work',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/work'],resolve)
            },
            {
              path: '/Edit/jobIntention',
              name: 'jobIntention',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/jobIntention'],resolve)
            },
            {
              path: '/Edit/project',
              name: 'project',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/project'],resolve)
            },
            {
              path: '/Edit/reorganize',
              name: 'reorganize',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/reorganize'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Info',
              name: 'rg_Info',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Info'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Achieve',
              name: 'rg_Achieve',
              component: resolve => require(['@/components/Edit/rg_Achieve'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Job',
              name: 'rg_Job',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Job'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Project',
              name: 'rg_Project',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Project'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Resume',
              name: 'rg_Resume',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Resume'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Study',
              name: 'rg_Study',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Study'],resolve)
            },
            {
              path: '/Edit/reorganize/rg_Work',
              name: 'rg_Work',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/rg_Work'],resolve)
            },
            {
              path: '/Edit/assn',
              name: 'assn',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/assn'],resolve)
            },
            {
              path: '/Edit/assnInfo',
              name: 'assnInfo',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/assnInfo'],resolve)
            },
            {
              path: '/Edit/thesis',
              name: 'thesis',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Edit/thesis'],resolve)
            },
          ]
        },
        {
          path: '/application',
          name: 'application',
          component: resolve => require(['@/components/Application/application'],resolve),
          children:[
            {
              path: '/application',
              redirect:'/application/accurate'
            },
            {
              path: '/application/accurate',
              name: 'accurate',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/accurate'],resolve)
            },
            {
              path: '/application/email',
              name: 'email',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/email'],resolve)
            },
            {
              path: '/application/vague',
              name: 'vague',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/vague'],resolve)
            },
            {
              path: '/application/packetList',
              name: 'packetList',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/packetList'],resolve)
            },
            {
              path: '/application/packetList/teamInfo',
              name: 'teamInfo',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/teamInfo'],resolve)
            },
            {
              path: '/application/relation',
              name: 'relation',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/relation'],resolve)
            },
            {
              path: '/application/relationpic',
              name: 'relationpic',
              meta: { requiresAuth: true },
              component: resolve => require(['@/components/Application/relationpic'],resolve)
            },
            {
              path:'/application/relationInfo',
              name:'relationInfo',
              component:resolve => require(['@/components/Application/relationInfo'],resolve)
            }
          ]
        },
        {
          path: '/Manage',
          name: 'Manage',
          component: resolve => require(['@/components/Manage/Manage'],resolve),
          children:[
            {
              path: '/Manage',
              redirect:'/Manage/runningInfo'
            },
            {
              path:'/Manage/runningInfo',
              name:'runningInfo',
              meta: { requiresAuth: true },
              component:resolve => require(['@/components/Manage/runningInfo'],resolve)
            },
            {
              path:'/Manage/taskManagement',
              name:'taskManagement',
              meta: { requiresAuth: true },
              component:resolve => require(['@/components/Manage/taskManagement'],resolve)
            }
          ]
        },
        {
          path: '/Maintain',
          name: 'Maintain',
          component: resolve => require(['@/components/Maintain/Maintain'],resolve),
          children:[
            {
              path: '/Maintain',
              redirect:'/Maintain/systemLog'
            },
            {
              path:'/Maintain/systemLog',
              name:'systemLog',
              meta: { requiresAuth: true },
              component:resolve => require(['@/components/Maintain/systemLog'],resolve)
            },
            {
              path:'/Maintain/category',
              name:'category',
              meta: { requiresAuth: true },
              component:resolve => require(['@/components/Maintain/category'],resolve)
            },
          ]
        },
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['@/components/error/error'],resolve),
    }
  ]
})
