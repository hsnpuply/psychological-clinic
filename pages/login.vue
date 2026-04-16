<script setup lang="ts">
definePageMeta({
  layout: false
})

const mobile = ref('');
const error = ref('');

const onSubmit = async () => {
  if (!/^09\d{9}$/.test(mobile.value)) {
    error.value = 'شماره موبایل معتبر نیست';
    return;
  }
  // await authStore.login(mobile.value);
  navigateTo('/');
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-row rtl bg-[#fbf9f5]">
    <!-- Left Side: Serene Visual -->
    <section class="hidden lg:flex w-1/2 relative overflow-hidden">
      <img
        src="https://picsum.photos/seed/therapy/1920/1080"
        class="absolute inset-0 w-full h-full object-cover"
        alt="Serene Office"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#2c6767]/30 to-transparent"></div>
      <div class="absolute bottom-16 right-16 left-16 p-12 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl">
        <div class="space-y-6">
          <span class="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase">
            The Digital Sanctuary
          </span>
          <h1 class="text-4xl md:text-5xl font-black text-[#2c6767] leading-tight">
            مسیر آرامش شما <br /> از اینجا آغاز می‌شود
          </h1>
          <p class="text-gray-600 text-lg leading-relaxed max-w-md">
            به فضای امن و تخصصی کلینیک روانشناسی امید باران خوش آمدید. ما در کنار شما هستیم تا با هم به سوی خودشناسی و سلامت روان گام برداریم.
          </p>
        </div>
      </div>
    </section>

    <!-- Right Side: Login Card -->
    <section class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
      <div class="w-full max-w-md relative z-10">
        <div class="mb-16 text-right">
          <div class="flex items-center justify-end gap-3 mb-6">
            <span class="text-3xl font-black text-[#2c6767] tracking-tighter">امید باران</span>
            <div class="w-12 h-12 bg-[#2c6767] rounded-xl flex items-center justify-center shadow-lg shadow-[#2c6767]/20">
              <UIcon name="i-heroicons-academic-cap" class="text-white text-2xl" />
            </div>
          </div>
          <h2 class="text-2xl font-black text-gray-800 mb-2">خوش آمدید</h2>
          <p class="text-gray-500 font-medium">لطفاً برای ورود به پنل کاربری، شماره موبایل خود را وارد کنید.</p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-8">
          <UFormGroup label="شماره موبایل" :error="error" :ui="{ label: { base: 'font-bold text-gray-500 mb-3 px-1' } }">
            <UInput
              v-model="mobile"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              size="xl"
              class="text-left"
              dir="ltr"
              icon="i-heroicons-phone"
              :ui="{ rounded: 'rounded-xl' }"
            />
            <template #help>
              <p class="mt-3 text-[10px] text-gray-400 font-bold px-1">کد تأیید به این شماره پیامک خواهد شد.</p>
            </template>
          </UFormGroup>

          <UButton
            type="submit"
            block
            label="ورود"
            size="xl"
            class="font-black text-lg h-14 bg-[#2c6767] hover:bg-[#1e4a4a] rounded-xl shadow-lg shadow-[#2c6767]/20"
            trailing-icon="i-heroicons-arrow-left"
          />
        </form>

        <div class="mt-12 text-center space-y-6">
          <div class="flex items-center justify-center gap-4">
            <div class="h-px flex-1 bg-gray-100"></div>
            <span class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">یا</span>
            <div class="h-px flex-1 bg-gray-100"></div>
          </div>
          <UButton variant="ghost" color="gray" label="ایجاد حساب جدید" class="font-bold" />
          <div class="pt-8">
            <p class="text-[10px] text-gray-400 font-bold flex items-center justify-center gap-2">
              <UIcon name="i-heroicons-lock-closed" class="text-xs" />
              تمامی اطلاعات شما در امنیت کامل محفوظ است
            </p>
          </div>
        </div>
      </div>

      <div class="absolute top-8 right-8">
        <UButton variant="ghost" color="gray" icon="i-heroicons-home" label="بازگشت به سایت" />
      </div>
    </section>
  </div>
</template>
