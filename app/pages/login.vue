<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({
  layout: false
})

const { fetch: refreshSession } = useUserSession()
const toast = useToast()

const schema = yup.object({
  phone: yup.string()
    .required('شماره تماس الزامی است')
    .matches(/^09\d{9}$/, 'شماره تماس معتبر نیست (مثلاً: 09123456789)')
})

const { handleSubmit, isSubmitting, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    phone: ''
  }
})

const [phone, phoneProps] = defineField('phone')

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: values
    })
    await refreshSession()
    toast.add({
      title: 'خوش آمدید',
      description: 'ورود با موفقیت انجام شد',
      color: 'green'
    })
    await navigateTo('/')
  } catch (err: any) {
    toast.add({
      title: 'خطا در ورود',
      description: err.data?.statusMessage || 'مشکلی پیش آمده است',
      color: 'red'
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4 rtl">
    <div class="max-w-md w-full">
      <div class="text-center mb-10">
        <div class="w-20 h-20 bg-[#2c6767] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#2c6767]/30 transform rotate-12">
          <UIcon name="i-heroicons-academic-cap" class="text-white text-4xl -rotate-12" />
        </div>
        <h1 class="text-3xl font-black text-gray-800 mb-2">کلینیک امید باران</h1>
        <p class="text-gray-500 font-medium">پنل مدیریت هوشمند سلامت روان</p>
      </div>

      <UCard class="p-4" :ui="{ rounded: 'rounded-3xl', shadow: 'shadow-xl border-0' }">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <UFormGroup
            label="شماره همراه"
            help="جهت ورود از شماره همراه ثبت شده استفاده کنید"
            :error="errors.phone"
          >
            <UInput
              v-model="phone"
              size="xl"
              placeholder="09123456789"
              icon="i-heroicons-phone"
              :loading="isSubmitting"
              class="font-mono rtl-input"
              @blur="phoneProps.onBlur"
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            size="xl"
            class="rounded-xl bg-[#2c6767] hover:bg-[#1e4a4a] transition-all duration-300 font-bold"
            :loading="isSubmitting"
          >
            ورود به سیستم
          </UButton>

          <div class="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div class="p-3 bg-gray-50 rounded-2xl text-center">
              <p class="text-[10px] text-gray-400 mb-1">شماره ادمین</p>
              <p class="text-xs font-bold text-gray-600 font-mono">09104646471</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-2xl text-center">
              <p class="text-[10px] text-gray-400 mb-1">شماره منشی</p>
              <p class="text-xs font-bold text-gray-600 font-mono">09928717698</p>
            </div>
          </div>
        </form>
      </UCard>

      <p class="text-center mt-10 text-xs text-gray-400 font-medium">
        طراحی و توسعه توسط کلینیک امید باران &copy; ۲۰۲۴
      </p>
    </div>
  </div>
</template>

<style scoped>
.rtl-input :deep(input) {
  text-align: left;
  direction: ltr;
}
</style>
