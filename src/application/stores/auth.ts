import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ name: string; role: string } | null>(null);
  const token = ref(localStorage.getItem('token'));

  const login = async (mobile: string) => {
    // Mock login
    token.value = 'mock-token';
    localStorage.setItem('token', token.value);
    user.value = { name: 'منشی مرکز', role: 'secretary' };
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  return {
    user,
    token,
    login,
    logout,
  };
});
