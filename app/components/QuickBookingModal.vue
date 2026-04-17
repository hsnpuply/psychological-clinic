<script setup lang="ts">
import { ref, computed } from 'vue'
import moment from 'jalali-moment'
import { DayOfWeekLabels } from '~/utils/enums'

const emit = defineEmits(['close'])

const { data: therapists, pending } = await useFetch('/api/therapists')

const selectedTherapistId = ref(null)

const selectedTherapist = computed(() => {
  if (!therapists.value) return null
  return therapists.value.find((t: any) => t.id === selectedTherapistId.value)
})

const therapistOptions = computed(() => {
  if (!therapists.value) return []
  return therapists.value
    .filter((t: any) => t.status === 'فعال')
    .map((t: any) => ({
      value: t.id,
      label: t.name
    }))
})

// Generate days for the current Jalali month
const currentMonthDays = computed(() => {
  const today = moment()
  const daysInMonth = moment.jDaysInMonth(today.jYear(), today.jMonth())
  const monthStart = today.clone().startOf('jMonth')
  
  const days = []
  
  // Calculate padding for the first day of the month
  // In Iran, week starts on Saturday.
  // moment.jDay() ? No, moment does not have jDay().
  // Let's rely on standard day() where Sat = 6, Sun = 0 ... Fri = 5
  // We want Sat = 0, Sun = 1, ... Fri = 6
  let firstDayDow = monthStart.day() + 1
  if (firstDayDow === 7) firstDayDow = 0 // If Saturday (6) + 1 = 7 -> 0
  
  for (let i = 0; i < firstDayDow; i++) {
    days.push(null) // Empty days for offset
  }

  for (let i = 0; i < daysInMonth; i++) {
    const date = monthStart.clone().add(i, 'days')
    const isPast = date.isBefore(today, 'day')
    const isToday = date.isSame(today, 'day')
    
    // Day of week in Jalali mapping for our DB enum:
    // Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7
    let enumDow = date.day() + 2
    if (enumDow > 7) enumDow -= 7
    
    days.push({
      date: date,
      dayNum: date.format('jDD'), // e.g., "01", "12"
      monthName: date.format('jMMMM'),
      isPast,
      isToday,
      enumDow,
      formattedDate: date.format('jYYYY/jMM/jDD')
    })
  }
  return days
})

const therapistAvailability = computed(() => {
  if (!selectedTherapist.value) return []
  const availableDays = selectedTherapist.value.availableDays || []
  const times = selectedTherapist.value.availableTimes || []
  
  return currentMonthDays.value.map(day => {
    if (!day) return null // Padding
    
    const isAvailable = availableDays.includes(day.enumDow) && !day.isPast
    return {
      ...day,
      isAvailable,
      times: isAvailable ? times : []
    }
  })
})

const fastestAvailableSlot = computed(() => {
  if (!selectedTherapist.value) return null
  const available = therapistAvailability.value.filter(d => d && d.isAvailable)
  if (available.length > 0) {
    return {
      date: available[0].formattedDate,
      dayNum: available[0].dayNum,
      monthName: available[0].monthName,
      dayName: DayOfWeekLabels[available[0].enumDow as keyof typeof DayOfWeekLabels],
      times: available[0].times
    }
  }
  return null
})

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
</script>

<template>
  <UCard class="rtl" :ui="{ header: { padding: 'p-6' }, body: { padding: 'p-0 text-gray-700' } }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 text-amber-500 rounded-xl flex items-center justify-center">
            <UIcon name="i-heroicons-bolt text-xl" />
          </div>
          <div>
            <h3 class="text-xl font-black text-gray-800">رزرو سریع نوبت (Bolt)</h3>
            <p class="text-xs text-gray-500 mt-1">بررسی سریع‌ترین زمان خالی متخصص</p>
          </div>
        </div>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="emit('close')" />
      </div>
    </template>

    <div class="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 bg-gray-50/50">
      <div class="w-full md:w-1/2">
        <label class="text-xs font-bold text-gray-500 mb-2 block">انتخاب درمانگر</label>
        <USelectMenu
          v-model="selectedTherapistId"
          :options="therapistOptions"
          value-attribute="value"
          option-attribute="label"
          placeholder="جستجوی متخصص..."
          icon="i-heroicons-user"
          size="xl"
          :loading="pending"
          class="shadow-sm"
        />
      </div>

      <div v-if="selectedTherapist" class="w-full md:w-1/2 flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        <img :src="`https://picsum.photos/seed/${selectedTherapist.id}/100/100`" class="w-12 h-12 rounded-xl object-cover" />
        <div>
          <div class="font-black text-gray-800">{{ selectedTherapist.name }}</div>
          <div class="text-[10px] text-gray-400 font-bold mt-1">کد نظام: {{ selectedTherapist.medicalCouncilNumber }}</div>
        </div>
      </div>
    </div>

    <div v-if="!selectedTherapist" class="p-12 text-center text-gray-400">
      <UIcon name="i-heroicons-calendar-days" class="text-5xl opacity-20 mb-4" />
      <p class="font-medium">برای مشاهده تقویم و سریع‌ترین زمان رزرو، یک درمانگر انتخاب کنید.</p>
    </div>

    <div v-else class="p-6">
      
      <!-- Fastest Slot Banner -->
      <div v-if="fastestAvailableSlot" class="mb-8 relative overflow-hidden bg-gradient-to-l from-amber-400 to-amber-500 p-6 rounded-2xl text-white shadow-[0_10px_20px_-10px_rgba(245,158,11,0.5)]">
        <UIcon name="i-heroicons-bolt" class="absolute left-4 bottom-4 text-7xl opacity-20 text-white" />
        <div class="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <div class="text-amber-100 font-bold text-xs uppercase tracking-widest mb-1">سریع‌ترین زمان ممکن ⚡</div>
            <div class="text-2xl font-black">
              {{ fastestAvailableSlot.dayName }}، {{ fastestAvailableSlot.dayNum }} {{ fastestAvailableSlot.monthName }}
            </div>
            <div class="text-sm font-medium text-amber-50 mt-1 border-b border-amber-300/30 pb-1 w-max">تاریخ: {{ fastestAvailableSlot.date }}</div>
          </div>
          
          <div class="flex flex-col gap-2 bg-white/10 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
            <span class="text-[10px] font-black text-amber-100 uppercase tracking-wider text-center">ساعت‌های حضور</span>
            <div class="flex gap-2">
              <span v-for="time in fastestAvailableSlot.times" :key="time" class="bg-white text-amber-600 px-3 py-1 rounded-lg text-sm font-black dir-ltr">
                {{ time }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <UButton color="white" variant="solid" class="text-amber-600 font-black px-8 rounded-xl shadow-md">ثبت قطعی نوبت</UButton>
        </div>
      </div>

      <div v-else class="mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
         <p class="text-gray-500 font-bold">هیچ تایم خالی برای این ماه ثبت نشده است.</p>
      </div>

      <!-- Calendar View -->
      <div class="mt-4">
        <div class="flex justify-between items-center mb-4">
          <h4 class="font-black text-gray-700">تقویم حضور این ماه</h4>
        </div>
        
        <div class="grid grid-cols-7 gap-1 md:gap-3">
          <!-- Days Header -->
          <div v-for="day in weekDays" :key="day" class="text-center font-bold text-gray-400 text-[10px] py-2">
            {{ day }}
          </div>
          
          <!-- Days Grid -->
          <template v-for="(day, index) in therapistAvailability" :key="index">
            <!-- Empty offset space -->
            <div v-if="!day" class="aspect-square bg-transparent"></div>
            
            <!-- Real day -->
            <UTooltip v-else :text="day.isAvailable ? `تایم خالی: ${day.times.join(' و ')}` : (day.isPast ? 'گذشته' : 'عدم حضور')" placement="top">
              <div 
                class="aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 cursor-pointer relative overflow-hidden"
                :class="[
                  day.isAvailable 
                    ? 'bg-teal-50 border-teal-100 text-[#2c6767] hover:bg-teal-100 hover:scale-105 shadow-sm' 
                    : (day.isPast ? 'bg-gray-50 border-gray-100 text-gray-400 opacity-50 grayscale' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50')
                ]"
              >
                <!-- Fastest slot indicator on calendar -->
                <div v-if="fastestAvailableSlot?.date === day.formattedDate" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50"></div>
                
                <span class="text-sm md:text-lg font-black">{{ day.dayNum }}</span>
                <span v-if="day.isToday" class="text-[9px] bg-[#2c6767] text-white px-2 py-0.5 rounded-full mt-1">امروز</span>
              </div>
            </UTooltip>
          </template>
        </div>
      </div>
      
    </div>

  </UCard>
</template>
