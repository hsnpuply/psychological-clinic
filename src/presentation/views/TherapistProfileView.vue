<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewAppointmentModal from '@/presentation/components/NewAppointmentModal.vue';
import EditTherapistProfileModal from '@/presentation/components/EditTherapistProfileModal.vue';

const route = useRoute();
const router = useRouter();
const therapistId = route.params.id as string;

const showBookingModal = ref(false);
const showEditModal = ref(false);

// Mock data - in a real app, this would be fetched from an API
const therapist = ref({
  name: 'دکتر سارا احمدی',
  specialty: 'روانشناس بالینی',
  id: '۱۴۲۵۵-ن',
  bio: 'دکتر سارا احمدی دارای مدرک دکتری روانشناسی بالینی از دانشگاه تهران و عضو هیئت علمی دانشگاه هستند. ایشان بیش از ۱۰ سال تجربه در زمینه درمان اختلالات اضطرابی و افسردگی دارند و مقالات متعددی در مجلات معتبر بین‌المللی به چاپ رسانده‌اند.',
  email: 's.ahmadi@clinic.com',
  phone: '۰۲۱-۸۸۷۷۶۶۵۵',
  address: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، ساختمان پزشکان امید، طبقه ۴',
  education: [
    'دکتری روانشناسی بالینی - دانشگاه تهران',
    'کارشناسی ارشد روانشناسی عمومی - دانشگاه شهید بهشتی',
  ],
  specializations: [
    'درمان اختلالات اضطرابی و استرس',
    'مشاوره فردی و توسعه فردی',
    'درمان افسردگی و تروما',
    'روان‌درمانی تحلیلی کوتاه مدت',
  ],
  experience: [
    { title: 'روانشناس بالینی ارشد', place: 'بیمارستان روزبه تهران', period: '۱۳۹۶ - تاکنون' },
    { title: 'درمانگر مرکز مشاوره', place: 'دانشگاه شهید بهشتی', period: '۱۳۹۲ - ۱۳۹۶' },
    { title: 'مشاور داوطلب', place: 'سازمان بهزیستی', period: '۱۳۹۰ - ۱۳۹۲' },
  ],
  schedule: [
    { day: 'شنبه', hours: '۰۹:۰۰ - ۱۷:۰۰' },
    { day: 'دوشنبه', hours: '۰۹:۰۰ - ۱۷:۰۰' },
    { day: 'چهارشنبه', hours: '۰۹:۰۰ - ۱۳:۰۰' },
  ],
  onlineSchedule: [
    { day: 'یکشنبه', hours: '۱۸:۰۰ - ۲۱:۰۰' },
    { day: 'سه شنبه', hours: '۱۸:۰۰ - ۲۱:۰۰' },
  ],
  reviews: [
    { name: 'علی رضایی', rating: 5, comment: 'بسیار با حوصله و متخصص هستند. جلسات با ایشان به من کمک زیادی کرد.', date: '۱۴۰۲/۰۷/۱۲' },
    { name: 'مریم کمالی', rating: 4, comment: 'فضای کلینیک عالی و دکتر بسیار حرفه‌ای هستند.', date: '۱۴۰۲/۰۶/۰۵' },
  ],
  image: `https://picsum.photos/seed/${therapistId}/400/400`,
});

const handleSaveProfile = (updatedData: any) => {
  therapist.value = { ...therapist.value, ...updatedData };
};

const newReview = ref({
  rating: 5,
  comment: '',
});

const submitReview = () => {
  if (newReview.value.comment.trim()) {
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

const goBack = () => {
  router.back();
};
</script>

<template>
  <DefaultLayout>
    <div class="space-y-8 rtl">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-4">
        <v-btn variant="text" @click="goBack">
          <i class="fas fa-arrow-right"></i>
        </v-btn>
        <h1 class="text-3xl font-bold text-primary">پروفایل درمانگر</h1>
      </div>

      <v-row>
        <!-- Profile Sidebar -->
        <v-col cols="12" md="4">
          <v-card rounded="xl" flat border class="pa-6 text-center">
            <v-avatar size="160" rounded="xl" class="mb-6 mx-auto elevation-4">
              <v-img :src="therapist.image"></v-img>
            </v-avatar>
            <h2 class="text-2xl font-bold text-teal-950 mb-1">{{ therapist.name }}</h2>
            <v-chip color="primary" variant="tonal" class="mb-6 font-bold">
              {{ therapist.specialty }}
            </v-chip>

            <div class="px-4 mb-3">
              <v-btn
                block
                color="primary"
                size="large"
                rounded="xl"
                elevation="4"
                class="font-bold"
                @click="showBookingModal = true"
              >
                <template v-slot:prepend>
                  <i class="fas fa-calendar-plus ml-2"></i>
                </template>
                ثبت نوبت جدید
              </v-btn>
            </div>

            <div class="px-4 mb-6">
              <v-btn
                block
                variant="outlined"
                color="secondary"
                size="large"
                rounded="xl"
                class="font-bold"
                @click="showEditModal = true"
              >
                <template v-slot:prepend>
                  <i class="fas fa-edit ml-2"></i>
                </template>
                ویرایش پروفایل
              </v-btn>
            </div>
            
            <v-divider class="mb-6"></v-divider>
            
            <div class="space-y-4 text-right">
              <div class="flex items-center gap-3">
                <i class="fas fa-id-card text-primary w-5 text-center"></i>
                <div>
                  <p class="text-xs text-on-surface-variant">شماره نظام پزشکی</p>
                  <p class="font-medium">{{ therapist.id }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <i class="fas fa-envelope text-primary w-5 text-center"></i>
                <div>
                  <p class="text-xs text-on-surface-variant">ایمیل</p>
                  <p class="font-medium">{{ therapist.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <i class="fas fa-phone text-primary w-5 text-center"></i>
                <div>
                  <p class="text-xs text-on-surface-variant">شماره تماس</p>
                  <p class="font-medium">{{ therapist.phone }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" md="8">
          <div class="space-y-6">
            <!-- Bio Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-user-tag"></i>
                بیوگرافی و تخصص
              </h3>
              <p class="text-on-surface-variant leading-relaxed text-lg">
                {{ therapist.bio }}
              </p>
            </v-card>

            <!-- Education Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-graduation-cap"></i>
                تحصیلات
              </h3>
              <v-list density="compact">
                <v-list-item
                  v-for="(edu, index) in therapist.education"
                  :key="index"
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <i class="fas fa-check-circle text-primary ml-3 text-xs"></i>
                  </template>
                  <v-list-item-title class="text-on-surface">{{ edu }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>

            <!-- Specializations Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-award"></i>
                حوزه‌های تخصصی
              </h3>
              <div class="flex flex-wrap gap-3">
                <v-chip
                  v-for="(spec, index) in therapist.specializations"
                  :key="index"
                  color="secondary"
                  variant="tonal"
                  rounded="lg"
                  class="font-medium"
                >
                  {{ spec }}
                </v-chip>
              </div>
            </v-card>

            <!-- Experience Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-briefcase"></i>
                سوابق حرفه‌ای
              </h3>
              <v-timeline side="end" align="start" density="compact" class="text-right">
                <v-timeline-item
                  v-for="(exp, index) in therapist.experience"
                  :key="index"
                  dot-color="primary"
                  size="x-small"
                >
                  <div class="mb-4">
                    <p class="text-lg font-bold text-on-surface">{{ exp.title }}</p>
                    <p class="text-sm text-primary font-medium">{{ exp.place }}</p>
                    <p class="text-xs text-on-surface-variant mt-1 tabular-nums">{{ exp.period }}</p>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>

            <!-- Schedule Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <i class="fas fa-calendar-alt"></i>
                برنامه حضور در کلینیک
              </h3>
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th class="text-right">روز</th>
                    <th class="text-right">ساعت حضور</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="slot in therapist.schedule" :key="slot.day">
                    <td class="font-bold">{{ slot.day }}</td>
                    <td class="tabular-nums">{{ slot.hours }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>

            <!-- Online Schedule Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <i class="fas fa-video"></i>
                برنامه مشاوره آنلاین
              </h3>
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th class="text-right">روز</th>
                    <th class="text-right">ساعت حضور</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="slot in therapist.onlineSchedule" :key="slot.day">
                    <td class="font-bold">{{ slot.day }}</td>
                    <td class="tabular-nums">{{ slot.hours }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>

            <!-- Reviews Section -->
            <v-card rounded="xl" flat border class="pa-8">
              <h3 class="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <i class="fas fa-comments"></i>
                نظرات و امتیازات مراجعین
              </h3>

              <!-- Review Summary -->
              <div class="flex items-center gap-8 mb-10 bg-surface-variant/10 pa-6 rounded-2xl">
                <div class="text-center">
                  <p class="text-5xl font-black text-primary mb-1">۴.۸</p>
                  <v-rating
                    model-value="4.8"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <p class="text-[10px] text-on-surface-variant mt-2">بر اساس ۱۲ نظر</p>
                </div>
                <v-divider vertical></v-divider>
                <div class="flex-1 space-y-1">
                  <div v-for="i in [5, 4, 3, 2, 1]" :key="i" class="flex items-center gap-3">
                    <span class="text-[10px] w-2">{{ i }}</span>
                    <v-progress-linear
                      :model-value="i === 5 ? 80 : i === 4 ? 15 : 5"
                      color="primary"
                      height="6"
                      rounded
                    ></v-progress-linear>
                  </div>
                </div>
              </div>

              <!-- Review List -->
              <div class="space-y-6 mb-10">
                <div v-for="(review, index) in therapist.reviews" :key="index" class="border-b border-outline-variant pb-6 last:border-0">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                      <v-avatar color="secondary-lighten-4" size="32">
                        <span class="text-[10px] font-bold text-secondary">{{ review.name[0] }}</span>
                      </v-avatar>
                      <div>
                        <p class="text-sm font-bold">{{ review.name }}</p>
                        <p class="text-[10px] text-on-surface-variant">{{ review.date }}</p>
                      </div>
                    </div>
                    <v-rating
                      :model-value="review.rating"
                      color="amber"
                      density="compact"
                      readonly
                      size="x-small"
                    ></v-rating>
                  </div>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    {{ review.comment }}
                  </p>
                </div>
              </div>

              <!-- Add Review Form -->
              <v-divider class="mb-8"></v-divider>
              <h4 class="text-lg font-bold mb-4">ثبت نظر شما</h4>
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-sm font-medium">امتیاز شما:</span>
                  <v-rating
                    v-model="newReview.rating"
                    color="amber"
                    hover
                    density="comfortable"
                  ></v-rating>
                </div>
                <v-textarea
                  v-model="newReview.comment"
                  placeholder="تجربه خود را از جلسات درمانی بنویسید..."
                  variant="solo-filled"
                  flat
                  rounded="xl"
                  rows="3"
                  hide-details
                ></v-textarea>
                <div class="flex justify-end">
                  <v-btn
                    color="primary"
                    rounded="xl"
                    class="px-8 font-bold"
                    @click="submitReview"
                    :disabled="!newReview.comment.trim()"
                  >
                    ارسال نظر
                  </v-btn>
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </DefaultLayout>

  <NewAppointmentModal
    v-model="showBookingModal"
    :initial-therapist="`${therapist.name} (${therapist.specialty})`"
  />

  <EditTherapistProfileModal
    v-model="showEditModal"
    :therapist="therapist"
    @save="handleSaveProfile"
  />
</template>
