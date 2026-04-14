<script setup lang="ts">
import { ref, watch } from 'vue';
import moment from 'jalali-moment';
import DatePicker from 'vue3-persian-datetime-picker';

const props = defineProps<{
  modelValue: boolean;
  initialTherapist?: string;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

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
  date: moment().locale('fa').format('YYYY/MM/DD'),
  time: moment().format('HH:mm'),
  duration: '45 دقیقه',
});

watch(() => props.initialTherapist, (newVal) => {
  if (newVal) {
    form.value.therapist = newVal;
  }
});

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.initialTherapist) {
    form.value.therapist = props.initialTherapist;
  }
});

const close = () => emit('update:modelValue', false);
const save = () => {
  emit('save', { ...form.value });
  close();
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="close" max-width="700px" persistent>
    <v-card rounded="3xl" class="overflow-hidden elevation-24">
      <!-- Header -->
      <div class="bg-primary pa-8 text-white relative">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-3xl font-black mb-1">ثبت نوبت جدید</h2>
            <p class="text-white/80 text-sm font-light">برنامه‌ریزی دقیق جلسات درمانی کلینیک</p>
          </div>
          <v-btn
            icon="mdi-close"
            variant="tonal"
            color="white"
            size="small"
            class="rounded-xl"
            @click="close"
          ></v-btn>
        </div>
      </div>

      <v-card-text class="pa-10 space-y-8">
        <!-- Patient Selection -->
        <div class="flex items-end gap-4">
          <div class="flex-1 space-y-3">
            <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
              <v-icon icon="mdi-account-outline" size="18"></v-icon>
              انتخاب مراجع
            </label>
            <v-select
              v-model="form.patient"
              :items="['سارا محمودی', 'علی تهرانی', 'مریم سعادت']"
              placeholder="نام مراجع را انتخاب کنید..."
              variant="solo-filled"
              flat
              rounded="xl"
              hide-details
              class="professional-input"
            ></v-select>
          </div>
          <v-btn
            color="secondary"
            rounded="xl"
            size="large"
            icon="mdi-plus"
            elevation="4"
            class="mb-1"
          ></v-btn>
        </div>

        <v-row>
          <!-- Therapist Selection -->
          <v-col cols="12" md="6">
            <div class="space-y-3">
              <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
                <v-icon icon="mdi-doctor" size="18"></v-icon>
                انتخاب درمانگر
              </label>
              <v-select
                v-model="form.therapist"
                :items="therapists"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
                class="professional-input"
              ></v-select>
            </div>
          </v-col>

          <!-- Room Selection -->
          <v-col cols="12" md="6">
            <div class="space-y-3">
              <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
                <v-icon icon="mdi-door-open" size="18"></v-icon>
                انتخاب اتاق
              </label>
              <v-select
                v-model="form.room"
                :items="rooms"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
                class="professional-input"
              ></v-select>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <!-- Date Selection -->
          <v-col cols="12" md="4">
            <div class="space-y-3">
              <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
                <v-icon icon="mdi-calendar-range" size="18"></v-icon>
                تاریخ نوبت
              </label>
              <div class="relative">
                <v-text-field
                  v-model="form.date"
                  id="date-picker-trigger"
                  variant="solo-filled"
                  flat
                  rounded="xl"
                  hide-details
                  readonly
                  class="professional-input"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
                <date-picker
                  v-model="form.date"
                  element="date-picker-trigger"
                  format="YYYY/MM/DD"
                  display-format="jYYYY/jMM/jDD"
                  color="#2c6767"
                />
              </div>
            </div>
          </v-col>

          <!-- Time Selection -->
          <v-col cols="12" md="4">
            <div class="space-y-3">
              <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
                <v-icon icon="mdi-clock-outline" size="18"></v-icon>
                زمان نوبت
              </label>
              <div class="relative">
                <v-text-field
                  v-model="form.time"
                  id="time-picker-trigger"
                  variant="solo-filled"
                  flat
                  rounded="xl"
                  hide-details
                  readonly
                  class="professional-input"
                  prepend-inner-icon="mdi-clock"
                ></v-text-field>
                <date-picker
                  v-model="form.time"
                  element="time-picker-trigger"
                  type="time"
                  color="#2c6767"
                />
              </div>
            </div>
          </v-col>

          <!-- Duration Selection -->
          <v-col cols="12" md="4">
            <div class="space-y-3">
              <label class="block text-sm font-bold text-primary px-1 flex items-center gap-2">
                <v-icon icon="mdi-timer-outline" size="18"></v-icon>
                مدت زمان
              </label>
              <v-select
                v-model="form.duration"
                :items="['۳۰ دقیقه', '۴۵ دقیقه', '۶۰ دقیقه', '۹۰ دقیقه']"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
                class="professional-input"
              ></v-select>
            </div>
          </v-col>
        </v-row>

        <!-- Action Buttons -->
        <div class="flex flex-row-reverse items-center gap-6 pt-6">
          <v-btn
            color="primary"
            rounded="xl"
            size="x-large"
            block
            elevation="8"
            class="font-bold text-lg flex-1 h-16"
            @click="save"
          >
            تأیید و ثبت نوبت
          </v-btn>
          <v-btn
            variant="text"
            rounded="xl"
            size="x-large"
            color="on-surface-variant"
            class="px-10 font-bold h-16"
            @click="close"
          >
            انصراف
          </v-btn>
        </div>
      </v-card-text>

      <!-- Footer Info -->
      <div class="px-10 py-6 bg-secondary/5 flex items-center gap-4 border-t border-secondary/10">
        <v-avatar color="secondary" size="32" class="elevation-2">
          <v-icon icon="mdi-shield-check" color="white" size="18"></v-icon>
        </v-avatar>
        <p class="text-xs text-secondary font-medium leading-relaxed">
          سیستم هوشمند کلینیک به صورت خودکار تداخل‌های زمانی و ظرفیت اتاق‌ها را بررسی می‌کند.
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.professional-input :deep(.v-field) {
  background-color: #f3f4f1 !important;
  transition: all 0.3s ease;
}

.professional-input :deep(.v-field--focused) {
  background-color: #ffffff !important;
  box-shadow: 0 0 0 2px rgba(44, 103, 103, 0.2) !important;
}

.h-16 {
  height: 64px !important;
}

:deep(.vpd-container) {
  font-family: inherit !important;
}
</style>
