<script setup lang="ts">
import { ref, reactive } from 'vue'
import * as yup from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import {
  SpecialtyLabels,
  DayOfWeekLabels,
  CounselingTypeLabels,
  DegreeLevelLabels
} from '~/utils/enums'

const emit = defineEmits(['close', 'refresh'])
const toast = useToast()

const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  medicalCouncilNumber: '',
  degree: null as number | null,
  specialties: [] as number[],
  availableDays: [] as number[],
  counselingTypes: [] as number[],
  availableTimeStart: '',
  availableTimeEnd: '',
  availableTimes: [] as string[]
})

const schema = yup.object({
  name: yup.string().required('وارد کردن نام الزامی است').min(3, 'نام حداقل باید ۳ حرف باشد'),
  phone: yup.string().required('شماره موبایل الزامی است').matches(/^09\d{9}$/, 'شماره موبایل نامعتبر است (مثال: 09121234567)'),
  medicalCouncilNumber: yup.string().required('شماره نظام الزامی است'),
  degree: yup.number().nullable().required('انتخاب مدرک تحصیلی الزامی است'),
  specialties: yup.array().of(yup.number()).min(1, 'حداقل یک تخصص انتخاب کنید').required(),
  availableDays: yup.array().of(yup.number()).min(1, 'حداقل یک روز حضور انتخاب کنید').required(),
  counselingTypes: yup.array().of(yup.number()).min(1, 'حداقل یک نوع مشاوره انتخاب کنید').required(),
})

const degreeOptions = Object.entries(DegreeLevelLabels).map(([value, label]) => ({
  value: Number(value),
  label
}))

const specialtyOptions = Object.entries(SpecialtyLabels).map(([value, label]) => ({
  value: Number(value),
  label
}))

const dayOptions = Object.entries(DayOfWeekLabels).map(([value, label]) => ({
  value: Number(value),
  label
}))

const counselingTypeOptions = Object.entries(CounselingTypeLabels).map(([value, label]) => ({
  value: Number(value),
  label
}))

const fillTestData = () => {
  form.name = 'دکتر امیرعلی پارسا'
  form.phone = '09123456789'
  form.medicalCouncilNumber = '۳۴۵۶۷-ن'
  form.degree = 3
  form.specialties = [1, 6, 7]
  form.availableDays = [1, 3, 5]
  form.counselingTypes = [1, 3]
  form.availableTimes = ['16:00-20:00']
}

const addTimeSlot = () => {
  if (form.availableTimeStart && form.availableTimeEnd) {
    if (form.availableTimeStart >= form.availableTimeEnd) {
      toast.add({ title: 'خطا', description: 'ساعت پایان باید بعد از ساعت شروع باشد', color: 'red' })
      return
    }
    const slot = `${form.availableTimeStart}-${form.availableTimeEnd}`
    if (!form.availableTimes.includes(slot)) {
      form.availableTimes.push(slot)
    }
    form.availableTimeStart = ''
    form.availableTimeEnd = ''
  }
}

const removeTimeSlot = (slot: string) => {
  form.availableTimes = form.availableTimes.filter(s => s !== slot)
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  loading.value = true
  try {
    await $fetch('/api/therapists', {
      method: 'POST',
      body: {
        name: event.data.name,
        phone: event.data.phone,
        medicalCouncilNumber: event.data.medicalCouncilNumber,
        degree: event.data.degree,
        specialties: event.data.specialties,
        availableDays: event.data.availableDays,
        counselingTypes: event.data.counselingTypes,
        availableTimes: form.availableTimes,
        status: 'فعال'
      }
    })
    toast.add({ title: 'موفقیت', description: 'درمانگر جدید ثبت شد', color: 'green' })
    emit('refresh')
    emit('close')
  } catch (error: any) {
    toast.add({ title: 'خطا', description: error.data?.message || 'ارتباط با سرور قطع شد', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="rtl" :ui="{ header: { padding: 'p-6' }, body: { padding: 'p-6' }, rounded: 'rounded-[2rem]' }">
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-black text-gray-800">ثبت درمانگر جدید</h3>
        <div class="flex items-center gap-2">
          <UButton color="teal" variant="soft" size="sm" icon="i-heroicons-beaker" label="تست" @click="fillTestData" />
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="emit('close')" />
        </div>
      </div>
    </template>

    <UForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="نام و نام خانوادگی" name="name">
          <UInput v-model="form.name" icon="i-heroicons-user" placeholder="مثلا: دکتر سارا احمدی" />
        </UFormGroup>
        
        <UFormGroup label="شماره تماس" name="phone">
          <UInput v-model="form.phone" icon="i-heroicons-phone" placeholder="۰۹..." dir="ltr" />
        </UFormGroup>
        
        <UFormGroup label="شماره نظام پزشکی" name="medicalCouncilNumber">
          <UInput v-model="form.medicalCouncilNumber" icon="i-heroicons-identification" dir="ltr" />
        </UFormGroup>
        
        <UFormGroup label="مدرک تحصیلی" name="degree">
          <USelectMenu v-model="form.degree" :options="degreeOptions" value-attribute="value" option-attribute="label" placeholder="انتخاب مدرک" />
        </UFormGroup>
      </div>

      <UFormGroup label="تخصص‌ها" name="specialties">
        <USelectMenu 
          v-model="form.specialties" 
          :options="specialtyOptions" 
          value-attribute="value" 
          option-attribute="label" 
          multiple 
          searchable 
          placeholder="جستجو و انتخاب تخصص‌ها" 
        />
      </UFormGroup>

      <UFormGroup label="روزهای حضور" name="availableDays">
        <USelectMenu 
          v-model="form.availableDays" 
          :options="dayOptions" 
          value-attribute="value" 
          option-attribute="label" 
          multiple 
          placeholder="انتخاب روزها" 
        />
      </UFormGroup>

      <UFormGroup label="نوع مشاوره" name="counselingTypes">
        <USelectMenu 
          v-model="form.counselingTypes" 
          :options="counselingTypeOptions" 
          value-attribute="value" 
          option-attribute="label" 
          multiple 
          placeholder="انتخاب نوع (حضوری، آنلاین...)" 
        />
      </UFormGroup>

      <UFormGroup label="ساعات حضور">
        <div class="flex gap-2 items-center">
          <UInput v-model="form.availableTimeStart" type="time" class="w-full" />
          <span class="text-gray-400">تا</span>
          <UInput v-model="form.availableTimeEnd" type="time" class="w-full" />
          <UButton icon="i-heroicons-plus" color="gray" @click="addTimeSlot" />
        </div>
        <div v-if="form.availableTimes.length > 0" class="flex flex-wrap gap-2 mt-3">
          <UBadge v-for="slot in form.availableTimes" :key="slot" color="teal" variant="soft" class="flex items-center gap-1">
            <span class="dir-ltr">{{ slot }}</span>
            <UButton icon="i-heroicons-x-mark" color="red" variant="ghost" size="2xs" class="ml-1 p-0 h-4 min-h-0" @click="removeTimeSlot(slot)" />
          </UBadge>
        </div>
      </UFormGroup>

      <div class="flex justify-end gap-3 pt-6 border-t border-gray-100">
        <UButton color="gray" variant="soft" @click="emit('close')">انصراف</UButton>
        <UButton type="submit" class="bg-gray-900 font-bold px-6" :loading="loading">ثبت درمانگر</UButton>
      </div>
    </UForm>
  </UCard>
</template>
