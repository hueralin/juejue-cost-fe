<template>
  <van-tabbar v-model="activeKeyRef">
    <van-tabbar-item icon="notes-o" to="/home" name="home">账单</van-tabbar-item>
    <van-tabbar-item icon="bar-chart-o" to="/statistics" name="statistics">统计</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKeyRef = ref('home')
</script>

<style scoped>

</style>