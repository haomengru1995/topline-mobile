// 校验登录状态
import store from '@/store'
import { Dialog } from 'vant'
import router from '@/router'
export default () => {
  const { user } = store.state

  if (user) {
    return true
  }
  // 如果没有登录，提示该操作需要登录
  Dialog.confirm({
    title: '操作提示',
    message: '该操作需要登录，是否登录？'
  }).then(() => {
    // 用户点击了确定，跳转到登录页
    router.push({
      name: 'login',
      query: {
        // router.currentRoute 用于非组件模块中获取当前路由对象
        redirect: router.currentRoute.fullPath
      }
    })
    // 登录成功，返回之前的页面
  }).catch(() => {
  })
}
