<template>
  <section class="bg-slate-600/40 w-96 max-w-md mx-auto mt-20 rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-6">
    <div class="flex flex-col items-center justify-center text-center">
      <img :src="user.avatar" alt="avatar" class="w-32 h-32 object-cover rounded-full">
      <h1 class="text-2xl font-bold mb-4">Bienvenue {{ user.name }}</h1>
      <p class="mb-2">Bienvenue dans votre espace personnel !</p>
      <a>Changer les informations du compte ?</a>
      <button @click="modifyPersonalInfo" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
        Modifier les informations personnelles
      </button>
    </div>
    <div class="flex justify-center mt-6">
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Se déconnecter
      </button>
    </div>
  </section>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'ProfileView',
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
          name: decoded.email.split('@')[0],
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

