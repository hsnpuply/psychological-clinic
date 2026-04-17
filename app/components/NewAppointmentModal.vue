<template>
  <UCard class="rtl" :ui="{ rounded: 'rounded-[2rem]' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          ثبت نوبت جدید
        </h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('close')" />
      </div>
    </template>
    
    <div class="p-4 text-center text-gray-500">
      <UIcon name="i-heroicons-wrench-screwdriver" class="w-12 h-12 mx-auto mb-4 text-[#2c6767]" />
      <p>فرم ثبت نوبت در حال توسعه است...</p>
    </div>
  </UCard>
</template>
