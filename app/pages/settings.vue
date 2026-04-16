<script setup lang="ts">
const { data: initialSettings, refresh } = await useFetch('/api/settings')

const settings = ref({
  clinicName: '',
  address: '',
  phone: '',
  email: '',
  workingHours: '',
  notifications: true
})

// Initialize form
watchEffect(() => {
  if (initialSettings.value) {
    settings.value = { ...initialSettings.value }
  }
})

const saving = ref(false)
const toast = useToast()

const saveSettings = async () => {
  saving.value = true
  try {
    const { data, error } = await useFetch('/api/settings', {
      method: 'POST',
      body: settings.value
    })
    
    if (error.value) throw error.value
    
    toast.add({
      title: 'تنظیمات با موفقیت ذخیره شد',
      icon: 'i-heroicons-check-circle',
      color: 'green'
    })
    await refresh()
  } catch (err) {
    toast.add({
      title: 'خطا در ذخیره تنظیمات',
      description: 'لطفاً دوباره تلاش کنید',
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header>
      <h1 class="text-2xl font-black text-gray-800">تنظیمات کلینیک</h1>
      <p class="text-sm text-gray-500">مدیریت اطلاعات پایه و پیکربندی سیستم</p>
    </header>

    <UCard :ui="{ rounded: 'rounded-2xl', body: { padding: 'p-8' } }">
      <form @submit.prevent="saveSettings" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="نام کلینیک" required>
            <UInput v-model="settings.clinicName" placeholder="نام کلینیک را وارد کنید" size="lg" />
          </UFormGroup>

          <UFormGroup label="شماره تماس" required>
            <UInput v-model="settings.phone" dir="ltr" placeholder="۰۲۱-XXXXXXXX" size="lg" />
          </UFormGroup>

          <UFormGroup label="ایمیل کلینیک" required class="md:col-span-2">
            <UInput v-model="settings.email" type="email" dir="ltr" placeholder="info@example.com" size="lg" />
          </UFormGroup>

          <UFormGroup label="ساعات کاری" required>
            <UInput v-model="settings.workingHours" placeholder="مثلاً: ۸ صبح الی ۸ شب" size="lg" />
          </UFormGroup>

          <UFormGroup label="آدرس کلینیک" required class="md:col-span-2">
            <UTextarea v-model="settings.address" placeholder="آدرس دقیق کلینیک را وارد کنید" :rows="3" size="lg" />
          </UFormGroup>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <UFormGroup label="اعلان‌ها">
            <div class="flex items-center gap-3 mt-2">
              <UToggle v-model="settings.notifications" />
              <span class="text-sm text-gray-600">فعال‌سازی سیستم اعلان‌های خودکار برای نوبت‌ها</span>
            </div>
          </UFormGroup>
        </div>

        <div class="pt-6 flex justify-end">
          <UButton
            type="submit"
            size="xl"
            class="px-10 rounded-xl bg-[#2c6767] hover:bg-[#1e4a4a]"
            :loading="saving"
            label="ذخیره تغییرات"
          />
        </div>
      </form>
    </UCard>
  </div>
</template>
