<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, computed, watch } from "vue"

const { data: patients, pending, refresh } = await useFetch('/api/patients')

const columnDefs = ref([
  { 
    field: 'name', 
    headerName: 'نام مراجع', 
    flex: 2, 
    minWidth: 200,
    cellRenderer: (params: any) => {
      const id = params.data.id
      return `
        <div class="flex items-center gap-3 py-2">
          <img src="https://picsum.photos/seed/${id}/100/100" class="w-8 h-8 rounded-lg object-cover" />
          <div class="leading-tight">
            <div class="font-bold text-gray-800">${params.value}</div>
            <div class="text-[10px] text-gray-400 font-bold">درمانگر: ${params.data.therapist}</div>
          </div>
        </div>
      `
    }
  },
  { field: 'mobile', headerName: 'شماره موبایل', flex: 1, minWidth: 130, cellClass: 'font-mono' },
  { field: 'id', headerName: 'شماره پرونده', flex: 1, minWidth: 130, cellClass: 'font-mono' },
  { field: 'lastVisit', headerName: 'آخرین ویزیت', width: 130 },
  { 
    field: 'status', 
    headerName: 'وضعیت',
    width: 120,
    cellRenderer: (params: any) => {
      const colors: Record<string, string> = {
        'فعال': 'text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black',
        'در انتظار': 'text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-[10px] font-black',
        'بایگانی شده': 'text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black',
      }
      const colorClass = colors[params.value] || 'text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black'
      return `<span class="${colorClass}">${params.value}</span>`
    }
  },
  {
    headerName: 'عملیات',
    width: 100,
    pinned: 'left' as const,
    cellRenderer: () => {
      return `
        <div class="flex items-center gap-1">
          <button class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#2c6767] transition-colors">
            <i class="fas fa-eye text-sm"></i>
          </button>
          <button class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#2c6767] transition-colors">
            <i class="fas fa-edit text-sm"></i>
          </button>
        </div>
      `
    }
  }
])

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
}

const search = ref('')
const gridApi = ref<any>(null)

const onGridReady = (params: any) => {
  gridApi.value = params.api
}

watch(search, (newVal) => {
  if (gridApi.value) {
    gridApi.value.setQuickFilter(newVal)
  }
})

const onRefresh = async () => {
  await refresh()
  const toast = useToast()
  toast.add({
    title: 'بروزرسانی مراجعین',
    description: 'سابقه مراجعین با موفقیت همگام‌سازی شد',
    color: 'green'
  })
}
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto rtl">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
      <div class="absolute right-0 top-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-gray-800 mb-2">پرونده مراجعین</h1>
        <p class="text-gray-500 font-medium">مدیریت متمرکز تاریخچه درمان و اطلاعات بیماران کلینیک</p>
      </div>
      <div class="flex gap-3 relative z-10">
        <UButton
          icon="i-heroicons-arrow-path"
          color="gray"
          variant="soft"
          class="rounded-xl p-3"
          :loading="pending"
          @click="onRefresh"
        />
        <UButton
          icon="i-heroicons-user-plus"
          label="افزودن مراجع جدید"
          size="xl"
          class="rounded-2xl px-8 bg-[#2c6767] hover:bg-[#1e4a4a] shadow-lg shadow-[#2c6767]/20 font-black"
        />
      </div>
    </header>

    <!-- Content Card -->
    <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-[2rem]', overflow: 'overflow-hidden' }" class="border-0 shadow-xl shadow-gray-200/50">
      <!-- Tollbar -->
      <div class="p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-4 w-full md:w-auto">
          <UInput
            v-model="search"
            icon="i-heroicons-magnifying-glass"
            placeholder="جستجو در نام، شماره پرونده یا موبایل..."
            class="w-full md:w-80"
            size="lg"
            :ui="{ rounded: 'rounded-2xl' }"
          />
        </div>
        
        <div class="flex items-center gap-4 w-full md:w-auto justify-end">
          <div class="flex flex-col items-end">
             <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">مجموع پرونده‌ها</span>
             <span class="text-lg font-black text-gray-800 tracking-tighter">{{ patients?.length || 0 }} نفر</span>
          </div>
          <div class="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
             <UIcon name="i-heroicons-users" class="text-xl" />
          </div>
        </div>
      </div>

      <!-- Table Area -->
      <div v-if="pending" class="p-6 space-y-4">
        <USkeleton v-for="i in 8" :key="i" class="h-12 w-full rounded-2xl" />
      </div>

      <div v-else class="ag-theme-alpine w-full h-[650px] border-none">
        <AgGridVue
          style="width: 100%; height: 100%;"
          :columnDefs="columnDefs"
          :rowData="patients"
          :defaultColDef="defaultColDef"
          :enableRtl="true"
          :pagination="true"
          :paginationPageSize="15"
          @grid-ready="onGridReady"
        />
      </div>
    </UCard>
  </div>
</template>

<style>
.ag-theme-alpine {
  --ag-header-background-color: #f9fafb;
  --ag-header-foreground-color: #6b7280;
  --ag-header-column-separator-display: none;
  --ag-row-hover-color: #f9fafb;
  --ag-selected-row-background-color: #2c676708;
  --ag-font-family: 'Vazirmatn', sans-serif;
  --ag-font-size: 13px;
  --ag-cell-horizontal-padding: 32px;
  --ag-border-color: #f3f4f6;
}

.ag-header-cell-label {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.05em;
  color: #9ca3af;
}

.ag-row {
  border-bottom-color: #f3f4f6 !important;
  transition: all 0.2s ease;
}

.ag-cell {
  display: flex !important;
  align-items: center !important;
  font-weight: 600;
  color: #4b5563;
}

.ag-paging-panel {
  border-top: 1px solid #f3f4f6 !important;
  height: 60px;
  padding: 0 32px;
  font-weight: 700;
  font-size: 11px;
  color: #9ca3af;
}
</style>
