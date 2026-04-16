<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4 rtl">
    <div class="max-w-md w-full text-center p-8 bg-white rounded-3xl shadow-xl">
      <div class="mb-6">
        <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-exclamation-triangle text-4xl"></i>
        </div>
        <h1 class="text-4xl font-black text-gray-800 mb-2">{{ error?.statusCode || 500 }}</h1>
        <p class="text-gray-600 font-bold mb-4">متأسفانه خطایی در سرور رخ داده است</p>
        <p class="text-xs text-gray-400 leading-relaxed font-mono bg-gray-50 p-3 rounded-xl break-all">
          {{ error?.message || 'مشکل ناخواسته‌ای پیش آمده است' }}
        </p>
      </div>

      <button
        class="w-full py-4 text-center text-white rounded-xl bg-[#2c6767] hover:bg-[#1e4a4a] text-lg font-bold transition-all"
        @click="handleError"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
</template>
