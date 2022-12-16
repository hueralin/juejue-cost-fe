<template>
  <van-popup v-model:show="localShow" :style="{ height: '66%' }" position="bottom" closeable>

  </van-popup>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import { apiGetBillTypeList } from '@/api/bill'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits([ 'change' ])

const localShow = useVModel(props, 'show', emit)

const handleGetBillTypeList = async() => {
  const { code, data } = await apiGetBillTypeList()
  if (code === 0) {
    console.log('data: ', data)
  }
}

onBeforeMount(() => {
  handleGetBillTypeList()
})
</script>

<style scoped lang="scss">

</style>
