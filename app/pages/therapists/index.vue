<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3"
import { ref, computed, watch } from "vue"

const { data: therapists, pending, refresh } = await useFetch('/api/therapists')

const columnDefs = ref([
  { 
    field: 'name', 
    headerName: 'درمانگر', 
    flex: 2, 
    minWidth: 220,
    cellRenderer: (params: any) => {
      const id = params.data.id
      return `
        <div class="flex items-center gap-4 py-3">
          <img src="https://picsum.photos/seed/${id}/100/100" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <div class="leading-tight">
            <div class="font-bold text-gray-800">${params.value}</div>
            <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">${params.data.specialty}</div>
          </div>
        </div>
      `
    }
  },
  { field: 'id', headerName: 'شماره نظام', width: 130, cellClass: 'font-mono' },
  { 
    field: 'days', 
    headerName: 'روزهای حضور', 
    flex: 1,
    cellRenderer: (params: any) => {
      if (!params.value) return '-'
      return `
        <div class="flex gap-1">
          ${params.value.map((d: string) => `
            <span class="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${d === 'چ' ? 'bg-[#2c6767] text-white' : 'bg-gray-100 text-gray-400'}">
              ${d}
            </span>
          `).join('')}
        </div>
      `
    }
  },
  { 
    field: 'status', 
    headerName: 'وضعیت فعالیت',
    width: 150,
    cellRenderer: (params: any) => {
      const colors: Record<string, string> = {
        'فعال': 'bg-green-500',
        'در مرخصی': 'bg-orange-500',
      }
      const textColors: Record<string, string> = {
        'فعال': 'text-green-600',
        'در مرخصی': 'text-orange-600',
      }
      const dotColor = colors[params.value] || 'bg-gray-400'
      const textColor = textColors[params.value] || 'text-gray-400'
      return `
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full ${dotColor}"></div>
          <span class="text-xs font-bold ${textColor}">${params.value}</span>
        </div>
      `
    }
  },
  {
    headerName: 'مدیریت',
    width: 100,
    pinned: 'left' as const,
    cellRenderer: (params: any) => {
      return `
        <div class="flex items-center gap-2">
          <button onclick="window.location.href='/therapists/${params.data.id}'" class="p-2 hover:bg-teal-50 rounded-xl text-gray-400 hover:text-[#2c6767] transition-all">
            <i class="fas fa-id-badge text-sm"></i>
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
    title: 'بروزرسانی کادر درمانی',
    description: 'لیست درمانگران با آخرین تغییرات سینک شد',
    color: 'teal'
  })
}
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto rtl font-vazir">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
      <div class="absolute left-0 bottom-0 w-48 h-48 bg-teal-50 rounded-full -ml-24 -mb-24 opacity-60"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">کادر درمان و متخصصین</h1>
        <p class="text-gray-500 font-medium mt-1">مدیریت تیم حرفه‌ای و بررسی وضعیت حضور درمانگران کلینیک</p>
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
          label="درمانگر جدید"
          size="xl"
          class="rounded-2xl px-10 bg-gray-900 hover:bg-black text-white font-black shadow-xl transition-all"
        />
      </div>
    </header>

    <!-- Toolbar & Grid -->
    <UCard :ui="{ body: { padding: 'p-0' }, rounded: 'rounded-[2.5rem]', overflow: 'overflow-hidden' }" class="border-0 shadow-2xl shadow-gray-100">
      <div class="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="جستجو در نام درمانگر، تخصص یا کد نظام..."
          class="w-96"
          size="lg"
          :ui="{ rounded: 'rounded-2xl' }"
        />
        <div class="flex items-center gap-6">
           <div class="text-right">
             <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest">متخصصین فعال</div>
             <div class="text-xl font-black text-[#2c6767]">{{ therapists?.filter((t: any) => t.status === 'فعال').length || 0 }} نفر</div>
           </div>
           <div class="w-1px h-10 bg-gray-100"></div>
           <div class="text-right">
             <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest">ظرفیت کل تیم</div>
             <div class="text-xl font-black text-gray-800">{{ therapists?.length || 0 }} نفر</div>
           </div>
        </div>
      </div>

      <!-- Skeletons -->
      <div v-if="pending" class="p-6 space-y-4">
        <USkeleton v-for="i in 6" :key="i" class="h-16 w-full rounded-2xl" />
      </div>

      <!-- Grid -->
      <div v-else class="ag-theme-alpine w-full h-[600px]">
        <AgGridVue
          style="width: 100%; height: 100%;"
          :columnDefs="columnDefs"
          :rowData="therapists"
          :defaultColDef="defaultColDef"
          :enableRtl="true"
          :pagination="true"
          :paginationPageSize="12"
          @grid-ready="onGridReady"
        />
      </div>
    </UCard>
  </div>
</template>

<style>
.ag-theme-alpine {
  --ag-header-background-color: #fff;
  --ag-header-foreground-color: #9ca3af;
  --ag-header-column-separator-display: none;
  --ag-row-hover-color: #f9fafb;
  --ag-selected-row-background-color: #2c676705;
  --ag-font-family: inherit;
  --ag-font-size: 14px;
  --ag-cell-horizontal-padding: 32px;
  --ag-border-color: #f3f4f6;
  --ag-grid-size: 6px;
}

.ag-header-cell-label {
  font-weight: 800 !important;
  text-transform: uppercase;
  font-size: 10px !important;
  letter-spacing: 0.1em;
}

.ag-row {
  border-bottom: 1px solid #f9fafb !important;
}

.ag-cell {
  display: flex !important;
  align-items: center !important;
  font-weight: 600;
  color: #374151;
}

.ag-paging-panel {
  border-top: 1px solid #f9fafb !important;
  height: 64px;
  padding: 0 40px;
  background: white;
}
</style>
