<template>
  <div style="padding: 16px;">
    <van-tabs v-model:active="activeKeyRef">
      <van-tab title="登录"></van-tab>
      <van-tab title="注册"></van-tab>
    </van-tabs>
    <van-form>
      <van-cell-group>
        <van-field
          v-model="usernameRef"
          label="用户名"
          name="username"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="passwordRef"
          type="password"
          label="密码"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-field
          v-if="activeKeyRef === 1"
          v-model="passwordConfirmRef"
          type="password"
          label="确认密码"
          name="password"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
      </van-cell-group>
      <div style="margin-top: 16px;">
        <van-button v-if="activeKeyRef === 0" style="width: 100%;" type="primary" native-type="submit" @click="login">登录</van-button>
        <van-button v-else style="width: 100%;" type="primary" native-type="submit" @click="register">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import {apiLogin, apiRegister} from '@/api/login'
import { useLocalStorage } from '@vueuse/core'

const router = useRouter()
const activeKeyRef = ref(0)
const usernameRef = ref('')
const passwordRef = ref('')
const passwordConfirmRef = ref('')

const login = async() => {
  showLoadingToast({ message: '登录中...' })
  const { code, msg, data } = await apiLogin({
    username: usernameRef.value,
    password: passwordRef.value
  })

  if (code === 0) {
    showSuccessToast({ message: '登录成功' })
    const tokenRef = useLocalStorage('token', '')
    tokenRef.value = data.token
    // 登录成功，回到首页
    await router.replace('/home')
  } else {
    showFailToast({ message: msg })
  }
}

const register = async() => {
  showLoadingToast({ message: '注册中...' })
  const { code, msg } = await apiRegister({
    username: usernameRef.value,
    password: passwordRef.value
  })

  if (code === 0) {
    // 切回到 登录 Tab
    activeKeyRef.value = 0
    showSuccessToast({ message: '注册成功' })
  } else {
    showFailToast({ message: msg })
  }
}
</script>

<style scoped lang="sass">

</style>