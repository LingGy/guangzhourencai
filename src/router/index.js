import Vue from 'vue';
import Router from 'vue-router';
import Edit from '@/components/Edit/Edit';
import application from '@/components/Application/application';
import Manage from '@/components/Manage/Manage';
import Maintain from '@/components/Maintain/Maintain';
import personnelLists from '@/components/Edit/personnelLists';
import personnelInfo from '@/components/Edit/personnelInfo';
import resume from '@/components/Edit/resume';
import achieve from '@/components/Edit/achieve';
import study from '@/components/Edit/study';
import work from '@/components/Edit/work';
import jobIntention from '@/components/Edit/jobIntention';
import project from '@/components/Edit/project';
import reorganize from '@/components/Edit/reorganize';
import runningInfo from '@/components/Manage/runningInfo';
import taskManagement from '@/components/Manage/taskManagement';
import accurate from '@/components/Application/accurate';
import vague from '@/components/Application/vague';
import packetList from '@/components/Application/packetList';
import relation from '@/components/Application/relation';
import relationpic from '@/components/Application/relationpic';
import relationInfo from '@/components/Application/relationInfo';
import teamInfo from '@/components/Application/teamInfo';
import systemLog from '@/components/Maintain/systemLog';
import category from '@/components/Maintain/category';
import scoreSet from '@/components/Maintain/scoreSet';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect:'/Edit/personnelLists'
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit,
      children:[
        {
          path: '/Edit',
          redirect:'/Edit/personnelLists'
        },
        {
          path: '/Edit/personnelLists',
          name: 'personnelLists',
          component: personnelLists
        },
        {
          path: '/Edit/personnelInfo',
          name: 'personnelInfo',
          component: personnelInfo
        },
        {
          path: '/Edit/resume',
          name: 'resume',
          component: resume
        },
        {
          path: '/Edit/achieve',
          name: 'achieve',
          component: achieve
        },
        {
          path: '/Edit/study',
          name: 'study',
          component: study
        },
        {
          path: '/Edit/work',
          name: 'work',
          component: work
        },
        {
          path: '/Edit/jobIntention',
          name: 'jobIntention',
          component: jobIntention
        },
        {
          path: '/Edit/project',
          name: 'project',
          component: project
        },
        {
          path: '/Edit/reorganize',
          name: 'reorganize',
          component: reorganize
        }
      ]
    },
    {
      path: '/application',
      name: 'application',
      component: application,
      children:[
        {
          path: '/application',
          redirect:'/application/accurate'
        },
        {
          path: '/application/accurate',
          name: 'accurate',
          component: accurate
        },
        {
          path: '/application/vague',
          name: 'vague',
          component: vague
        },

        {
          path: '/application/packetList',
          name: 'packetList',
          component: packetList
        },
        {
          path: '/application/packetList/teamInfo',
          name: 'teamInfo',
          component: teamInfo
        },
        {
          path: '/application/relation',
          name: 'relation',
          component: relation
        },
        {
          path: '/application/relationpic',
          name: 'relationpic',
          component: relationpic
        },
        {
          path:'/application/relationInfo',
          name:'relationInfo',
          component:relationInfo
        }
      ]
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage,
      children:[
        {
          path: '/Manage',
          redirect:'/Manage/runningInfo'
        },
        {
          path:'/Manage/runningInfo',
          name:'runningInfo',
          component:runningInfo
        },
        {
          path:'/Manage/taskManagement',
          name:'taskManagement',
          component:taskManagement
        }
      ]
    },
    {
      path: '/Maintain',
      name: 'Maintain',
      component: Maintain,
      children:[
        {
          path: '/Maintain',
          redirect:'/Maintain/systemLog'
        },
        {
          path:'/Maintain/systemLog',
          name:'systemLog',
          component:systemLog
        },
        {
          path:'/Maintain/category',
          name:'category',
          component:category
        },
        {
          path:'/Maintain/scoreSet',
          name:'scoreSet',
          component:scoreSet
        },
      ]
    },
  ]
})
