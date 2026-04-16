<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

interface MenuItem {
  title: string;
  icon?: string;
  to?: string;
  children?: MenuItem[];
  section?: boolean;
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

const route = useRoute();
const isActive = computed(() => {
  if (props.item.to === route.path) return true;
  if (hasChildren.value) {
    return props.item.children?.some(child => child.to === route.path);
  }
  return false;
});

// Auto-open if child is active
watchEffect(() => {
  if (hasChildren.value && props.item.children?.some(child => child.to === route.path)) {
    isOpen.value = true;
  }
});
</script>

<template>
  <div class="flex flex-col w-full">
    <component
      :is="item.to ? 'NuxtLink' : 'div'"
      :to="item.to"
      class="group flex flex-row-reverse items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
      :class="[
        isActive ? 'bg-[#2c6767]/10 text-[#2c6767]' : 'hover:bg-gray-50 text-gray-600',
        depth > 0 ? 'mr-4' : ''
      ]"
      @click="toggle"
    >
      <div class="flex flex-row-reverse items-center gap-3">
        <UIcon
          v-if="item.icon"
          :name="item.icon"
          class="text-xl transition-colors duration-200"
          :class="isActive ? 'text-[#2c6767]' : 'text-gray-400 group-hover:text-[#2c6767]'"
        />
        <span
          v-else-if="depth > 0"
          class="w-1.5 h-1.5 rounded-full transition-all duration-200"
          :class="isActive ? 'bg-[#2c6767] scale-125' : 'bg-gray-300 group-hover:bg-[#2c6767]'"
        ></span>

        <span class="text-sm font-semibold whitespace-nowrap">
          {{ item.title }}
        </span>
      </div>

      <UIcon
        v-if="hasChildren"
        name="i-heroicons-chevron-left"
        class="text-xs transition-transform duration-200"
        :class="[isOpen ? '-rotate-90 text-[#2c6767]' : 'text-gray-300 group-hover:text-[#2c6767]']"
      />
    </component>

    <div v-if="hasChildren && isOpen" class="flex flex-col mt-1">
      <SidebarItem
        v-for="child in item.children"
        :key="child.title"
        :item="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>
