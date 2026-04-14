<script setup lang="ts">
import { ref, computed } from 'vue';

interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  section?: boolean;
}

const props = defineProps<{
  item: MenuItem;
  depth?: number;
}>();

const isOpen = ref(false);
const depth = computed(() => props.depth || 0);

const hasChildren = computed(() => props.item.children && props.item.children.length > 0);

const toggle = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <div v-if="item.section" class="px-8 py-4 mt-4">
    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{{ item.title }}</span>
  </div>
  
  <div v-else :class="['w-full', depth > 0 ? 'relative' : '']">
    <div
      class="group flex items-center justify-between px-8 py-2.5 cursor-pointer transition-all duration-200 hover:bg-gray-50"
      :class="{ 'bg-gray-50/50': isOpen && hasChildren }"
      @click="toggle"
    >
      <div class="flex items-center gap-3">
        <!-- Icon (only for depth 0 or if explicitly provided) -->
        <v-icon 
          v-if="item.icon" 
          :icon="item.icon" 
          size="20" 
          class="text-gray-400 group-hover:text-primary transition-colors"
          :class="{ 'text-primary': isOpen && hasChildren }"
        ></v-icon>
        
        <!-- Indent spacer for nested items -->
        <div v-else-if="depth > 0" class="w-5"></div>

        <!-- Title -->
        <span 
          :class="[
            'text-[13px] transition-colors tracking-tight',
            depth === 0 ? 'font-bold text-gray-700' : 'text-gray-500 font-medium',
            'group-hover:text-primary',
            { 'text-primary': isOpen && hasChildren }
          ]"
        >
          {{ item.title }}
        </span>
      </div>

      <!-- Arrow/Plus/Minus -->
      <v-icon
        v-if="hasChildren"
        :icon="isOpen ? 'mdi-minus' : 'mdi-plus'"
        size="14"
        class="text-gray-300 group-hover:text-primary"
        :class="{ 'text-primary': isOpen && hasChildren }"
      ></v-icon>
    </div>

    <!-- Children -->
    <div v-if="hasChildren && isOpen" class="w-full relative">
      <!-- Vertical line for nested items -->
      <div 
        class="absolute right-[41px] top-0 bottom-0 w-[1px] bg-gray-100"
      ></div>
      
      <SidebarItem
        v-for="child in item.children"
        :key="child.title"
        :item="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<style scoped>
/* Ensure RTL consistency */
.v-icon {
  transform: scaleX(-1);
}
</style>
