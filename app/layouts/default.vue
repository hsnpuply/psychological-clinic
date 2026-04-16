<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const drawer = ref(true);
const showNewAppointmentModal = ref(false);

const menuItems = [
  {
    title: "داشبورد",
    icon: "i-heroicons-squares-2x2",
    to: "/",
  },
  {
    title: "مدیریت کلینیک",
    section: true,
  },
  {
    title: "نوبت‌ها",
    icon: "i-heroicons-calendar-days",
    children: [
      { title: "لیست نوبت‌ها", to: "/appointments" },
      { title: "تقویم نوبت‌دهی", to: "/calendar" },
    ],
  },
  {
    title: "مراجعین",
    icon: "i-heroicons-users",
    children: [
      { title: "لیست مراجعین", to: "/patients" },
      { title: "پرونده‌های الکترونیک", to: "/records" },
    ],
  },
  {
    title: "درمانگران",
    icon: "i-heroicons-user-group",
    children: [
      { title: "لیست درمانگران", to: "/therapists" },
      { title: "تخصص‌ها", to: "/specialties" },
    ],
  },
  {
    title: "تنظیمات",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
  },
];

const toast = useToast()

const handleLogout = async () => {
  await clear()
  toast.add({
    title: 'خروج از سیستم',
    description: 'شما با موفقیت از پنل کاربری خارج شدید',
    color: 'blue'
  })
  navigateTo("/login");
};
</script>

<template>
  <div class="min-h-screen bg-[#fbf9f5] flex rtl font-vazir">
    <UNotifications />
    
    <!-- Sidebar -->
    <aside
      v-if="drawer && loggedIn"
      class="w-72 bg-white border-l border-gray-100 flex flex-col fixed inset-y-0 right-0 z-50 transition-all duration-300 shadow-[20px_0_40px_-15px_rgba(0,0,0,0.03)]"
    >
      <!-- Logo Section -->
      <div class="px-8 py-10 flex items-center justify-between">
        <div class="flex flex-col items-end">
          <span class="text-xl font-black text-gray-800 tracking-tighter uppercase">امـید بـاران</span>
          <span class="text-[10px] font-black text-[#2c6767] uppercase tracking-[0.2em] mt-1 opacity-70">Clinic Management</span>
        </div>
        <div class="w-12 h-12 bg-[#2c6767] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2c6767]/30 transform rotate-12">
          <UIcon name="i-heroicons-academic-cap" class="text-white text-2xl -rotate-12" />
        </div>
      </div>

      <!-- Menu Items -->
      <div class="flex-1 overflow-y-auto py-2 px-4 space-y-1 custom-scrollbar">
        <template v-for="item in menuItems" :key="item.title">
          <div v-if="item.section" class="px-5 pt-8 pb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {{ item.title }}
          </div>
          <SidebarItem v-else :item="item" />
        </template>
      </div>

      <!-- User Profile (Bottom) -->
      <div class="p-6 border-t border-gray-50 bg-gray-50/50">
        <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <UAvatar 
            :src="user?.role === 'admin' ? 'https://picsum.photos/seed/admin/100/100' : 'https://picsum.photos/seed/sec/100/100'" 
            size="sm" 
            class="ring-2 ring-[#2c6767]/10"
          />
          <div class="flex-1 min-w-0">
            <p class="text-xs font-black text-gray-800 truncate">{{ user?.name || 'کاربر سیستم' }}</p>
            <p class="text-[9px] text-gray-400 font-bold">{{ user?.role === 'admin' ? 'مدیر ارشد' : 'منشی کلینیک' }}</p>
          </div>
          <UButton
            icon="i-heroicons-arrow-left-on-rectangle"
            color="gray"
            variant="ghost"
            size="xs"
            square
            class="hover:text-red-500 transition-colors"
            @click="handleLogout"
          />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['flex-1 flex flex-col transition-all duration-300', (drawer && loggedIn) ? 'mr-72' : 'mr-0']">
      <!-- Top Header -->
      <header v-if="loggedIn" class="h-20 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
        <div class="flex items-center gap-6">
          <UButton
            icon="i-heroicons-bars-3-bottom-right"
            color="gray"
            variant="ghost"
            class="lg:hidden"
            @click="drawer = !drawer"
          />
          <div class="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100 group transition-all focus-within:ring-2 focus-within:ring-[#2c6767]/10 focus-within:bg-white">
            <UIcon name="i-heroicons-magnifying-glass" class="text-gray-400 group-focus-within:text-[#2c6767]" />
            <input 
              type="text" 
              placeholder="جستجو در کلینیک..." 
              class="bg-transparent border-none focus:ring-0 text-sm font-medium w-64 text-gray-600 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100">
            <UButton icon="i-heroicons-bell" color="gray" variant="ghost" class="rounded-xl" />
            <UButton icon="i-heroicons-chat-bubble-left-right" color="gray" variant="ghost" class="rounded-xl" />
          </div>
          
          <div class="h-10 w-px bg-gray-100 mx-2"></div>

          <UButton
            icon="i-heroicons-plus-circle"
            label="ثبت نوبت"
            class="bg-[#2c6767] hover:bg-[#1e4a4a] rounded-2xl px-6 font-black shadow-lg shadow-[#2c6767]/20"
            @click="showNewAppointmentModal = true"
          />
        </div>
      </header>

      <!-- Content Area -->
      <main :class="loggedIn ? 'p-8 space-y-8' : ''">
        <slot />
      </main>

      <!-- Footer -->
      <footer v-if="loggedIn" class="p-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400">
        <p>نرم افزار جامع مدیریت کلینیک امید باران &copy; ۲۰۲۴</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-[#2c6767]">پشتیبانی</a>
          <a href="#" class="hover:text-[#2c6767]">راهنما</a>
          <span class="text-[#2c6767]/40 underline underline-offset-4">نسخه 1.2.0</span>
        </div>
      </footer>
    </div>

    <!-- Modals -->
    <UModal v-model="showNewAppointmentModal" :ui="{ rounded: 'rounded-[2rem]' }">
      <NewAppointmentModal @close="showNewAppointmentModal = false" />
    </UModal>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Auth check transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
