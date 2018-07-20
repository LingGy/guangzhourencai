import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/Edit'
    },
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
          component: resolve => require(['@/components/Edit/personnelLists'],resolve)
        },
        {
          path: '/Edit/personnelInfo',
          name: 'personnelInfo',
          component: resolve => require(['@/components/Edit/personnelInfo'],resolve)
        },
        {
          path: '/Edit/resume',
          name: 'resume',
          component: resolve => require(['@/components/Edit/resume'],resolve)
        },
        {
          path: '/Edit/achieve',
          name: 'achieve',
          component: resolve => require(['@/components/Edit/achieve'],resolve)
        },
        {
          path: '/Edit/study',
          name: 'study',
          component: resolve => require(['@/components/Edit/study'],resolve)
        },
        {
          path: '/Edit/work',
          name: 'work',
          component: resolve => require(['@/components/Edit/work'],resolve)
        },
        {
          path: '/Edit/jobIntention',
          name: 'jobIntention',
          component: resolve => require(['@/components/Edit/jobIntention'],resolve)
        },
        {
          path: '/Edit/project',
          name: 'project',
          component: resolve => require(['@/components/Edit/project'],resolve)
        },
        {
          path: '/Edit/reorganize',
          name: 'reorganize',
          component: resolve => require(['@/components/Edit/reorganize'],resolve)
        },
        {
          path: '/Edit/reorganize/rg_Info',
          name: 'rg_Info',
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
          component: resolve => require(['@/components/Edit/rg_Job'],resolve)
        },
        {
          path: '/Edit/reorganize/rg_Project',
          name: 'rg_Project',
          component: resolve => require(['@/components/Edit/rg_Project'],resolve)
        },
        {
          path: '/Edit/reorganize/rg_Resume',
          name: 'rg_Resume',
          component: resolve => require(['@/components/Edit/rg_Resume'],resolve)
        },
        {
          path: '/Edit/reorganize/rg_Study',
          name: 'rg_Study',
          component: resolve => require(['@/components/Edit/rg_Study'],resolve)
        },
        {
          path: '/Edit/reorganize/rg_Work',
          name: 'rg_Work',
          component: resolve => require(['@/components/Edit/rg_Work'],resolve)
        },
        {
          path: '/Edit/assn',
          name: 'assn',
          component: resolve => require(['@/components/Edit/assn'],resolve)
        },
        {
          path: '/Edit/assnInfo',
          name: 'assnInfo',
          component: resolve => require(['@/components/Edit/assnInfo'],resolve)
        },
        {
          path: '/Edit/thesis',
          name: 'thesis',
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
          component: resolve => require(['@/components/Application/accurate'],resolve)
        },
        {
          path: '/application/email',
          name: 'email',
          component: resolve => require(['@/components/Application/email'],resolve)
        },
        {
          path: '/application/vague',
          name: 'vague',
          component: resolve => require(['@/components/Application/vague'],resolve)
        },
        {
          path: '/application/packetList',
          name: 'packetList',
          component: resolve => require(['@/components/Application/packetList'],resolve)
        },
        {
          path: '/application/packetList/teamInfo',
          name: 'teamInfo',
          component: resolve => require(['@/components/Application/teamInfo'],resolve)
        },
        {
          path: '/application/relation',
          name: 'relation',
          component: resolve => require(['@/components/Application/relation'],resolve)
        },
        {
          path: '/application/relationpic',
          name: 'relationpic',
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
          component:resolve => require(['@/components/Manage/runningInfo'],resolve)
        },
        {
          path:'/Manage/taskManagement',
          name:'taskManagement',
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
          component:resolve => require(['@/components/Maintain/systemLog'],resolve)
        },
        {
          path:'/Maintain/category',
          name:'category',
          component:resolve => require(['@/components/Maintain/category'],resolve)
        },
        {
          path:'/Maintain/scoreSet',
          name:'scoreSet',
          component:resolve => require(['@/components/Maintain/scoreSet'],resolve)
        },
      ]
    },
  ]
})
