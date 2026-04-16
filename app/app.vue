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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<style>
body {
  font-family: 'Vazirmatn', sans-serif;
  direction: rtl;
}
</style>
