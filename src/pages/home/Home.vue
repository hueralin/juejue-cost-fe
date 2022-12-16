<template>
  <div class="home">
    <header>
      <div class="expense">
        <span>总支出：</span>
        <b>￥520</b>
      </div>
      <div class="income">
        <span>总收入：</span>
        <b>￥1314</b>
      </div>
      <div class="filter">
        <div @click="isShowBillTypePopup = true">全部类型</div>
        <div></div>
      </div>
    </header>
    <main></main>
    <!-- 类型 -->
    <bill-type-popup v-model:show="isShowBillTypePopup" v-model:value="selectedTypeIdRef" />
    <!-- 日期 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BillTypePopup from '@/components/BillTypePopup.vue'

const isShowBillTypePopup = ref(false)
const selectedTypeIdRef = ref(0)
</script>

<style scoped lang="scss">
.home {
  header {
    height: 85px;
    color: $color-white;
    padding: $padding-large;
    background-color: $color-primary;

    .expense, .income {
      font-size: $font-size-small;

      b {
        font-size: $font-size-large;
      }
    }
  }
}
</style>
