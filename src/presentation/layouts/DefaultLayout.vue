<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/application/stores/auth';
import NewAppointmentModal from '@/presentation/components/NewAppointmentModal.vue';
import SidebarItem from '@/presentation/components/SidebarItem.vue';

const router = useRouter();
const authStore = useAuthStore();

const drawer = ref(true);
const showNewAppointmentModal = ref(false);

const menuItems = [
  { title: 'داشبوردها', icon: 'mdi-view-grid-outline', children: [
    { title: 'داشبورد اصلی', route: '/' },
    { title: 'گزارشات', route: '/reports' },
  ]},
  { title: 'کاربر', section: true },
  { title: 'پروفایل عمومی', icon: 'mdi-account-circle-outline', children: [
    { title: 'مشاهده پروفایل', route: '/profile' },
    { title: 'تنظیمات حریم خصوصی', route: '/privacy' },
  ]},
  { title: 'حساب من', icon: 'mdi-cog-outline', children: [
    { title: 'خانه حساب', children: [
      { title: 'شروع کار', route: '/start' },
      { title: 'پروفایل کاربر', route: '/user-profile' },
      { title: 'پروفایل شرکت', route: '/company' },
      { title: 'تنظیمات - با سایدبار', route: '/settings-sidebar' },
      { title: 'تنظیمات - سازمانی', route: '/settings-enterprise' },
      { title: 'تنظیمات - ساده', route: '/settings-plain' },
      { title: 'تنظیمات - مودال', route: '/settings-modal' },
    ]},
    { title: 'صورتحساب', route: '/billing' },
    { title: 'امنیت', route: '/security' },
    { title: 'اعضا و نقش‌ها', route: '/members' },
  ]},
  { title: 'شبکه', icon: 'mdi-account-group-outline', children: [
    { title: 'لیست مراجعین', route: '/patients' },
    { title: 'لیست درمانگران', route: '/therapists' },
  ]},
  { title: 'احراز هویت', icon: 'mdi-shield-lock-outline', children: [
    { title: 'ورود', route: '/login' },
    { title: 'فراموشی رمز', route: '/forgot' },
  ]},
];

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <v-navigation-drawer 
    v-model="drawer" 
    location="right" 
    permanent 
    width="300"
    class="border-l border-gray-100"
  >
    <!-- Logo Section -->
    <div class="px-8 py-10 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <v-icon icon="mdi-psychology" color="white" size="22"></v-icon>
        </div>
        <span class="text-xl font-black text-gray-800 tracking-tighter uppercase">Omid Baran</span>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="flex-1 overflow-y-auto pb-10">
      <SidebarItem
        v-for="item in menuItems"
        :key="item.title"
        :item="item"
      />
    </div>

    <template v-slot:append>
      <div class="pa-8 border-t border-gray-50 space-y-4">
        <v-btn
          block
          color="primary"
          rounded="xl"
          elevation="0"
          class="font-bold py-7 text-md"
          prepend-icon="mdi-plus"
          @click="showNewAppointmentModal = true"
        >
          ثبت نوبت جدید
        </v-btn>
        <v-btn
          block
          color="gray"
          variant="text"
          class="text-gray-400 font-bold hover:text-red-500 transition-colors"
          prepend-icon="mdi-logout"
          @click="handleLogout"
        >
          خروج از سیستم
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar flat class="bg-white/80 backdrop-blur-md px-8 border-b border-gray-50 h-20">
    <div class="flex items-center gap-6 w-full">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        placeholder="جستجو در کلینیک..."
        hide-details
        density="compact"
        variant="solo"
        flat
        bg-color="gray-50"
        rounded="lg"
        class="max-w-md"
      ></v-text-field>
      
      <v-spacer></v-spacer>
      
      <div class="flex items-center gap-4">
        <v-btn icon="mdi-bell-outline" variant="text" color="gray-400" size="small"></v-btn>
        <v-btn icon="mdi-apps" variant="text" color="gray-400" size="small"></v-btn>
        
        <v-divider vertical inset class="mx-4 h-8"></v-divider>
        
        <div class="flex items-center gap-4 cursor-pointer group">
          <div class="text-left">
            <p class="text-sm font-black text-gray-800 group-hover:text-primary transition-colors">سارا احمدی</p>
            <p class="text-[10px] text-gray-400 font-bold text-right">مدیر سیستم</p>
          </div>
          <v-avatar size="42" class="border-2 border-primary/10">
            <v-img src="https://picsum.photos/seed/admin/100/100"></v-img>
          </v-avatar>
        </div>
      </div>
    </div>
  </v-app-bar>

  <v-main class="bg-background">
    <v-container fluid class="pa-8">
      <slot />
    </v-container>
  </v-main>

  <NewAppointmentModal v-model="showNewAppointmentModal" />
</template>

<style scoped>
.v-navigation-drawer {
  border-left: 1px solid rgba(var(--v-border-color), 0.12) !important;
}
</style>
