<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br p-2">
    <div class="w-full max-w-md backdrop-blur-xl bg-slate-600/40 rounded-2xl shadow-lg border border-white/20 p-8">
      <!-- Logo et titre -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img src="../../public/logo.svg" alt="Logo" class="h-24 w-24" />
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Forge UI</h1>
        <p class="text-white/80 text-sm">Rejoignez-nous ! Créez votre compte pour commencer à forger des interfaces</p>
        <h1 class="text-xl mt-3 font-bold">Créer un compte</h1>
      </div>
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
          <label for="username" class="block text-sm font-medium text-white mb-2">Nom d'utilisateur</label>
          <div class="relative">
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Choisissez un nom d'utilisateur"
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
              :type="showPassword ? 'text' : 'password'"
              placeholder="Entrez votre mot de passe"
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              @click="togglePasswordVisibility"
              :aria-label="showPassword ? 'Cacher le mot de passe' : 'Montrer le mot de passe'"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label for="confirm-password" class="block text-sm font-medium text-white mb-2">Confirmer le mot de passe</label>
          <div class="relative">
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Confirmer votre mot de passe"
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-fuchsia-500 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          S'inscrire
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-white">Vous avez déjà un compte? <a href="/" class="font-medium text-blue-200 hover:text-blue-100">Se connecter</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      form: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.form.email,
            username: this.form.username,
            password: this.form.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Utilisateur créé avec succès:', data);
          localStorage.setItem('token', data.token);
          console.log('Token stocké :', data.token);
          this.$router.push('/create-kit-ui');
        } else {
          console.error('Erreur lors de la création de l\'utilisateur:', data.message);
          alert(data.message || 'Une erreur est survenue');
        }
      } catch (error) {
        console.error('Erreur de connexion:', error);
        alert('Erreur lors de l\'enregistrement');
      }
    }
  }
}
</script>
