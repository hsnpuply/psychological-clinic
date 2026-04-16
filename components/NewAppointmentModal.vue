<script setup lang="ts">
const props = defineProps<{
  initialTherapist?: string;
}>();

const emit = defineEmits(['close', 'save']);

const rooms = ['اتاق ۱', 'اتاق ۲', 'اتاق ۳', 'اتاق ۴'];
const therapists = [
  'دکتر سارا احمدی (روانشناس بالینی)',
  'دکتر امیرحسین رضایی (درمانگر تحلیلی)',
  'مریم توکلی (مشاور خانواده)',
  'دکتر آرش پارسا (روانشناس بالینی)',
  'دکتر مونا راد (روانپزشک)',
];

const form = ref({
  patient: '',
  therapist: props.initialTherapist || therapists[0],
  room: rooms[0],
  date: '۱۴۰۲/۰۷/۲۴',
  time: '۰۹:۳۰',
  duration: '۴۵ دقیقه',
});

const save = () => {
  emit('save', { ...form.value });
  emit('close');
};
</script>

<template>
  <UCard :ui="{ rounded: 'rounded-3xl', body: { padding: 'p-0' } }" class="overflow-hidden">
    <!-- Header -->
    <div class="bg-[#2c6767] p-8 text-white">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-black mb-1">ثبت نوبت جدید</h2>
          <p class="text-white/80 text-xs font-medium">برنامه‌ریزی دقیق جلسات درمانی کلینیک</p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="white"
          variant="ghost"
          class="rounded-xl"
          @click="$emit('close')"
        />
      </div>
    </div>

    <div class="p-10 space-y-8">
      <!-- Patient Selection -->
      <div class="flex items-end gap-4">
        <UFormGroup label="انتخاب مراجع" class="flex-1" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <USelect
            v-model="form.patient"
            :options="['سارا محمودی', 'علی تهرانی', 'مریم سعادت']"
            placeholder="نام مراجع را انتخاب کنید..."
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
        <UButton
          icon="i-heroicons-plus"
          color="blue"
          size="lg"
          class="rounded-xl h-[44px]"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="انتخاب درمانگر" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <USelect
            v-model="form.therapist"
            :options="therapists"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>

        <UFormGroup label="انتخاب اتاق" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <USelect
            v-model="form.room"
            :options="rooms"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UFormGroup label="تاریخ نوبت" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <UInput
            v-model="form.date"
            icon="i-heroicons-calendar"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>

        <UFormGroup label="زمان نوبت" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <UInput
            v-model="form.time"
            icon="i-heroicons-clock"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>

        <UFormGroup label="مدت زمان" :ui="{ label: { base: 'font-bold text-[#2c6767] mb-2' } }">
          <USelect
            v-model="form.duration"
            :options="['۳۰ دقیقه', '۴۵ دقیقه', '۶۰ دقیقه', '۹۰ دقیقه']"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-row-reverse items-center gap-4 pt-6">
        <UButton
          label="تأیید و ثبت نوبت"
          size="xl"
          block
          class="font-bold text-lg flex-1 h-14 bg-[#2c6767] hover:bg-[#1e4a4a] rounded-xl"
          @click="save"
        />
        <UButton
          label="انصراف"
          variant="ghost"
          color="gray"
          size="xl"
          class="px-10 font-bold h-14 rounded-xl"
          @click="$emit('close')"
        />
      </div>
    </div>

    <!-- Footer Info -->
    <div class="px-10 py-6 bg-blue-50/30 flex items-center gap-4 border-t border-gray-100">
      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <UIcon name="i-heroicons-shield-check" class="text-blue-600" />
      </div>
      <p class="text-[10px] text-blue-600 font-bold leading-relaxed">
        سیستم هوشمند کلینیک به صورت خودکار تداخل‌های زمانی و ظرفیت اتاق‌ها را بررسی می‌کند.
      </p>
    </div>
  </UCard>
</template>
