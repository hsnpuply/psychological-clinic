<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  therapist: any;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const form = ref({ ...props.therapist });

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    form.value = JSON.parse(JSON.stringify(props.therapist));
  }
});

const close = () => emit('update:modelValue', false);
const save = () => {
  emit('save', form.value);
  close();
};

const addSpecialization = () => {
  form.value.specializations.push('');
};

const removeSpecialization = (index: number) => {
  form.value.specializations.splice(index, 1);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="close" max-width="800px">
    <v-card rounded="3xl" class="overflow-hidden">
      <div class="bg-secondary/10 pa-8 pb-4 rtl">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-3xl font-extrabold text-secondary mb-1">ویرایش پروفایل</h2>
            <p class="text-on-surface-variant text-sm">به‌روزرسانی اطلاعات حرفه‌ای و تماس درمانگر</p>
          </div>
          <v-btn variant="text" @click="close">
            <i class="fas fa-times"></i>
          </v-btn>
        </div>
      </div>

      <v-card-text class="pa-10 pt-4 space-y-8 rtl">
        <v-row>
          <v-col cols="12" md="6">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-on-surface-variant px-1">نام و نام خانوادگی</label>
              <v-text-field
                v-model="form.name"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-on-surface-variant px-1">تخصص</label>
              <v-text-field
                v-model="form.specialty"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
        </v-row>

        <div class="space-y-2">
          <label class="block text-sm font-bold text-on-surface-variant px-1">بیوگرافی</label>
          <v-textarea
            v-model="form.bio"
            variant="solo-filled"
            flat
            rounded="xl"
            rows="4"
            hide-details
          ></v-textarea>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-on-surface-variant px-1">ایمیل</label>
              <v-text-field
                v-model="form.email"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
              >
                <template v-slot:prepend-inner>
                  <i class="fas fa-envelope text-gray-400"></i>
                </template>
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-on-surface-variant px-1">شماره تماس</label>
              <v-text-field
                v-model="form.phone"
                variant="solo-filled"
                flat
                rounded="xl"
                hide-details
              >
                <template v-slot:prepend-inner>
                  <i class="fas fa-phone text-gray-400"></i>
                </template>
              </v-text-field>
            </div>
          </v-col>
        </v-row>

        <div class="space-y-4">
          <div class="flex justify-between items-center px-1">
            <label class="text-sm font-bold text-on-surface-variant">حوزه‌های تخصصی</label>
            <v-btn
              variant="text"
              color="primary"
              size="small"
              @click="addSpecialization"
            >
              <template v-slot:prepend>
                <i class="fas fa-plus ml-2"></i>
              </template>
              افزودن تخصص
            </v-btn>
          </div>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(spec, index) in form.specializations"
              :key="index"
              class="flex items-center gap-2 bg-surface-variant/20 pa-2 pr-4 rounded-xl border border-outline-variant"
            >
              <input
                v-model="form.specializations[index]"
                class="bg-transparent border-none outline-none text-sm font-medium w-40"
              />
              <v-btn
                variant="text"
                size="x-small"
                color="error"
                @click="removeSpecialization(index)"
              >
                <i class="fas fa-times"></i>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="flex flex-row-reverse items-center gap-4 pt-4">
          <v-btn
            color="secondary"
            rounded="pill"
            size="x-large"
            block
            class="font-bold text-lg flex-1"
            @click="save"
          >
            ذخیره تغییرات
          </v-btn>
          <v-btn variant="text" rounded="pill" size="x-large" class="px-10 font-bold" @click="close">
            انصراف
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
