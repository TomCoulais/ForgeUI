<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-br p-6">
      <div class="w-full max-w-md backdrop-blur-xl bg-slate-600/40 rounded-2xl shadow-lg border border-white/20 p-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-white">Se connecter</h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Entrez votre email"
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-white mb-2">Mot de passe</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="show ? 'text' : 'password'"
                placeholder="Entrez votre mot de passe"
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                @click="togglePasswordVisibility"
                :aria-label="show ? 'Cacher le mot de passe' : 'Montrer le mot de passe'"
              >
                <svg v-if="show" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" class="h-4 w-4 border-white/30 rounded bg-white/20 focus:ring-blue-400 text-blue-500" />
              <label for="remember-me" class="ml-2 block text-sm text-white">Se souvenir de moi</label>
            </div>
            <div>
              <a href="#" class="text-sm text-white hover:text-blue-200">Mot de passe oublié?</a>
            </div>
          </div>
          
          <button
            type="submit"
            class="w-full py-3 px-4 bg-fuchsia-500 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            Se connecter
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-white">Pas encore de compte? <a href="/register" class="font-medium text-blue-200 hover:text-blue-100">S'inscrire</a></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        form: {
          email: 'izukend@gmail.com',
          password: ''
        },
        shouldRedirect: true // Flag optionnel pour la redirection
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.show = !this.show;
      },
      async handleSubmit() {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.form.email,
              password: this.form.password,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            console.log('Utilisateur connecté avec succès:', data);
            localStorage.setItem('token', data.token);
            console.log('Token stocké :', data.token);
            this.$router.push('/create-kit-ui'); 
      
          } else {
            console.error('Erreur lors de la connexion de l\'utilisateur:', data.message);
            alert(data.message || 'Une erreur est survenue');
          }
        } catch (error) {
          console.error('Erreur de connexion:', error);
          alert('Erreur lors de la connexion');
        }
      }
    }
  };
  </script>