<template>
  <div class="login-wrap">
    <!-- 头部 -->
    <van-nav-bar title="登录"/>

    <!-- 表单 -->
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          v-validate="'required'"
          name="mobile"
          :error-message="errors.first('mobile')"
        />
        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          required
          v-validate="'required'"
          name="code"
          :error-message="errors.first('code')"
        />
      </van-cell-group>
      <div class="login-btn-box">
        <van-button
        class="login-btn"
        type="info"
        :loading="loginLoading"
        loading-text="登录中..."
        @click.prevent="handleLogin"
        >登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      loginLoading: false,
      myErrors: {
        mobile: '',
        code: ''
      }
    }
  },
  created () {
    this.configFormErrorMessages()
  },
  methods: {
    async handleLogin () {
      try {
        // 调用 JavaScript 触发验证
        const valid = await this.$validator.validate()
        // 如果校验失败，则停止后续代码执行
        if (!valid) {
          return
        }
        // 表单验证通过，发送请求，loading 加载
        this.loginLoading = true
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        // this.$router.push({
        //   name: 'home'
        // })
        // 回到之前的页面:
        // 1.简单粗暴的 back(),如果是手机App完全没问题
        // 2.使用 url 记住来源路径
        // this.$router.back()
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
      this.loginLoading = false
    },
    configFormErrorMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: '密码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn-box {
  padding: 20px;
  .login-btn {
    width: 100%;
  }
}
</style>
