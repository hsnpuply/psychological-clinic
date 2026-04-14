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
  <div v-if="item.section" class="px-8 py-4 mt-6">
    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">{{ item.title }}</span>
  </div>
  
  <div v-else :class="['w-full', depth > 0 ? 'relative' : '']">
    <div
      class="group flex items-center justify-between px-8 py-3.5 cursor-pointer transition-all duration-300 hover:bg-primary/5 rounded-lg mx-3 my-1"
      :class="{ 'bg-primary/5': isOpen && hasChildren }"
      @click="toggle"
    >
      <div class="flex items-center gap-4">
        <!-- FontAwesome Icon -->
        <div v-if="item.icon" class="w-6 flex justify-center items-center">
          <i 
            :class="[item.icon, 'text-lg transition-colors duration-300', (isOpen && hasChildren) ? 'text-primary' : 'text-gray-400 group-hover:text-primary']"
          ></i>
        </div>
        
        <!-- Indent spacer for nested items -->
        <div v-else-if="depth > 0" class="w-6 flex justify-center items-center">
           <div class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></div>
        </div>

        <!-- Title -->
        <span 
          :class="[
            'text-[14px] transition-colors duration-300 tracking-tight',
            depth === 0 ? 'font-bold text-gray-700' : 'font-medium text-gray-500',
            'group-hover:text-primary',
            { 'text-primary': isOpen && hasChildren }
          ]"
        >
          {{ item.title }}
        </span>
      </div>

      <!-- Arrow/Plus/Minus (RTL: on the left) -->
      <div v-if="hasChildren" class="flex items-center">
        <i 
          :class="[
            'fas transition-all duration-300 text-[10px]',
            isOpen ? 'fa-minus text-primary' : 'fa-plus text-gray-300 group-hover:text-primary'
          ]"
        ></i>
      </div>
    </div>

    <!-- Children with hierarchy line -->
    <div v-if="hasChildren && isOpen" class="w-full relative pr-4">
      <!-- Vertical line for nested items (RTL: on the right) -->
      <div 
        class="absolute right-[43px] top-0 bottom-0 w-[1.5px] bg-gray-100 rounded-full"
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
i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
