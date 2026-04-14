<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { ColDef } from 'ag-grid-community';

const stats = [
  { title: 'نوبت‌های امروز', value: '۱۲', trend: '+۲', color: 'primary' },
  { title: 'مراجعین جدید', value: '۴', trend: '+۱', color: 'secondary' },
  { title: 'درمانگران حاضر', value: '۶', trend: '۰', color: 'tertiary' },
];

const rowData = ref([
  { name: 'سارا محمدی', id: 'OB-1289', therapist: 'دکتر علوی', time: '۰۹:۳۰', status: 'پذیرش شده' },
  { name: 'رضا حسینی', id: 'OB-1402', therapist: 'دکتر کیانی', time: '۱۰:۱۵', status: 'در انتظار' },
  { name: 'نرگس راد', id: 'OB-1355', therapist: 'دکتر علوی', time: '۱۱:۰۰', status: 'تأیید شده' },
  { name: 'امید صبوری', id: 'OB-980', therapist: 'دکتر شایان', time: '۱۲:۳۰', status: 'کنسل شده' },
  { name: 'مریم سعادت', id: 'OB-1500', therapist: 'دکتر علوی', time: '۱۳:۱۵', status: 'در انتظار' },
]);

const columnDefs = ref<ColDef[]>([
  { field: 'name', headerName: 'نام مراجع', flex: 1, sortable: true, filter: true },
  { field: 'id', headerName: 'شماره پرونده', width: 120 },
  { field: 'therapist', headerName: 'درمانگر', flex: 1, sortable: true, filter: true },
  { field: 'time', headerName: 'ساعت', width: 100, sortable: true },
  { 
    field: 'status', 
    headerName: 'وضعیت', 
    width: 130,
    cellRenderer: (params: any) => {
      const colors: any = {
        'پذیرش شده': 'success',
        'در انتظار': 'warning',
        'تأیید شده': 'primary',
        'کنسل شده': 'error'
      };
      return `<span class="px-2 py-1 rounded-md text-[10px] font-bold bg-${colors[params.value] || 'grey'}-lighten-4 text-${colors[params.value] || 'grey'}">${params.value}</span>`;
    }
  },
]);

const defaultColDef = {
  resizable: true,
};
</script>

<template>
  <DefaultLayout>
    <div class="space-y-10 rtl max-w-7xl mx-auto">
      <!-- Minimal Header -->
      <header class="flex justify-between items-start border-b border-outline-variant pb-8">
        <div>
          <h1 class="text-4xl font-light text-primary mb-2">داشبورد مدیریتی</h1>
          <p class="text-on-surface-variant font-light tracking-wide">
            شنبه، ۲۴ مهر ۱۴۰۲ | مدیریت متمرکز کلینیک امید باران
          </p>
        </div>
        <div class="flex gap-3">
          <v-btn variant="tonal" color="primary" rounded="xl" prepend-icon="mdi-plus">نوبت جدید</v-btn>
          <v-btn variant="outlined" color="outline" rounded="xl" icon="mdi-refresh"></v-btn>
        </div>
      </header>

      <!-- Minimal Stats -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="stat in stats" :key="stat.title" class="group">
          <p class="text-xs text-on-surface-variant uppercase tracking-widest mb-2 font-medium">{{ stat.title }}</p>
          <div class="flex items-baseline gap-4">
            <span class="text-5xl font-black text-primary tracking-tighter">{{ stat.value }}</span>
            <span v-if="stat.trend !== '0'" class="text-xs font-bold px-2 py-0.5 rounded-full" :class="stat.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'">
              {{ stat.trend }}
            </span>
          </div>
          <div class="h-1 w-0 group-hover:w-full bg-primary transition-all duration-500 mt-4 opacity-20"></div>
        </div>
      </section>

      <!-- AG Grid Appointments -->
      <section class="space-y-4">
        <div class="flex justify-between items-center px-1">
          <h3 class="text-xl font-bold text-primary flex items-center gap-2">
            <v-icon icon="mdi-calendar-clock" size="20"></v-icon>
            نوبت‌های امروز
          </h3>
          <div class="flex items-center gap-4">
            <v-text-field
              placeholder="جستجو در لیست..."
              density="compact"
              variant="solo-filled"
              flat
              rounded="pill"
              hide-details
              class="w-64"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
        </div>

        <v-card rounded="2xl" flat border class="overflow-hidden">
          <ag-grid-vue
            class="ag-theme-alpine w-full h-[400px]"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :enableRtl="true"
            :animateRows="true"
          >
          </ag-grid-vue>
        </v-card>
      </section>

      <!-- Simplified Bottom Grid -->
      <v-row>
        <v-col cols="12" md="8">
          <v-card rounded="2xl" flat border class="pa-8 h-full bg-surface-variant/5">
            <h4 class="text-lg font-bold mb-6 flex items-center gap-2">
              <v-icon icon="mdi-bullhorn-outline" color="primary"></v-icon>
              اطلاعیه‌های داخلی
            </h4>
            <div class="space-y-6">
              <div v-for="note in [
                { title: 'جلسه ماهانه درمانگران', time: 'فردا، ۸:۰۰', desc: 'بررسی پروتکل‌های جدید پذیرش و ترخیص مراجعین.' },
                { title: 'بروزرسانی تعرفه‌ها', time: '۱ آبان', desc: 'تغییر در هزینه‌های جلسات مشاوره تخصصی و گروهی.' }
              ]" :key="note.title" class="flex gap-6">
                <div class="text-left min-w-[80px]">
                  <p class="text-[10px] font-bold text-primary uppercase tracking-tighter">{{ note.time }}</p>
                </div>
                <div class="flex-1 border-r-2 border-primary/20 pr-6">
                  <p class="text-sm font-bold mb-1">{{ note.title }}</p>
                  <p class="text-xs text-on-surface-variant leading-relaxed">{{ note.desc }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card rounded="2xl" flat border class="pa-8 h-full bg-primary text-white">
            <h4 class="text-lg font-bold mb-6">وضعیت کلینیک</h4>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between text-xs mb-2">
                  <span>ظرفیت تکمیل شده</span>
                  <span>۸۵٪</span>
                </div>
                <v-progress-linear model-value="85" color="white" height="6" rounded></v-progress-linear>
              </div>
              <p class="text-xs opacity-70 leading-relaxed">
                امروز ترافیک مراجعین در ساعات عصر بالاتر از حد معمول است. لطفاً آمادگی لازم را داشته باشید.
              </p>
              <v-btn block variant="tonal" color="white" rounded="xl" class="mt-4">مشاهده جزئیات</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </DefaultLayout>
</template>

<style>
.ag-theme-alpine {
  --ag-font-family: 'Vazirmatn', sans-serif;
  --ag-border-color: transparent;
  --ag-header-background-color: rgba(var(--v-theme-primary), 0.05);
  --ag-odd-row-background-color: #fbf9f5;
  --ag-border-radius: 16px;
}

.ag-header-cell-label {
  justify-content: flex-start;
  font-weight: 700;
  color: var(--color-primary);
}

.ag-cell {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
</style>
