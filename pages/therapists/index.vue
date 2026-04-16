<script setup lang="ts">
import { ref, computed } from 'vue'
const { data: therapists } = await useFetch('/api/therapists')

const columns = [
  { key: 'name', label: 'نام درمانگر', id: 'name' },
  { key: 'specialty', label: 'تخصص', id: 'specialty' },
  { key: 'id', label: 'شماره نظام', id: 'therapist-id' },
  { key: 'days', label: 'روزهای حضور', id: 'days' },
  { key: 'status', label: 'وضعیت', id: 'status' },
  { key: 'actions', label: 'عملیات', id: 'actions' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'فعال': return 'green';
    case 'در مرخصی': return 'orange';
    default: return 'gray';
  }
};

const search = ref('');
const filteredTherapists = computed(() => {
  if (!therapists.value) return [];
  if (!search.value) return therapists.value;
  return therapists.value.filter((t: any) => 
    t.name.includes(search.value) || t.id.includes(search.value)
  );
});

const viewProfile = (id: string) => {
  navigateTo(`/therapists/${id}`);
};
</script>

<template>
  <div class="space-y-8">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-800 mb-2 tracking-tight">لیست درمانگران</h1>
        <p class="text-gray-500 max-w-lg">مدیریت و مشاهده کادر درمانی کلینیک امید باران.</p>
      </div>
      <UButton
        icon="i-heroicons-user-plus"
        label="افزودن درمانگر جدید"
        size="xl"
        class="rounded-xl px-8 bg-[#2c6767] hover:bg-[#1e4a4a] shadow-lg shadow-[#2c6767]/20"
      />
    </header>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div class="md:col-span-6">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="جستجوی نام یا شماره نظام پزشکی..."
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
      <div class="md:col-span-3">
        <USelect
          placeholder="تخصص"
          :options="['روانشناس بالینی', 'روانپزشک', 'مشاور']"
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
      <div class="md:col-span-3">
        <USelect
          placeholder="روزهای کاری"
          :options="['شنبه', 'یکشنبه', 'دوشنبه']"
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>
    </div>

    <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-2xl', overflow: 'overflow-hidden' }">
      <UTable
        :rows="filteredTherapists"
        :columns="columns"
        :ui="{ 
          thead: 'bg-gray-50/50',
          th: { base: 'text-right font-bold text-gray-500' },
          td: { base: 'text-right text-sm text-gray-600' }
        }"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-4 py-4">
            <UAvatar :src="`https://picsum.photos/seed/${row.id}/100/100`" :alt="row.name" size="md" class="rounded-full" />
            <div>
              <div class="font-bold text-gray-800">{{ row.name }}</div>
              <div class="text-[10px] text-gray-400">{{ row.bio }}</div>
            </div>
          </div>
        </template>

        <template #specialty-data="{ row }">
          <UBadge color="blue" variant="subtle" size="xs" class="font-bold">
            {{ row.specialty }}
          </UBadge>
        </template>

        <template #days-data="{ row }">
          <div class="flex gap-1">
            <UBadge
              v-for="day in row.days"
              :key="day"
              size="xs"
              variant="solid"
              :color="day === 'چ' ? 'blue' : 'gray'"
              class="min-w-[24px] justify-center rounded-md"
            >
              {{ day }}
            </UBadge>
          </div>
        </template>

        <template #status-data="{ row }">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :class="row.status === 'فعال' ? 'bg-green-500' : 'bg-orange-500'"></div>
            <span class="text-xs font-medium" :class="row.status === 'فعال' ? 'text-green-600' : 'text-orange-600'">{{ row.status }}</span>
          </div>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center justify-end gap-2">
            <UButton icon="i-heroicons-eye" variant="ghost" color="gray" size="xs" @click="viewProfile(row.id)" />
            <UButton icon="i-heroicons-pencil-square" variant="ghost" color="gray" size="xs" />
            <UButton icon="i-heroicons-trash" variant="ghost" color="red" size="xs" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
