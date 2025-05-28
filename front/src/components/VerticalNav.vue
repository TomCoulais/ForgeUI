<template>
  <div class="flex flex-col h-screen w-64 bg-gray-900 text-white">
    <div class="flex items-center justify-center p-4 bg-gray-800 border-b border-gray-700">
      <span class="text-lg font-semibold">Intranet</span>
    </div>

    <div class="flex flex-col space-y-2 p-4">
     <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.href"
        class="p-2 rounded-md"
        :class="{
          'bg-gray-700 font-semibold text-white': $route.path === item.href,
          'text-white hover:bg-gray-600': $route.path !== item.href
        }"
      >
        {{ item.label }}
      </router-link>
    </div>

    <div class="mt-auto flex items-center space-x-3 p-4 border-t border-gray-700" v-if="user">
      <div class="flex items-center space-x-2">
        <div @click="toggleDropdown" class="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <img :src="user.avatar" alt="User Avatar" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold">{{ user.name }}</span>
          <span class="text-xs text-gray-400">{{ user.email }}</span>
        </div>
        <div @click="logout" class="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m6 0l-3-3m3 3l-3 3m4-8h-7a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2V6a2 2 0 00-2-2z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'VerticalNav',
  data() {
    return {
      menuItems: [
        { label: 'Créer un kit UI', href: '/create-kit-ui' },
        { label: 'Vos Kits UI', href: '/my-kits-ui' },
      ],
      user: null,
    };
  },
  created() {
    this.decodeUserFromToken();
  },
  methods: {
    decodeUserFromToken() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        this.user = {
          name: decoded.email.split('@')[0], // ou une valeur par défaut
          email: decoded.email,
          avatar: `https://www.gravatar.com/avatar/${this.hashEmail(decoded.email)}?d=identicon`,
        };
      } catch (err) {
        console.error('Token invalide ou expiré', err);
      }
    },

    hashEmail(email) {
      return crypto.subtle.digest('MD5', new TextEncoder().encode(email)).then(buffer => {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      });
    },

    logout() {
      localStorage.removeItem('token');
      this.user = null;
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.hover\:text-gray-400:hover {
  color: #d1d5db;
}
</style>
