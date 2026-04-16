<script setup lang="ts">
import { ref, computed } from 'vue'
const { data: appointments, pending } = await useFetch('/api/appointments')

const stats = [
  { title: 'نوبت‌های امروز', value: '۱۲', trend: '+۲', icon: 'i-heroicons-calendar-days', color: 'bg-teal-50 text-teal-600' },
  { title: 'مراجعین جدید', value: '۴', trend: '+۱', icon: 'i-heroicons-user-plus', color: 'bg-blue-50 text-blue-600' },
  { title: 'درمانگران حاضر', value: '۶', trend: '۰', icon: 'i-heroicons-user-group', color: 'bg-purple-50 text-purple-600' },
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
    <header class="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden relative group">
      <div class="absolute right-0 top-0 w-64 h-64 bg-[#2c6767] opacity-5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
      
      <div class="relative z-10 flex items-center gap-6">
        <div class="hidden sm:block">
          <NuxtImg src="https://picsum.photos/seed/doc/200/200" class="w-20 h-20 rounded-3xl object-cover shadow-lg" />
        </div>
        <div>
          <h1 class="text-3xl font-black text-gray-800 mb-2">سلام، روز بخیر!</h1>
          <p class="text-gray-500 font-medium">
            شنبه، ۲۴ مهر ۱۴۰۲ | مدیریت متمرکز کلینیک امید باران
          </p>
        </div>
      </div>

      <div class="flex gap-3 relative z-10">
        <UButton
          icon="i-heroicons-plus"
          label="نوبت جدید"
          size="xl"
          class="rounded-2xl px-8 bg-[#2c6767] hover:bg-[#1e4a4a] shadow-lg shadow-[#2c6767]/20 transition-all duration-300 transform hover:-translate-y-1"
        />
      </div>
    </header>

    <!-- Stats -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template v-if="pending">
        <USkeleton v-for="i in 3" :key="i" class="h-32 rounded-[2rem]" />
      </template>
      <template v-else>
        <UCard v-for="stat in stats" :key="stat.title" class="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0" :ui="{ body: { padding: 'p-8' }, rounded: 'rounded-[2rem]' }">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">{{ stat.title }}</p>
              <div class="flex items-baseline gap-3">
                <span class="text-4xl font-black text-gray-800 tracking-tighter">{{ stat.value }}</span>
                <span v-if="stat.trend !== '0'" class="text-[10px] font-bold px-3 py-1 rounded-full bg-green-50 text-green-600">
                  {{ stat.trend }} رشد
                </span>
              </div>
            </div>
            <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300', stat.color]">
              <UIcon :name="stat.icon" class="text-3xl" />
            </div>
          </div>
        </UCard>
      </template>
    </section>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Appointments List (Skeleton Friendly) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex justify-between items-center px-2">
          <h3 class="text-xl font-black text-gray-800 flex items-center gap-2">
            <UIcon name="i-heroicons-calendar-days" class="text-[#2c6767]" />
            نوبت‌های اخیر
          </h3>
          <UButton variant="ghost" color="gray" label="مشاهده همه" icon="i-heroicons-arrow-left" trailing to="/appointments" class="font-bold text-[#2c6767]" />
        </div>

        <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-[2rem]', overflow: 'overflow-hidden' }" class="border-0 shadow-sm">
          <template v-if="pending">
            <div class="p-6 space-y-4">
              <USkeleton v-for="i in 5" :key="i" class="h-10 w-full" />
            </div>
          </template>
          <template v-else>
            <UTable
              :rows="filteredAppointments.slice(0, 5)"
              :columns="[
                { key: 'name', label: 'نام مراجع' },
                { key: 'time', label: 'ساعت' },
                { key: 'status', label: 'وضعیت' }
              ]"
              :ui="{ 
                thead: 'bg-gray-50/50',
                th: { base: 'px-6 py-4 text-right font-black text-gray-500 uppercase text-[10px] tracking-widest' },
                td: { base: 'px-6 py-4 text-right text-sm text-gray-600 font-medium' }
              }"
            >
              <template #status-data="{ row }">
                <UBadge :color="getStatusColor(row.status)" variant="soft" size="xs" class="font-black rounded-lg px-2">
                  {{ row.status }}
                </UBadge>
              </template>
            </UTable>
          </template>
        </UCard>
      </div>

      <!-- Side Panels -->
      <div class="space-y-8">
        <!-- Clinic Status -->
        <UCard class="bg-[#2c6767] text-white shadow-2xl shadow-[#2c6767]/30 border-0" :ui="{ rounded: 'rounded-[2rem]', body: { padding: 'p-8' } }">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 bg-white/20 rounded-xl">
              <UIcon name="i-heroicons-chart-bar" class="text-2xl" />
            </div>
            <span class="font-black text-lg">وضعیت کلینیک</span>
          </div>
          
          <div class="space-y-8">
            <div>
              <div class="flex justify-between text-[10px] uppercase font-black tracking-widest mb-3 opacity-80">
                <span>ظرفیت تکمیل شده</span>
                <span>۸۵٪</span>
              </div>
              <UProgress :value="85" color="primary" size="sm" class="opacity-30" />
            </div>
            
            <p class="text-sm opacity-90 leading-relaxed font-medium">
              ترافیک مراجعین در ساعات عصر بالاتر از حد معمول است.
            </p>
            
            <UButton block color="white" variant="solid" class="py-4 text-[#2c6767] font-black rounded-2xl hover:scale-[1.02] transition-transform">
              گزارش تفصیلی
            </UButton>
          </div>
        </UCard>

        <!-- Messages -->
        <UCard class="border-0 shadow-sm" :ui="{ rounded: 'rounded-[2rem]', body: { padding: 'p-6' } }">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-megaphone" class="text-[#2c6767]" />
                <span class="font-black text-gray-800">اطلاعیه‌ها</span>
              </div>
              <UBadge color="red" variant="soft" class="text-[10px] font-black">۲ جدید</UBadge>
            </div>
          </template>
          <div class="space-y-4">
            <div v-for="i in 2" :key="i" class="p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-[#2c6767]/20 transition-all cursor-pointer">
              <p class="text-xs font-black text-gray-800 mb-1">جلسه ماهانه درمانگران</p>
              <p class="text-[10px] text-gray-400 font-bold">فردا، ساعت ۸:۰۰ صبح</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
