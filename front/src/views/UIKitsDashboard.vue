<template>
  <VerticalNav />
  <div class="bg-slate-600/40py-8 px-4 sm:px-6 lg:px-8 min-h-screen w-full">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-50">Mes Kits CSS</h2>
        <UButton
  to="/create-kit-ui"
  class="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-200"
>
  Créer un kit
</UButton>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 text-center text-red-600">
        {{ error }}
      </div>
      
      <div v-else-if="cssFiles.length === 0" class="bg-slate-600/40 rounded-lg shadow p-8 text-center">
        <div class="mx-auto h-16 w-16 text-gray-200 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-50 mb-2">Aucun kit CSS</h3>
        <p class="text-gray-300 mb-4">Vous n'avez pas encore créé de kits CSS.</p>
        <UButton to="/create-kit-ui" class="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-200">
          Créer votre premier kit
        </UButton>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(file, index) in cssFiles"
          :key="index"
          class="bg-slate-600/40 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/20"
        >
          <div class="h-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-950"></div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-50 truncate">
                {{ extractFileName(file) }}
              </h3>
              <span class="px-2 py-1 text-xs font-medium bg-fuchsia-50 text-fuchsia-700 rounded-full">CSS</span>
            </div>
            
            <p class="text-gray-200 text-sm mb-5">Kit de style personnalisé pour votre projet</p>
            
            <div class="bg-gray-50 rounded-md p-3 mb-5 h-16 flex items-center justify-center overflow-hidden">
              <div class="text-xs text-gray-500 overflow-hidden text-ellipsis">
                <code>/* {{ extractFileName(file) }} */</code>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-gray-100">
              <div class="flex items-center space-x-3">
                <a 
                  :href="`/edit-kit-ui?kitName=${extractFileName(file)}`"
                  class="cursor-pointer flex items-center justify-center p-2 text-gray-50 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </a>
                <a
                  :href="file"
                  target="_blank"
                  download="styles.css"
                  class="flex items-center justify-center p-2 text-gray-50 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
              <button
                @click="deleteFile(file)"
                class="cursor-pointer flex items-center justify-center p-2 text-gray-50 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'UserKits',
  data() {
    return {
      cssFiles: [],
      loading: true,
      error: null,
      userId: null,
      userName: null,
      userEmail: null
    };
  },
  methods: {
    async fetchCssFiles() {
      if (!this.userId) {
        this.error = "Identifiant utilisateur manquant.";
        this.loading = false;
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/kit/list/${this.userId}`);
        const data = await response.json();

        if (response.ok) {
          this.cssFiles = data.files;
        } else {
          this.error = data.error || "Erreur lors du chargement des fichiers.";
        }
      } catch (err) {
        this.error = "Erreur réseau ou serveur.";
      } finally {
        this.loading = false;
      }
    },

    extractFileName(filePath) {
      return filePath.split('/').pop();
    },

    async deleteFile(filePath) {
      const fileName = this.extractFileName(filePath);
      const confirmDelete = confirm(`Supprimer le fichier "${fileName}" ?`);
      if (!confirmDelete) return;

      try {
        const response = await fetch(`http://localhost:3000/kit/delete/${this.userId}/${fileName}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (response.ok) {
          this.cssFiles = this.cssFiles.filter(file => file !== filePath);
        } else {
          alert(data.error || "Erreur lors de la suppression.");
        }
      } catch (err) {
        alert("Erreur réseau lors de la suppression.");
      } finally {
        this.loading = false;
      }
    },

    decodeUserFromToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.error = "Utilisateur non connecté.";
        this.loading = false;
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (!decoded.userId) {
          this.error = "Token invalide : identifiant utilisateur manquant.";
          this.loading = false;
          return;
        }

        this.userId = decoded.userId;
        this.userEmail = decoded.email;
        this.userName = decoded.email.split('@')[0];

        this.fetchCssFiles();
      } catch (err) {
        console.error('Token invalide ou expiré', err);
        this.error = "Token invalide ou expiré.";
        this.loading = false;
      }
    }
  },
  created() {
    this.decodeUserFromToken();
  }
};
</script>
