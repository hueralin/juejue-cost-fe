<template>
  <van-popup v-model:show="localShow" :style="{ height: '66%' }" position="bottom">
    <div class="bill-type-popup">
      <header>请选择类型</header>
      <main>
        <div
          class="all-type"
          :class="{ active: localValue === 0 }"
          @click="onClick(0)"
        >全部类型</div>
        <div class="title">支出</div>
        <div class="type-item-container">
          <div
            class="type-item"
            :class="{ active: localValue === item.id }"
            v-for="item in expenseTagsRef"
            :key="item.id"
            @click="onClick(item.id)"
          >{{ item.name }}</div>
        </div>
        <div class="title">收入</div>
        <div class="type-item-container">
          <div
            class="type-item"
            :class="{ active: localValue === item.id }"
            v-for="item in incomeTagsRef"
            :key="item.id"
            @click="onClick(item.id)"
          >{{ item.name }}</div>
        </div>
      </main>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { apiGetBillTypeList, BillTypeItem } from '@/api/bill'

const props = defineProps({
  show: { type: Boolean, default: false },
  value: { type: Number, default: 0 }
})

const emit = defineEmits([ 'update:show', 'update:value' ])

const localShow = useVModel(props, 'show', emit)
const localValue = useVModel(props, 'value', emit)
const expenseTagsRef = ref<BillTypeItem[]>([])
const incomeTagsRef = ref<BillTypeItem[]>([])

const onClick = (id: number) => {
  emit('update:value', id)
  emit('update:show', false)
}

const handleGetBillTypeList = async() => {
  const { code, data } = await apiGetBillTypeList()
  if (code === 0) {
    data.list.forEach(item => {
      if (item.type === 1) {
        expenseTagsRef.value.push(item)
      } else if (item.type === 2) {
        incomeTagsRef.value.push(item)
      }
    })
  }
}

onBeforeMount(() => {
  handleGetBillTypeList()
})
</script>

<style scoped lang="scss">
.bill-type-popup {
  height: 100%;
  background-color: $color-gray;

  header {
    box-sizing: border-box;
    height: 50px;
    text-align: center;
    padding: $padding-large;
  }

  main {
    box-sizing: border-box;
    height: calc(100% - 60px);
    overflow-y: auto;
    padding: $padding-large;

    .title {
      font-size: $font-size-normal;
      margin-bottom: $spacing-small;
    }

    .type-item-container {
      display: flex;
      flex-wrap: wrap;

      .type-item {
        flex-basis: 29%;
      }
    }

    .type-item, .all-type {
      line-height: 40px;
      text-align: center;
      font-size: $font-size-normal;
      padding: $spacing-small;
      margin-right: $spacing-small;
      margin-bottom: $spacing-small;
      background-color: $color-white;

      &.active {
        color: $color-white;
        background-color: $color-primary;
      }
    }

    .all-type {
      width: 29%;
    }
  }
}
</style>
