<script setup lang="ts">
import { ref, computed } from 'vue'
const { data: appointments } = await useFetch('/api/appointments')

const stats = [
  { title: 'نوبت‌های امروز', value: '۱۲', trend: '+۲', icon: 'i-heroicons-calendar-days' },
  { title: 'مراجعین جدید', value: '۴', trend: '+۱', icon: 'i-heroicons-user-plus' },
  { title: 'درمانگران حاضر', value: '۶', trend: '۰', icon: 'i-heroicons-user-group' },
];

const columns = [
  { key: 'name', label: 'نام مراجع', id: 'name' },
  { key: 'patientId', label: 'شماره پرونده', id: 'patientId' },
  { key: 'therapist', label: 'درمانگر', id: 'therapist' },
  { key: 'time', label: 'ساعت', id: 'time' },
  { key: 'status', label: 'وضعیت', id: 'status' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'پذیرش شده': return 'green';
    case 'در انتظار': return 'orange';
    case 'تأیید شده': return 'blue';
    case 'کنسل شده': return 'red';
    default: return 'gray';
  }
};

const search = ref('');
const filteredAppointments = computed(() => {
  if (!appointments.value) return [];
  if (!search.value) return appointments.value;
  return appointments.value.filter((a: any) => 
    a.name.includes(search.value) || a.patientId.includes(search.value) || a.therapist.includes(search.value)
  );
});
</script>

<template>
  <div class="space-y-10 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="flex justify-between items-start border-b border-gray-100 pb-8">
      <div>
        <h1 class="text-3xl font-black text-gray-800 mb-2">داشبورد مدیریتی</h1>
        <p class="text-gray-500 font-medium">
          شنبه، ۲۴ مهر ۱۴۰۲ | مدیریت متمرکز کلینیک امید باران
        </p>
      </div>
      <div class="flex gap-3">
        <UButton
          icon="i-heroicons-plus"
          label="نوبت جدید"
          size="lg"
          class="rounded-xl px-6 bg-[#2c6767] hover:bg-[#1e4a4a]"
        />
        <UButton
          icon="i-heroicons-arrow-path"
          color="gray"
          variant="outline"
          size="lg"
          class="rounded-xl"
        />
      </div>
    </header>

    <!-- Stats -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <UCard v-for="stat in stats" :key="stat.title" :ui="{ body: { padding: 'p-6' }, rounded: 'rounded-2xl' }">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{{ stat.title }}</p>
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-black text-gray-800 tracking-tighter">{{ stat.value }}</span>
              <span v-if="stat.trend !== '0'" class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
                {{ stat.trend }}
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
            <UIcon :name="stat.icon" class="text-2xl text-gray-400" />
          </div>
        </div>
      </UCard>
    </section>

    <!-- Appointments Table -->
    <section class="space-y-4">
      <div class="flex justify-between items-center px-1">
        <h3 class="text-xl font-black text-gray-800 flex items-center gap-2">
          <UIcon name="i-heroicons-calendar-days" class="text-[#2c6767]" />
          نوبت‌های امروز
        </h3>
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="جستجو در لیست..."
          class="w-64"
          :ui="{ rounded: 'rounded-full' }"
        />
      </div>

      <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-2xl', overflow: 'overflow-hidden' }">
        <UTable
          :rows="filteredAppointments"
          :columns="columns"
          :ui="{ 
            thead: 'bg-gray-50/50',
            th: { base: 'text-right font-bold text-gray-500' },
            td: { base: 'text-right text-sm text-gray-600' }
          }"
        >
          <template #status-data="{ row }">
            <UBadge :color="getStatusColor(row.status)" variant="subtle" size="xs" class="font-bold">
              {{ row.status }}
            </UBadge>
          </template>
        </UTable>
      </UCard>
    </section>

    <!-- Bottom Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <UCard class="md:col-span-2 bg-gray-50/30" :ui="{ rounded: 'rounded-2xl' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-megaphone" class="text-[#2c6767]" />
            <span class="font-bold text-gray-800">اطلاعیه‌های داخلی</span>
          </div>
        </template>
        <div class="space-y-6">
          <div v-for="note in [
            { title: 'جلسه ماهانه درمانگران', time: 'فردا، ۸:۰۰', desc: 'بررسی پروتکل‌های جدید پذیرش و ترخیص مراجعین.' },
            { title: 'بروزرسانی تعرفه‌ها', time: '۱ آبان', desc: 'تغییر در هزینه‌های جلسات مشاوره تخصصی و گروهی.' }
          ]" :key="note.title" class="flex gap-6">
            <div class="text-left min-w-[80px]">
              <p class="text-[10px] font-bold text-[#2c6767] uppercase tracking-tighter">{{ note.time }}</p>
            </div>
            <div class="flex-1 border-r-2 border-[#2c6767]/20 pr-6">
              <p class="text-sm font-bold mb-1 text-gray-800">{{ note.title }}</p>
              <p class="text-xs text-gray-500 leading-relaxed">{{ note.desc }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard class="bg-[#2c6767] text-white" :ui="{ rounded: 'rounded-2xl' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-chart-bar" />
            <span class="font-bold">وضعیت کلینیک</span>
          </div>
        </template>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between text-xs mb-2">
              <span>ظرفیت تکمیل شده</span>
              <span>۸۵٪</span>
            </div>
            <UProgress :value="85" color="white" size="sm" />
          </div>
          <p class="text-xs opacity-70 leading-relaxed">
            امروز ترافیک مراجعین در ساعات عصر بالاتر از حد معمول است. لطفاً آمادگی لازم را داشته باشید.
          </p>
          <UButton block color="white" variant="solid" class="mt-4 text-[#2c6767] font-bold rounded-xl">
            مشاهده جزئیات
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
