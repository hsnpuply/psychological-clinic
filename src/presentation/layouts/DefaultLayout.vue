<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/application/stores/auth";
import NewAppointmentModal from "@/presentation/components/NewAppointmentModal.vue";
import SidebarItem from "@/presentation/components/SidebarItem.vue";

const router = useRouter();
const authStore = useAuthStore();

const drawer = ref(true);
const showNewAppointmentModal = ref(false);

const menuItems = [
  {
    title: "داشبورد",
    icon: "fas fa-th-large",
    route: "/dashboard",
  },
  {
    title: "مدیریت",
    section: true,
  },
  {
    title: "نوبت‌ها",
    icon: "fas fa-calendar-check",
    children: [
      { title: "لیست نوبت‌ها", route: "/appointments" },
    ],
  },
  {
    title: "مراجعین",
    icon: "fas fa-users",
    children: [
      { title: "لیست مراجعین", route: "/clients" },
    ],
  },
  {
    title: "درمانگران",
    icon: "fas fa-user-md",
    children: [
      { title: "لیست درمانگران", route: "/therapists" },
    ],
  },
  {
    title: "تنظیمات",
    icon: "fas fa-cog",
    route: "/settings",
  },
];

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
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
    <div
      class="px-8 py-4 flex items-start  justify-center border-b border-gray-300 "
    >
      <div class="flex items-start justify-end  w-full gap-3">
        <div class="flex flex-col items-end">
          <span
            class="text-base font-black text-gray-800 tracking-tighter uppercase"
            >امـیـد بـاران</span
          >
          <span
            class="text-xs font-semibold  text-gray-600 tracking-tighter uppercase"
            >کیلینک روانشناسی</span
          >
        </div>
        <div
          class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <i class="fas fa-brain text-white text-lg"></i>
        </div>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="flex-1 overflow-y-auto pb-10 pt-6 bg-green-50/5 h-full">
      <SidebarItem v-for="item in menuItems" :key="item.title" :item="item" />
    </div>

    <template v-slot:append>
      <div dir="rtl" class="!p-2 border-t text-center border-gray-50 felx flex-col gap-0.5 items-start">
        <p class="text-sm text-gray-800">نرم افزار مدیریت کیلینک </p>
        <p>نسخه 

            <span class=" text-sm text-gray-900/90">1.0.0</span>
        </p>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar
    flat
    class="bg-white/80 backdrop-blur-md px-8 border-b border-gray-50 h-20 rtl"
  >
    <div class="flex items-center gap-6 w-full">
      <v-text-field
        placeholder="جستجو در کلینیک..."
        hide-details
        density="compact"
        variant="solo"
        flat
        bg-color="gray-50"
        rounded="lg"
        class="max-w-md"
      >
        <template v-slot:prepend-inner>
          <i class="fas fa-search text-gray-400"></i>
        </template>
      </v-text-field>

      <v-spacer></v-spacer>

      <div class="flex items-center gap-4">
        <v-btn icon variant="text" color="gray-400" size="small">
          <i class="far fa-bell"></i>
        </v-btn>
        <v-btn icon variant="text" color="gray-400" size="small">
          <i class="fas fa-th"></i>
        </v-btn>

        <v-divider vertical inset class="mx-4 h-8"></v-divider>

        <div class="flex items-center gap-4 cursor-pointer group">
          <div class="text-left">
            <p
              class="text-sm font-black text-gray-800 group-hover:text-primary transition-colors"
            >
              سارا احمدی
            </p>
            <p class="text-[10px] text-gray-400 font-bold text-right">
              مدیر سیستم
            </p>
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
