<template>
  <router-view />
  <page-footer v-if="isShowFooterRef" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'

const routeWitchNeedNav = [ '/', '/home', '/statistics', '/user' ]

const route = useRoute()
const isShowFooterRef = ref(true)

watch(() => route.path, path => {
  isShowFooterRef.value = routeWitchNeedNav.includes(path)
})
</script>

<style scoped lang="scss">

</style>
