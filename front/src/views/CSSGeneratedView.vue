<template>
        <UProgress v-model="valueProgress" />
  <div class="flex justify-center items-center min-h-screen">
    
    <div class="w-full max-w-xl backdrop-blur-xl bg-slate-600/40 rounded-2xl shadow-lg border border-white/20 p-8">
      
      <h1 class="text-2xl font-bold text-center mb-6">Création de Kit Design</h1>
      <form @submit.prevent="submitKit">
        <!-- Layout -->
        <!-- Étape 1 : Container -->
        <div v-show="currentStep === 1" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Layout</h2>
          <div class="space-y-3">
            <h3 class="text-lg text-center font-semibold pb-2">Container</h3>
            <input 
              v-model="layout.container.name" 
              placeholder="Nom du conteneur" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            <input 
              v-model="layout.container.maxWidth" 
              placeholder="Max Width (ex: 1200px)" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            <input 
              v-model="layout.container.padding" 
              placeholder="Padding (ex: 20px)" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          </div>
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Étape 2 : Grid -->
        <div v-show="currentStep === 2" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Layout</h2>
          <h3 class="text-lg text-center font-semibold pb-2">Grille</h3>
          <input 
            v-model="layout.grid.name" 
            placeholder="Nom de la grille" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input 
            v-model="layout.grid.breakpoints.columns" 
            type="number" placeholder="Colonnes (ex: 12)" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input 
            v-model="layout.grid.breakpoints.gap" 
            placeholder="Espacement (ex: 16px)" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Breakpoints (optionnel) -->
        <div v-show="currentStep === 3" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Breakpoints (optionnel)</h2>
          <div class="space-y-4">
            <div v-for="(bp, index) in layout.grid.breakpoints" :key="index" class="p-4 border rounded-md bg-fuchsia-950">
              <h3 class="font-medium mb-2">Breakpoint #{{ index + 1 }}</h3>
              <div class="space-y-3">
                <input 
                  v-model="bp.minWidth" 
                  placeholder="Min Width (ex: 768px)" 
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                <input 
                  v-model="bp.columns" 
                  type="number" placeholder="Colonnes (ex: 6)" 
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                <input 
                  v-model="bp.gap" 
                  placeholder="Espacement (ex: 10px)" 
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-4 mt-4">
            <UButton type="button" size="md" @click="addBreakpoint" class="bg-gray-600 hover:bg-gray-700 text-white cursor-pointer">
              Ajouter un breakpoint
            </UButton>
          </div>
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Palette de couleurs -->
        <div v-show="currentStep === 4" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Palette de couleurs</h2>
          <div class="flex flex-col lg:flex-row gap-6">
            <div class="flex-1 space-y-3">
              <input 
                v-model="colors.name" 
                placeholder="Nom de la couleur" required 
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              <input 
                v-model="colors.dark" 
                placeholder="Couleur sombre (#333...)" required 
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              <input 
                v-model="colors.light" 
                placeholder="Couleur claire (#eee...)" required 
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              <input 
                v-model="colors.accent" 
                placeholder="Couleur accent (#f00...)" required 
                class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            </div>
            <div class="flex-1 flex justify-center items-center">
              <ColorPalette 
                :darkColor="colors.dark" 
                :lightColor="colors.light" 
                :accentColor="colors.accent" 
                class="w-full max-w-xs"
              />
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Typographie -->
        <div v-show="currentStep === 5" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Typographie</h2>
          <h3 class="text-lg font-semibold text-center pb-2">Titre</h3>
            <input
              v-model="fonts.title.name"
              :placeholder="`Nom de la police (ex: Arial)`"
              required
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />

            <input
              v-if="tag !== 'text'"
              v-model="fonts.title.size"
              :placeholder="`Taille de la police (ex: 12px, 14px)`"
              required
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />

            <input
              v-if="tag !== 'text'"
              v-model="fonts.title.weight"
              :placeholder="`Graisse de la police (ex : 400, 500)`"
              required
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep(); increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">
              Suivant
            </UButton>
          </div>
        </div>

        <div v-show="currentStep === 6" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Typographie</h2>
          <h3 class="text-lg font-semibold text-center pb-2">Texte</h3>
          <div class="space-y-3">
            <input 
              v-model="fonts.text.name" 
              placeholder="Nom de la classe texte" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            <input 
              v-model="fonts.text.fontfamily" 
              placeholder="Police (ex: Arial)" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            <input 
              v-model="fonts.text.size" 
              placeholder="Taille (ex: 16px)" required 
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          </div>
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Composants -->
        <div v-show="currentStep === 7" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Les composants</h2>
          <h3 class="text-lg text-center font-semibold pb-2">Les boutons</h3>
          <input 
            v-model="components.buttons[0].margin" 
            placeholder="Marges internes (en px)" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input 
            v-model="components.buttons[0].fontSize" 
            placeholder="Taille du texte" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input 
            v-model="components.buttons[0].border.radius" 
            placeholder="Border radius" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>
        <div v-show="currentStep === 8" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Les composants</h2>
          <h3 class="text-lg text-center font-semibold pb-2">Les tuiles</h3>
          <input 
            v-model="components.tiles[0].margin" 
            placeholder="Marges internes (en px)" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input 
            v-model="components.tiles[0].border.radius" 
            placeholder="Border radius" required 
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <!-- Final -->
        <div v-show="currentStep === 9">
          <div class="flex justify-center mt-8">
            <UButton @click="submitKit" class="bg-green-600 hover:bg-green-800 text-white">Terminer</UButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import ColorPalette from '../components/ColorPalette.vue'
  export default {
    data() {
      return {
        valueProgress: 0,
        currentStep: 1,
        colors: {
          name: '',
          dark: '',
          light: '',
          accent: ''
        },
        fonts: {
          title:{
            name: '',
            size: '',
            weight: '',
          },
          text: {
            name: '',
            fontfamily:'',
            size:''
          }
        },
        layout: {
          container: {
            name: '',
            maxWidth: '',
            padding: '',
          },
          grid: {
            name:'',
            gap: '',
            breakpoints: [
            {
              minWidth: '',
              columns: '',
              gap: ''
            }
          ]
          }
        },
        components: {
          buttons: [
            {
              name: '',
              margin: '',
              fontSize: '',
              border: { radius: '' }
            }
          ],
          tiles: [
            {
              name: '',
              margin: '',
              border: { radius: '' }
            }
          ]
        }
      };
    },
    components: {
      ColorPalette
    },
    methods: {
      increment() {
        if (this.valueProgress < 100) {
          this.valueProgress += 13
        }
      },
      nextStep() {
        if (this.currentStep < 9) {
          this.currentStep++;
        }
      },
      addBreakpoint() {
        this.layout.breakpoints.push({
          minWidth: '',
          columns: '',
          gap: ''
        });
      },
      async submitKit() {
        try {
          const payload = {
            colors: this.colors,
            fonts: this.fonts,
            layout: this.layout,
            components: this.components
          };
  
          const response = await fetch('http://localhost:3000/createkit/generated', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert(data.message);
          } else {
            throw new Error(data.error || 'Erreur lors de la génération du fichier CSS');
          }
        } catch (err) {
          alert('Erreur : ' + err.message);
        }
      }
    }
  };
  </script>