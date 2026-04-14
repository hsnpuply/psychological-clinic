<script setup lang="ts">
import { ref } from 'vue';

const patients = ref([
  { name: 'امیرحسین رضایی', therapist: 'دکتر سارانی', mobile: '۰۹۱۲۳۴۵۶۷۸۹', id: 'OB-1402-842', lastVisit: '۱۴۰۲/۱۲/۱۵', status: 'فعال', statusColor: 'success' },
  { name: 'مریم سعادتی', therapist: 'دکتر اکبری', mobile: '۰۹۱۹۸۷۶۵۴۳۲', id: 'OB-1402-911', lastVisit: '۱۴۰۲/۱۲/۲۲', status: 'در انتظار', statusColor: 'warning' },
  { name: 'سینا محبی', therapist: 'دکتر سارانی', mobile: '۰۹۳۵۴۴۳۳۲۲۱', id: 'OB-1402-765', lastVisit: '۱۴۰۲/۱۲/۱۸', status: 'فعال', statusColor: 'success' },
  { name: 'نرگس تهرانی', therapist: 'دکتر هاشمی', mobile: '۰۹۰۱۵۵۴۴۳۳۲', id: 'OB-1401-432', lastVisit: '۱۴۰۲/۱۱/۰۵', status: 'بایگانی شده', statusColor: 'outline' },
]);
</script>

<template>
  <DefaultLayout>
    <div class="space-y-8 rtl">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-4xl font-bold text-on-surface mb-2">لیست مراجعین</h1>
          <p class="text-on-surface-variant max-w-lg leading-relaxed">
            مدیریت پرونده‌های درمانی و دسترسی سریع به تاریخچه جلسات بیماران کلینیک امید باران.
          </p>
        </div>
        <v-btn color="primary" rounded="xl" size="x-large" prepend-icon="mdi-plus" elevation="4">
          افزودن مراجع جدید
        </v-btn>
      </header>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="جستجوی نام مراجع یا شماره پرونده..."
            variant="solo-filled"
            flat
            rounded="xl"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            label="فیلتر وضعیت"
            :items="['فعال', 'در انتظار', 'بایگانی شده']"
            variant="solo-filled"
            flat
            rounded="xl"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            label="مرتب‌سازی"
            :items="['نام', 'تاریخ آخرین ویزیت', 'شماره پرونده']"
            variant="solo-filled"
            flat
            rounded="xl"
            hide-details
          ></v-select>
        </v-col>
      </v-row>

      <v-card rounded="xl" flat border>
        <v-table>
          <thead>
            <tr class="bg-surface-variant/10">
              <th class="text-right">نام مراجع</th>
              <th class="text-right">شماره موبایل</th>
              <th class="text-right">شماره پرونده</th>
              <th class="text-right">آخرین ویزیت</th>
              <th class="text-right">وضعیت</th>
              <th class="text-left">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id" class="hover:bg-surface-variant/5">
              <td>
                <div class="flex items-center gap-4 py-3">
                  <v-avatar rounded="xl" color="secondary-lighten-4">
                    <v-img :src="`https://picsum.photos/seed/${patient.id}/100/100`"></v-img>
                  </v-avatar>
                  <div>
                    <p class="font-bold text-on-surface">{{ patient.name }}</p>
                    <p class="text-xs text-on-surface-variant">درمانگر: {{ patient.therapist }}</p>
                  </div>
                </div>
              </td>
              <td class="text-sm tabular-nums">{{ patient.mobile }}</td>
              <td class="text-sm font-medium tabular-nums">{{ patient.id }}</td>
              <td class="text-sm tabular-nums">{{ patient.lastVisit }}</td>
              <td>
                <v-chip :color="patient.statusColor" size="x-small" label class="font-bold">
                  {{ patient.status }}
                </v-chip>
              </td>
              <td class="text-left">
                <div class="flex items-center justify-end gap-1">
                  <v-btn icon="mdi-eye-outline" variant="text" size="small" color="primary"></v-btn>
                  <v-btn icon="mdi-file-edit-outline" variant="text" size="small" color="tertiary"></v-btn>
                  <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error"></v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        
        <v-card-actions class="pa-4 flex justify-between">
          <span class="text-xs text-on-surface-variant">نمایش ۴ از ۱۴۸ مورد</span>
          <v-pagination :length="15" density="compact" rounded="lg" active-color="primary"></v-pagination>
        </v-card-actions>
      </v-card>
    </div>
  </DefaultLayout>
</template>
