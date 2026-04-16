<script setup lang="ts">
const props = defineProps<{
  therapist: any;
}>();

const emit = defineEmits(['close', 'save']);

const form = ref({ ...props.therapist });

const save = () => {
  emit('save', form.value);
  emit('close');
};

const addSpecialization = () => {
  form.value.specializations.push('');
};

const removeSpecialization = (index: number) => {
  form.value.specializations.splice(index, 1);
};
</script>

<template>
  <UCard :ui="{ rounded: 'rounded-3xl', body: { padding: 'p-0' } }" class="overflow-hidden">
    <div class="bg-blue-50/30 p-8 pb-4">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-black text-gray-800 mb-1">ویرایش پروفایل</h2>
          <p class="text-gray-500 text-xs font-medium">به‌روزرسانی اطلاعات حرفه‌ای و تماس درمانگر</p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          class="rounded-xl"
          @click="$emit('close')"
        />
      </div>
    </div>

    <div class="p-10 pt-4 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="نام و نام خانوادگی" :ui="{ label: { base: 'font-bold text-gray-500 mb-2' } }">
          <UInput
            v-model="form.name"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
        <UFormGroup label="تخصص" :ui="{ label: { base: 'font-bold text-gray-500 mb-2' } }">
          <UInput
            v-model="form.specialty"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
      </div>

      <UFormGroup label="بیوگرافی" :ui="{ label: { base: 'font-bold text-gray-500 mb-2' } }">
        <UTextarea
          v-model="form.bio"
          size="lg"
          class="w-full"
          :rows="4"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </UFormGroup>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="ایمیل" :ui="{ label: { base: 'font-bold text-gray-500 mb-2' } }">
          <UInput
            v-model="form.email"
            icon="i-heroicons-envelope"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
        <UFormGroup label="شماره تماس" :ui="{ label: { base: 'font-bold text-gray-500 mb-2' } }">
          <UInput
            v-model="form.phone"
            icon="i-heroicons-phone"
            size="lg"
            class="w-full"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="text-sm font-bold text-gray-500">حوزه‌های تخصصی</label>
          <UButton
            icon="i-heroicons-plus"
            label="افزودن تخصص"
            variant="ghost"
            color="blue"
            size="xs"
            @click="addSpecialization"
          />
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(spec, index) in form.specializations"
            :key="index"
            class="flex items-center gap-2 bg-gray-50 p-2 pr-4 rounded-xl border border-gray-100"
          >
            <input
              v-model="form.specializations[index]"
              class="bg-transparent border-none outline-none text-sm font-bold text-gray-700 w-40"
            />
            <UButton
              icon="i-heroicons-x-mark"
              variant="ghost"
              size="xs"
              color="red"
              @click="removeSpecialization(index)"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-row-reverse items-center gap-4 pt-4">
        <UButton
          label="ذخیره تغییرات"
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
  </UCard>
</template>
