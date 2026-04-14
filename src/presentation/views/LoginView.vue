<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/application/stores/auth';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const authStore = useAuthStore();

const schema = yup.object({
  mobile: yup.string().required('شماره موبایل الزامی است').matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const [mobile, mobileProps] = defineField('mobile');

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values.mobile);
  router.push('/');
});
</script>

<template>
  <div class="min-h-screen w-full flex flex-row rtl">
    <!-- Left Side: Serene Visual -->
    <section class="hidden lg:flex w-1/2 relative overflow-hidden">
      <img
        src="https://picsum.photos/seed/therapy/1920/1080"
        class="absolute inset-0 w-full h-full object-cover"
        alt="Serene Office"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
      <div class="absolute bottom-16 right-16 left-16 p-12 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl">
        <div class="space-y-6">
          <span class="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold tracking-widest uppercase">
            The Digital Sanctuary
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-primary leading-tight">
            مسیر آرامش شما <br /> از اینجا آغاز می‌شود
          </h1>
          <p class="text-on-surface-variant text-lg leading-relaxed max-w-md">
            به فضای امن و تخصصی کلینیک روانشناسی امید باران خوش آمدید. ما در کنار شما هستیم تا با هم به سوی خودشناسی و سلامت روان گام برداریم.
          </p>
        </div>
      </div>
    </section>

    <!-- Right Side: Login Card -->
    <section class="w-full lg:w-1/2 flex items-center justify-center bg-background p-8 lg:p-24 relative">
      <div class="w-full max-w-md relative z-10">
        <div class="mb-16 text-right">
          <div class="flex items-center justify-end gap-3 mb-6">
            <span class="text-3xl font-extrabold text-primary tracking-tighter">امید باران</span>
            <v-avatar color="primary" rounded="xl" size="48" elevation="4">
              <v-icon icon="mdi-psychology" size="32" color="white"></v-icon>
            </v-avatar>
          </div>
          <h2 class="text-2xl font-bold text-on-surface mb-2">خوش آمدید</h2>
          <p class="text-on-surface-variant font-light">لطفاً برای ورود به پنل کاربری، شماره موبایل خود را وارد کنید.</p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-8">
          <div class="group">
            <label class="block text-sm font-medium text-on-surface-variant mb-3 px-1">
              شماره موبایل
            </label>
            <v-text-field
              v-model="mobile"
              v-bind="mobileProps"
              :error-messages="errors.mobile"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              variant="solo-filled"
              flat
              rounded="xl"
              bg-color="surface-variant"
              class="text-left"
              dir="ltr"
            >
              <template v-slot:prepend-inner>
                <v-icon icon="mdi-cellphone" color="primary"></v-icon>
              </template>
            </v-text-field>
            <p class="mt-3 text-xs text-on-surface-variant/60 px-1">کد تأیید به این شماره پیامک خواهد شد.</p>
          </div>

          <v-btn
            type="submit"
            block
            color="primary"
            size="x-large"
            rounded="xl"
            elevation="8"
            class="font-bold text-lg"
          >
            ورود
            <v-icon end icon="mdi-arrow-left"></v-icon>
          </v-btn>
        </form>

        <div class="mt-12 text-center space-y-6">
          <div class="flex items-center justify-center gap-4">
            <v-divider></v-divider>
            <span class="text-xs text-on-surface-variant uppercase tracking-widest font-medium">یا</span>
            <v-divider></v-divider>
          </div>
          <v-btn variant="text" color="primary" class="font-bold">
            ایجاد حساب جدید
          </v-btn>
          <div class="pt-8">
            <p class="text-xs text-on-surface-variant/70 font-light flex items-center justify-center gap-2">
              <v-icon icon="mdi-lock" size="14"></v-icon>
              تمامی اطلاعات شما در امنیت کامل محفوظ است
            </p>
          </div>
        </div>
      </div>

      <div class="absolute top-8 right-8">
        <v-btn variant="text" prepend-icon="mdi-home" color="on-surface-variant">
          بازگشت به سایت
        </v-btn>
      </div>
    </section>
  </div>
</template>

<style scoped>
:deep(.v-field__input) {
  font-size: 1.25rem !important;
  letter-spacing: 0.1em;
}
</style>
