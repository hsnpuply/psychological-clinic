import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ name: string; role: string } | null>(null);
  const token = useCookie('token');

  const login = async (mobile: string) => {
    // Mock login
    token.value = 'mock-token';
    user.value = { name: 'منشی مرکز', role: 'secretary' };
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  return {
    user,
    token,
    login,
    logout,
  };
});
