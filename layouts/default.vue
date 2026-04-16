<script setup lang="ts">
const drawer = ref(true);
const showNewAppointmentModal = ref(false);

const menuItems = [
  {
    title: "داشبورد",
    icon: "i-heroicons-squares-2x2",
    to: "/",
  },
  {
    title: "مدیریت",
    section: true,
  },
  {
    title: "نوبت‌ها",
    icon: "i-heroicons-calendar-days",
    children: [
      { title: "لیست نوبت‌ها", to: "/appointments" },
    ],
  },
  {
    title: "مراجعین",
    icon: "i-heroicons-users",
    children: [
      { title: "لیست مراجعین", to: "/patients" },
    ],
  },
  {
    title: "درمانگران",
    icon: "i-heroicons-user-group",
    children: [
      { title: "لیست درمانگران", to: "/therapists" },
    ],
  },
  {
    title: "تنظیمات",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
  },
];

const handleLogout = () => {
  // authStore.logout();
  navigateTo("/login");
};
</script>

<template>
  <div class="min-h-screen bg-[#fbf9f5] flex rtl">
    <!-- Sidebar -->
    <aside
      v-if="drawer"
      class="w-72 bg-white border-l border-gray-200 flex flex-col fixed inset-y-0 right-0 z-50"
    >
      <!-- Logo Section -->
      <div class="px-8 py-6 flex items-center justify-between border-b border-gray-100">
        <div class="flex flex-col items-end">
          <span class="text-base font-black text-gray-800 tracking-tighter uppercase">امـیـد بـاران</span>
          <span class="text-[10px] font-semibold text-gray-500 tracking-tighter uppercase">کلینیک روانشناسی</span>
        </div>
        <div class="w-10 h-10 bg-[#2c6767] rounded-xl flex items-center justify-center shadow-lg shadow-[#2c6767]/20">
          <UIcon name="i-heroicons-academic-cap" class="text-white text-xl" />
        </div>
      </div>

      <!-- Menu Items -->
      <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <template v-for="item in menuItems" :key="item.title">
          <div v-if="item.section" class="px-4 pt-4 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {{ item.title }}
          </div>
          <SidebarItem v-else :item="item" />
        </template>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100 text-center">
        <p class="text-[10px] text-gray-400">نرم افزار مدیریت کلینیک</p>
        <p class="text-[10px] text-gray-500 font-bold">نسخه 1.0.0</p>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['flex-1 flex flex-col transition-all duration-300', drawer ? 'mr-72' : 'mr-0']">
      <!-- Header -->
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
        <div class="flex items-center gap-6 flex-1">
          <UInput
            icon="i-heroicons-magnifying-glass"
            placeholder="جستجو در کلینیک..."
            class="max-w-md w-full"
            variant="none"
            color="gray"
            :ui="{ icon: { leading: { pointer: '' } } }"
          />
        </div>

        <div class="flex items-center gap-4">
          <UButton icon="i-heroicons-bell" color="gray" variant="ghost" />
          <UButton icon="i-heroicons-squares-plus" color="gray" variant="ghost" />
          
          <div class="h-8 w-px bg-gray-200 mx-2"></div>

          <UDropdown :items="[[{ label: 'پروفایل', icon: 'i-heroicons-user' }, { label: 'خروج', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }]]" :ui="{ width: 'w-48' }">
            <div class="flex items-center gap-3 cursor-pointer group">
              <div class="text-left">
                <p class="text-sm font-black text-gray-800 group-hover:text-[#2c6767] transition-colors">سارا احمدی</p>
                <p class="text-[10px] text-gray-400 font-bold text-right">مدیر سیستم</p>
              </div>
              <UAvatar src="https://picsum.photos/seed/admin/100/100" alt="Admin" size="sm" class="ring-2 ring-[#2c6767]/10" />
            </div>
          </UDropdown>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <slot />
      </main>
    </div>

    <!-- Modals -->
    <UModal v-model="showNewAppointmentModal">
      <NewAppointmentModal @close="showNewAppointmentModal = false" />
    </UModal>
  </div>
</template>
