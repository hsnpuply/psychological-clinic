<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const therapists = ref([
  { name: 'دکتر سارا احمدی', specialty: 'روانشناس بالینی', bio: 'عضو هیئت علمی دانشگاه', id: '۱۴۲۵۵-ن', days: ['ش', 'د', 'چ'], status: 'فعال', statusColor: 'success' },
  { name: 'دکتر امیرحسین رضایی', specialty: 'درمانگر تحلیلی', bio: 'متخصص کودک و نوجوان', id: '۰۸۹۹۱-ن', days: ['ی', 'س'], status: 'فعال', statusColor: 'success' },
  { name: 'مریم توکلی', specialty: 'مشاور خانواده', bio: 'کارشناسی ارشد مشاوره', id: '۲۲۱۰۰-ن', days: ['ش', 'د', 'چ'], status: 'در مرخصی', statusColor: 'outline' },
]);

const viewProfile = (id: string) => {
  router.push({ name: 'therapist-profile', params: { id } });
};
</script>

<template>
  <DefaultLayout>
    <div class="space-y-8 rtl">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 class="text-4xl font-bold text-primary mb-2 tracking-tight">لیست درمانگران</h1>
          <p class="text-on-surface-variant/70 max-w-lg">مدیریت و مشاهده کادر درمانی کلینیک امید باران.</p>
        </div>
        <v-btn color="primary" rounded="xl" size="large" prepend-icon="mdi-account-plus" class="font-bold">
          افزودن درمانگر جدید
        </v-btn>
      </header>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="جستجوی نام یا شماره نظام پزشکی..."
            variant="solo-filled"
            flat
            rounded="xl"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            label="تخصص"
            :items="['روانشناس بالینی', 'روانپزشک', 'مشاور']"
            variant="solo-filled"
            flat
            rounded="xl"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            label="روزهای کاری"
            :items="['شنبه', 'یکشنبه', 'دوشنبه']"
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
              <th class="text-right">نام درمانگر</th>
              <th class="text-right">تخصص</th>
              <th class="text-right">شماره نظام</th>
              <th class="text-right">روزهای حضور</th>
              <th class="text-right">وضعیت</th>
              <th class="text-left">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in therapists" :key="item.id" class="hover:bg-surface-variant/5">
              <td>
                <div class="flex items-center gap-4 py-4">
                  <v-avatar size="48" rounded="full">
                    <v-img :src="`https://picsum.photos/seed/${item.id}/100/100`"></v-img>
                  </v-avatar>
                  <div>
                    <div class="font-bold text-teal-950">{{ item.name }}</div>
                    <div class="text-xs text-on-surface-variant">{{ item.bio }}</div>
                  </div>
                </div>
              </td>
              <td>
                <v-chip color="primary" variant="tonal" size="x-small" class="font-bold">
                  {{ item.specialty }}
                </v-chip>
              </td>
              <td class="font-mono text-sm text-slate-600">{{ item.id }}</td>
              <td>
                <div class="flex gap-1">
                  <v-chip
                    v-for="day in item.days"
                    :key="day"
                    size="x-small"
                    variant="flat"
                    :color="day === 'چ' ? 'primary' : 'surface-variant'"
                    class="min-w-[24px] justify-center"
                  >
                    {{ day }}
                  </v-chip>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :class="`bg-${item.statusColor}`"></div>
                  <span class="text-xs font-medium" :class="`text-${item.statusColor}`">{{ item.status }}</span>
                </div>
              </td>
              <td class="text-left">
                <div class="flex items-center justify-end gap-2">
                  <v-btn icon="mdi-eye" variant="text" size="small" color="secondary" @click="viewProfile(item.id)"></v-btn>
                  <v-btn icon="mdi-pencil" variant="text" size="small" color="tertiary"></v-btn>
                  <v-btn icon="mdi-delete" variant="text" size="small" color="error"></v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </DefaultLayout>
</template>
