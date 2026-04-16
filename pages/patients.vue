<script setup lang="ts">
import { ref, computed } from 'vue'
const { data: patients } = await useFetch('/api/patients')

const columns = [
  { key: 'name', label: 'نام مراجع', id: 'name' },
  { key: 'mobile', label: 'شماره موبایل', id: 'mobile' },
  { key: 'id', label: 'شماره پرونده', id: 'patient-id' },
  { key: 'lastVisit', label: 'آخرین ویزیت', id: 'lastVisit' },
  { key: 'status', label: 'وضعیت', id: 'status' },
  { key: 'actions', label: 'عملیات', id: 'actions' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'فعال': return 'green';
    case 'در انتظار': return 'orange';
    case 'بایگانی شده': return 'gray';
    default: return 'gray';
  }
};

const search = ref('');
const filteredPatients = computed(() => {
  if (!patients.value) return [];
  if (!search.value) return patients.value;
  return patients.value.filter((p: any) => 
    p.name.includes(search.value) || p.id.includes(search.value)
  );
});
</script>

<template>
  <div class="space-y-8">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-800 mb-2">لیست مراجعین</h1>
        <p class="text-gray-500 max-w-lg leading-relaxed">
          مدیریت پرونده‌های درمانی و دسترسی سریع به تاریخچه جلسات بیماران کلینیک امید باران.
        </p>
      </div>
      <UButton
        icon="i-heroicons-plus"
        label="افزودن مراجع جدید"
        size="xl"
        class="rounded-xl px-8 bg-[#2c6767] hover:bg-[#1e4a4a] shadow-lg shadow-[#2c6767]/20"
      />
    </header>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div class="md:col-span-6">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="جستجوی نام مراجع یا شماره پرونده..."
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
      <div class="md:col-span-3">
        <USelect
          placeholder="فیلتر وضعیت"
          :options="['فعال', 'در انتظار', 'بایگانی شده']"
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
      <div class="md:col-span-3">
        <USelect
          placeholder="مرتب‌سازی"
          :options="['نام', 'تاریخ آخرین ویزیت', 'شماره پرونده']"
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
    </div>

    <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-2xl', overflow: 'overflow-hidden' }">
      <UTable
        :rows="filteredPatients"
        :columns="columns"
        :ui="{ 
          thead: 'bg-gray-50/50',
          th: { base: 'text-right font-bold text-gray-500' },
          td: { base: 'text-right text-sm text-gray-600' }
        }"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-4 py-2">
            <UAvatar :src="`https://picsum.photos/seed/${row.id}/100/100`" :alt="row.name" size="sm" class="rounded-xl" />
            <div>
              <p class="font-bold text-gray-800">{{ row.name }}</p>
              <p class="text-[10px] text-gray-400">درمانگر: {{ row.therapist }}</p>
            </div>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)" variant="subtle" size="xs" class="font-bold">
            {{ row.status }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center justify-end gap-1">
            <UButton icon="i-heroicons-eye" variant="ghost" color="gray" size="xs" />
            <UButton icon="i-heroicons-pencil-square" variant="ghost" color="gray" size="xs" />
            <UButton icon="i-heroicons-trash" variant="ghost" color="red" size="xs" />
          </div>
        </template>
      </UTable>
      
      <template #footer>
        <div class="flex items-center justify-between px-4 py-3">
          <span class="text-xs text-gray-400">نمایش {{ filteredPatients.length }} از ۱۴۸ مورد</span>
          <UPagination :model-value="1" :total="150" :page-count="10" :ui="{ rounded: 'rounded-lg' }" />
        </div>
      </template>
    </UCard>
  </div>
</template>
