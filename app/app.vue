<script setup>
useHead({
  htmlAttrs: {
    dir: 'rtl',
    class: 'rtl'
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#2c6767" :height="4" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :ui="{ position: 'top-0 bottom-auto' }" />
  </div>
</template>

<style>
body {
  font-family: 'Vazirmatn', sans-serif;
  direction: rtl;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(5px);
}
</style>
