<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, computed } from "vue"

const { data: appointments, pending, refresh } = await useFetch('/api/appointments')

const columnDefs = ref([
  { field: 'name', headerName: 'نام مراجع', flex: 1, minWidth: 150 },
  { field: 'patientId', headerName: 'شماره پرونده', width: 120 },
  { field: 'therapist', headerName: 'درمانگر', flex: 1 },
  { field: 'date', headerName: 'تاریخ', width: 110 },
  { field: 'time', headerName: 'ساعت', width: 90 },
  { 
    field: 'status', 
    headerName: 'وضعیت',
    width: 130,
    cellRenderer: (params: any) => {
      const colors: Record<string, string> = {
        'پذیرش شده': 'text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-black',
        'در انتظار': 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-[10px] font-black',
        'تأیید شده': 'text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[10px] font-black',
        'کنسل شده': 'text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-[10px] font-black',
      }
      const colorClass = colors[params.value] || 'text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full text-[10px] font-black'
      return `<span class="${colorClass}">${params.value}</span>`
    }
  },
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
    title: 'بروزرسانی',
    description: 'لیست نوبت‌ها با موفقیت بروز شد',
    color: 'green'
  })
}
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto rtl">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-[#2c6767]/10 text-[#2c6767] rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-calendar-days" class="text-2xl" />
        </div>
        <div>
          <h1 class="text-xl font-black text-gray-800">مدیریت نوبت‌ها</h1>
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Appointment Management System</p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-arrow-path"
          color="gray"
          variant="soft"
          class="rounded-xl box-shadow-sm"
          :loading="pending"
          @click="onRefresh"
        />
        <UButton
          icon="i-heroicons-plus"
          label="ثبت نوبت جدید"
          class="rounded-xl px-6 bg-[#2c6767] hover:bg-[#1e4a4a] text-xs font-black"
        />
      </div>
    </header>

    <!-- Filters & Table -->
    <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-3xl', overflow: 'overflow-hidden' }" class="border-0 shadow-xl shadow-gray-100/50">
      <div class="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="جستجو مراجع، درمانگر یا کد پرونده..."
          class="w-full max-w-md"
          size="lg"
          :ui="{ rounded: 'rounded-2xl' }"
        />
        <div class="flex gap-2">
           <UBadge color="teal" variant="soft" class="rounded-lg font-black text-[10px]">{{ appointments?.length || 0 }} نوبت</UBadge>
        </div>
      </div>

      <!-- Skeleton Loading for Table -->
      <div v-if="pending" class="p-4 space-y-4">
        <USkeleton v-for="i in 10" :key="i" class="h-10 w-full rounded-xl" />
      </div>

      <!-- AG Grid Table -->
      <div v-else class="ag-theme-alpine w-full h-[600px] border-none">
        <AgGridVue
          class="max-w-full"
          style="width: 100%; height: 100%;"
          :columnDefs="columnDefs"
          :rowData="appointments"
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
  --ag-header-background-color: transparent;
  --ag-header-foreground-color: #9ca3af;
  --ag-header-column-separator-display: none;
  --ag-row-hover-color: #f9fafb;
  --ag-selected-row-background-color: #2c676710;
  --ag-font-family: inherit;
  --ag-font-size: 13px;
  --ag-cell-horizontal-padding: 24px;
}

.ag-header-cell-label {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.05em;
}

.ag-row {
  border-bottom-color: #f3f4f6 !important;
}

.ag-cell {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #374151;
}

/* Pagination container styling */
.ag-paging-panel {
  border-top: 1px solid #f3f4f6 !important;
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
}
</style>
