<script setup lang="ts">
import { ref, computed } from "vue";

interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  section?: boolean;
  badge?: string | number;
  badgeColor?: string;
}

const props = defineProps<{
  item: MenuItem;
  depth?: number;
}>();

const isOpen = ref(false);
const depth = computed(() => props.depth ?? 0);
const hasChildren = computed(() => !!props.item.children?.length);

const toggle = () => {
  if (hasChildren.value) isOpen.value = !isOpen.value;
};

const badgeClasses: Record<string, string> = {
  primary: "bg-blue-500/10 text-blue-500",
  success: "bg-emerald-500/10 text-emerald-500",
  danger: "bg-rose-500/10 text-rose-500",
  warning: "bg-yellow-400/10 text-yellow-500",
};
</script>

<template>
  <!-- Section Header -->
  <div
    v-if="item.section"
    class="px-7 pt-3 text-right pb-2 mx-3 flex items-center gap-2"
    dir="rtl"
  >
    <i :class="item.icon" class="text-[.90rem] text-gray-400"></i>
    <span
      class="text-sm font-bold tracking-[0.12em] uppercase text-gray-400 select-none"
    >
      {{ item.title }}
    </span>
  </div>

  <!-- Menu Item -->
  <div v-else class="flex flex-col w-full">
    <!-- Link Row -->
    <div
      class="group flex flex-row-reverse items-center justify-between mx-3 my-1 rounded-[10px] cursor-pointer transition-all duration-200 "
      :class="[
        depth > 0 ? 'px-4 py-2' : 'px-5 py-2',
        isOpen && hasChildren
          ? 'bg-blue-500/[0.08]'
          : 'hover:bg-blue-500/[0.06]',
      ]"
      @click="toggle"
    >
      <!-- Right: Icon + Title -->
      <div class="flex flex-row-reverse items-center gap-3">
        <!-- Icon Box (depth 0 only) -->
        <span
          v-if="item.icon && depth === 0"
          class="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-all duration-200"
          :class="
            isOpen && hasChildren
              ? 'bg-blue-500/10'
              : 'bg-gray-100 group-hover:bg-blue-500/10'
          "
        >
          <i
            :class="[
              item.icon,
              'text-[0.90rem] transition-colors duration-200',
              isOpen && hasChildren
                ? 'text-blue-500'
                : 'text-gray-400 group-hover:text-blue-500',
            ]"
          ></i>
        </span>

        <!-- Bullet (nested) -->
        <span
          v-else-if="depth > 0"
          class="flex items-center justify-center w-5 flex-shrink-0"
        >
          <span
            class="rounded-full transition-all duration-200"
            :class="
              isOpen && hasChildren
                ? 'w-1.25 h-[5px] bg-blue-500 scale-125'
                : 'w-[5px] h-[5px] bg-gray-300 group-hover:bg-blue-500 group-hover:scale-125'
            "
          ></span>
        </span>

        <!-- Title -->
        <span
          class="whitespace-nowrap transition-colors duration-200"
          :class="[
            depth === 0
              ? 'text-[0.875rem] font-semibold text-gray-700'
              : 'text-[0.82rem] font-medium text-gray-500',
            isOpen && hasChildren
              ? 'text-blue-500'
              : 'group-hover:text-blue-500',
          ]"
        >
          {{ item.title }}
        </span>
      </div>

      <!-- Left: Badge + Arrow -->
      <div class="flex items-center gap-2">
        <span
          v-if="item.badge"
          class="inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1.5 rounded-md text-[0.7rem] font-bold"
          :class="badgeClasses[item.badgeColor ?? 'primary']"
        >
          {{ item.badge }}
        </span>

        <span v-if="hasChildren" class="flex items-center">
          <i
            class="fas fa-chevron-left text-[0.65rem] transition-all duration-250"
            :class="
              isOpen
                ? '-rotate-90 text-blue-500'
                : 'text-gray-300 group-hover:text-blue-500'
            "
          ></i>
        </span>
      </div>
    </div>

    <!-- Sub Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out origin-top"
      enter-from-class="opacity-0 scale-y-95"
      enter-to-class="opacity-100 scale-y-100"
      leave-active-class="transition-all duration-200 ease-in origin-top"
      leave-from-class="opacity-100 scale-y-100"
      leave-to-class="opacity-0 scale-y-95"
    >
      <div v-if="hasChildren && isOpen" class="relative pr-11">
        <!-- Vertical line -->
        <div
          class="absolute right-[2.45rem] top-0 bottom-0 w-[1.4px] bg-gradient-to-b from-gray-400 to-gray-300 rounded-full"
        ></div>

        <SidebarItem
          v-for="child in item.children"
          :key="child.title"
          :item="child"
          :depth="depth + 1"
        />
      </div>
    </Transition>
  </div>
</template>
