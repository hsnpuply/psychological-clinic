<script setup lang="ts">
const route = useRoute();
const therapistId = route.params.id as string;

const { data: therapist } = await useFetch(`/api/therapists?id=${therapistId}`)

const showBookingModal = ref(false);
const showEditModal = ref(false);

const goBack = () => {
  navigateTo('/therapists');
};

const newReview = ref({
  rating: 5,
  comment: '',
});

const submitReview = () => {
  if (newReview.value.comment.trim() && therapist.value) {
    therapist.value.reviews = therapist.value.reviews || [];
    therapist.value.reviews.unshift({
      name: 'کاربر مهمان',
      rating: newReview.value.rating,
      comment: newReview.value.comment,
      date: 'امروز',
    });
    newReview.value.comment = '';
    newReview.value.rating = 5;
  }
};
</script>

<template>
  <div v-if="therapist" class="space-y-8">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4">
      <UButton icon="i-heroicons-arrow-right" variant="ghost" color="gray" @click="goBack" />
      <h1 class="text-3xl font-black text-gray-800">پروفایل درمانگر</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
      <!-- Profile Sidebar -->
      <div class="md:col-span-4 space-y-6">
        <UCard :ui="{ body: { padding: 'p-6' }, rounded: 'rounded-2xl' }" class="text-center">
          <UAvatar :src="`https://picsum.photos/seed/${therapist.id}/400/400`" size="3xl" class="mb-6 mx-auto ring-4 ring-gray-50" />
          <h2 class="text-2xl font-black text-gray-800 mb-1">{{ therapist.name }}</h2>
          <UBadge color="blue" variant="subtle" class="mb-6 font-bold">
            {{ therapist.specialty }}
          </UBadge>

          <div class="space-y-3 mb-6">
            <UButton
              block
              label="ثبت نوبت جدید"
              icon="i-heroicons-calendar-plus"
              size="lg"
              class="rounded-xl bg-[#2c6767] hover:bg-[#1e4a4a] font-bold"
              @click="showBookingModal = true"
            />
            <UButton
              block
              label="ویرایش پروفایل"
              icon="i-heroicons-pencil-square"
              variant="outline"
              color="gray"
              size="lg"
              class="rounded-xl font-bold"
              @click="showEditModal = true"
            />
          </div>
          
          <UDivider class="mb-6" />
          
          <div class="space-y-4 text-right">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-identification" class="text-[#2c6767] text-xl" />
              <div>
                <p class="text-[10px] text-gray-400 font-bold">شماره نظام پزشکی</p>
                <p class="font-bold text-gray-700">{{ therapist.id }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-envelope" class="text-[#2c6767] text-xl" />
              <div>
                <p class="text-[10px] text-gray-400 font-bold">ایمیل</p>
                <p class="font-bold text-gray-700">{{ therapist.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-phone" class="text-[#2c6767] text-xl" />
              <div>
                <p class="text-[10px] text-gray-400 font-bold">شماره تماس</p>
                <p class="font-bold text-gray-700">{{ therapist.phone }}</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Main Content -->
      <div class="md:col-span-8 space-y-6">
        <!-- Bio Section -->
        <UCard :ui="{ rounded: 'rounded-2xl' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-user-circle" class="text-[#2c6767]" />
              <span class="font-bold text-gray-800">بیوگرافی و تخصص</span>
            </div>
          </template>
          <p class="text-gray-600 leading-relaxed">
            {{ therapist.bio }}
          </p>
        </UCard>

        <!-- Education Section -->
        <UCard :ui="{ rounded: 'rounded-2xl' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-academic-cap" class="text-[#2c6767]" />
              <span class="font-bold text-gray-800">تحصیلات</span>
            </div>
          </template>
          <ul class="space-y-3">
            <li v-for="(edu, index) in therapist.education" :key="index" class="flex items-center gap-3 text-gray-600">
              <UIcon name="i-heroicons-check-circle" class="text-[#2c6767] text-sm" />
              <span class="text-sm font-medium">{{ edu }}</span>
            </li>
          </ul>
        </UCard>

        <!-- Specializations Section -->
        <UCard :ui="{ rounded: 'rounded-2xl' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-sparkles" class="text-[#2c6767]" />
              <span class="font-bold text-gray-800">حوزه‌های تخصصی</span>
            </div>
          </template>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(spec, index) in therapist.specializations"
              :key="index"
              color="blue"
              variant="subtle"
              class="rounded-lg font-bold"
            >
              {{ spec }}
            </UBadge>
          </div>
        </UCard>

        <!-- Schedule Section -->
        <UCard :ui="{ rounded: 'rounded-2xl' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calendar" class="text-[#2c6767]" />
              <span class="font-bold text-gray-800">برنامه حضور در کلینیک</span>
            </div>
          </template>
          <UTable
            :rows="therapist.schedule || []"
            :columns="[{ key: 'day', label: 'روز', id: 'day' }, { key: 'hours', label: 'ساعت حضور', id: 'hours' }]"
            :ui="{ 
              th: { base: 'text-right font-bold text-gray-500' },
              td: { base: 'text-right text-sm text-gray-600' }
            }"
          />
        </UCard>

        <!-- Reviews Section -->
        <UCard :ui="{ rounded: 'rounded-2xl' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="text-[#2c6767]" />
              <span class="font-bold text-gray-800">نظرات و امتیازات مراجعین</span>
            </div>
          </template>
          
          <div class="space-y-8">
            <!-- Review List -->
            <div class="space-y-6">
              <div v-for="(review, index) in therapist.reviews || []" :key="index" class="border-b border-gray-100 pb-6 last:border-0">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center gap-3">
                    <UAvatar :alt="review.name" size="xs" class="bg-blue-50 text-blue-600 font-bold" />
                    <div>
                      <p class="text-sm font-bold text-gray-800">{{ review.name }}</p>
                      <p class="text-[10px] text-gray-400 font-bold">{{ review.date }}</p>
                    </div>
                  </div>
                  <div class="flex gap-0.5">
                    <UIcon v-for="i in 5" :key="i" name="i-heroicons-star" :class="i <= review.rating ? 'text-amber-400' : 'text-gray-200'" class="text-xs" />
                  </div>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ review.comment }}
                </p>
              </div>
            </div>

            <!-- Add Review Form -->
            <div class="pt-8 border-t border-gray-100">
              <h4 class="text-lg font-black text-gray-800 mb-4">ثبت نظر شما</h4>
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-sm font-bold text-gray-600">امتیاز شما:</span>
                  <div class="flex gap-1">
                    <UIcon
                      v-for="i in 5"
                      :key="i"
                      name="i-heroicons-star"
                      :class="i <= newReview.rating ? 'text-amber-400' : 'text-gray-200'"
                      class="text-xl cursor-pointer"
                      @click="newReview.rating = i"
                    />
                  </div>
                </div>
                <UTextarea
                  v-model="newReview.comment"
                  placeholder="تجربه خود را از جلسات درمانی بنویسید..."
                  class="w-full"
                  :rows="3"
                  :ui="{ rounded: 'rounded-xl' }"
                />
                <div class="flex justify-end">
                  <UButton
                    label="ارسال نظر"
                    size="lg"
                    class="rounded-xl px-8 bg-[#2c6767] hover:bg-[#1e4a4a] font-bold"
                    @click="submitReview"
                    :disabled="!newReview.comment.trim()"
                  />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Modals -->
    <UModal v-model="showBookingModal">
      <NewAppointmentModal @close="showBookingModal = false" :initial-therapist="therapist.name" />
    </UModal>
    
    <UModal v-model="showEditModal">
      <EditTherapistProfileModal :therapist="therapist" @close="showEditModal = false" />
    </UModal>
  </div>
</template>
