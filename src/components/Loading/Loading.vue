<template>
  <div class="loading">
    <slot v-if="!show"></slot>

    <div class="loading__content" v-if="show">
      <div class="loading__gap-top"></div>
      <transition
        appear-class="img--appear"
        appear-active-class="img--appear"
        appear-to-class="img--appear-to"
        leave-from-class="img--leave-from"
        leave-active-class="img--leave-from"
        leave-to-class="img--leave-to"
        @after-leave="handleAfterLeave"
        :appear="true"
      >
        <img
          class="loading__img"
          src="/Status/loadingContent.b207a25.gif"
          alt="加载中..."
          ref="img"
          v-if="isLoading"
        />
      </transition>
      <p class="loading__title">加载中...</p>
      <div class="loading__gap-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{ isLoading: boolean }>()
const show = ref(true)

const handleAfterLeave = () => {
  show.value = false
}
watchEffect(() => {
  if (props.isLoading) {
    show.value = true
  }
})
</script>

<style scoped>
.loading {
  position: relative;
  min-height: 260px;
}

.loading__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.loading__img {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  width: 160px;
  height: 160px;
}

.loading__gap-top {
  flex: 1 0 42px;
  max-height: 130px;
}

.loading__title {
  margin-top: 12px;
}

.loading__gap-bottom {
  flex: 10 0 42px;
}

.img--appear {
  transform: translate(-200px);
}

.img--appear-to,
.img--leave-from {
  transform: translate(0px);
}

.img--leave-to {
  transform: translate(200px);
}
</style>
