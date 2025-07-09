  <template>
  <UProgress color="fuchsia" class="absolute " v-model="valueProgress" />
  <VerticalNav />
  <div class="flex justify-center items-center min-h-screen w-full">
    <div class="w-full max-w-xl backdrop-blur-xl bg-slate-600/40 rounded-2xl shadow-lg border border-white/20 p-8">

      <h1 class="text-2xl font-bold text-center mb-6">Création de Kit Design</h1>
      <form @submit.prevent="submitKit">
        <div v-show="currentStep === 1" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Layout</h2>
          <div class="space-y-3">
            <h3 class="text-lg text-center font-semibold pb-2">Conteneur</h3>
            <input
              v-model="layout.container.maxWidth"
              placeholder="Max Width (en px)" required
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            <input
              v-model="layout.container.padding"
              placeholder="Padding (en px)" required
              class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          </div>
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-center pb-2">Aperçu du Conteneur</h3>
            <ContainerPreview
            :maxWidth="layout.container.maxWidth"
            :padding="layout.container.padding"
            @update:maxWidth="layout.container.maxWidth = $event"
            @update:padding="layout.container.padding = $event"
          />
          </div>

          <div class="flex justify-end mt-6">
            <UButton trailing-icon="i-lucide-arrow-right" size="md" @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white">Suivant</UButton>
          </div>
        </div>

        <div v-show="currentStep === 2" class="space-y-4">
        <h2 class="text-xl font-semibold border-b pb-2">Layout</h2>
        <h3 class="text-lg text-center font-semibold pb-2">Grille</h3>
          <input
            v-model="layout.grid.breakpoints.columns"
            type="number"
            placeholder="Colonnes (ex: 12)"
            required
            max="12"
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <input
            v-model="layout.grid.breakpoints.gap"
            type="number"
            placeholder="Espacement (en px)"
            required
            max="12"
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-center pb-2">Aperçu de la Grille</h3>
            <GridPreview :columns="layout.grid.breakpoints.columns" :gap="layout.grid.breakpoints.gap" />
          </div>

          <div class="flex justify-center mt-6">
            <UButton
                leading-icon="i-lucide-arrow-left"
                size="md"
                @click="previousStep(); desincrement()"
                class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
            >
              Retour
            </UButton>
            <UButton
                trailing-icon="i-lucide-arrow-right"
                size="md"
                @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
            >
              Suivant
            </UButton>
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
                  placeholder="Min Width (en px)"
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                <input
                  v-model="bp.columns"
                  type="number" placeholder="Colonnes (ex: 6)"
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                <input
                  v-model="bp.gap"
                  placeholder="Espacement (en px)"
                  class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-4 mt-4">
            <UButton type="button" size="md" @click="addBreakpoint" class="bg-gray-600 hover:bg-gray-700 text-white cursor-pointer">
              Ajouter un breakpoint
            </UButton>
          </div>
          <div class="flex justify-center mt-6">
            <UButton
                leading-icon="i-lucide-arrow-left"
                size="md"
                @click="previousStep(); desincrement()"
                class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
            >
              Retour
            </UButton>
            <UButton
                trailing-icon="i-lucide-arrow-right"
                size="md"
                @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
            >
              Suivant
            </UButton>
          </div>
        </div>

        <div v-show="currentStep === 4" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Palette de couleurs</h2>
          <div class="flex flex-col lg:flex-row gap-6">
            <div class="flex-1 space-y-3">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-white">Couleur sombre</label>
                <div class="flex items-center gap-3">
                  <input
                    v-model="colors.dark"
                    type="color"
                    class="w-full h-10 rounded cursor-pointer border-2 border-white/50"
                  />
                  <span class="text-white whitespace-nowrap">{{ colors.dark }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-white">Couleur claire</label>
                <div class="flex items-center gap-3">
                  <input
                    v-model="colors.light"
                    type="color"
                    class="w-full h-10 rounded cursor-pointer border-2 border-white/50"
                  />
                  <span class="text-white whitespace-nowrap">{{ colors.light }}</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-white">Couleur accent</label>
                <div class="flex items-center gap-3">
                  <input
                    v-model="colors.accent"
                    type="color"
                    class="w-full h-10 rounded cursor-pointer border-2 border-white/50"
                  />
                  <span class="text-white whitespace-nowrap">{{ colors.accent }}</span>
                </div>
              </div>
            </div>

            <div class="flex-1 flex justify-center items-center">
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <UButton
                leading-icon="i-lucide-arrow-left"
                size="md"
                @click="previousStep(); desincrement()"
                class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
            >
              Retour
            </UButton>
            <UButton
                trailing-icon="i-lucide-arrow-right"
                size="md"
                @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
            >
              Suivant
            </UButton>
          </div>
        </div>


<!-- Typographie -->
<div v-show="currentStep === 5" class="space-y-4">
  <h2 class="text-xl font-semibold border-b pb-2">Typographie</h2>
  <h3 class="text-lg font-semibold text-center pb-2">Titre</h3>

  <div class="mt-2 space-y-2">
  <div class="relative group">
    <select
      v-model="fonts.title.name"
      class="w-full px-4 py-3 bg-white/20  rounded-lg border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer shadow-lg hover:bg-white/25 focus:bg-white/25"
    >
      <option disabled value="" class="text-gray-800 bg-gray-100">Choisissez une police</option>
      <option value="Arial" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Arial</option>
      <option value="Helvetica" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Helvetica</option>
      <option value="Georgia" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Georgia</option>
      <option value="Times New Roman" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Times New Roman</option>
      <option value="Courier New" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Courier New</option>
      <option value="Verdana" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Verdana</option>
      <option value="Trebuchet MS" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Trebuchet MS</option>
      <option value="Impact" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Impact</option>
    </select>

    <!-- Flèche personnalisée animée -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg class="w-5 h-5 text-white/70 transition-all duration-300 transform group-focus-within:rotate-180 group-hover:text-white group-focus-within:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
</div>
  <input
    v-model="fonts.title.size"
    placeholder="Taille de la police (ex: 12px, 14px)"
    required
    class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  />

  <input
    v-model="fonts.title.weight"
    placeholder="Graisse de la police (ex : 400, 500)"
    required
    class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  />
  <div class="mt-6">
    <h3 class="text-lg font-semibold text-center pb-2">Aperçu d'un titre</h3>
    <TitlePreview :font="fonts.title.name" :size="fonts.title.size" :weight="fonts.title.weight" class="text-center mt-4">
      Lorem ipsum dolor
    </TitlePreview>
  </div>

  <div class="flex justify-center mt-6">
    <UButton
        leading-icon="i-lucide-arrow-left"
        size="md"
        @click="previousStep(); desincrement()"
        class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
    >
      Retour
    </UButton>
    <UButton
        trailing-icon="i-lucide-arrow-right"
        size="md"
        @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
    >
      Suivant
    </UButton>
  </div>
</div>

  <div v-show="currentStep === 6" class="space-y-6 p-4"> <h2 class="text-xl font-semibold border-b pb-2">Typographie</h2>

    <div class="space-y-4"> <h3 class="text-lg font-semibold text-center pb-2">Texte</h3>

      <div class="space-y-2">
        <label for="font-text-name" class="block text-sm font-medium text-white/80"></label> <div class="relative group">
          <select
            v-model="fonts.text.fontfamily"
            class="w-full px-4 py-3 bg-white/20  rounded-lg border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer shadow-lg hover:bg-white/25 focus:bg-white/25"
          >
            <option disabled value="" class="text-gray-800 bg-gray-100">Choisissez une police</option>
            <option value="Arial" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Arial</option>
            <option value="Helvetica" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Helvetica</option>
            <option value="Georgia" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Georgia</option>
            <option value="Times New Roman" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Times New Roman</option>
            <option value="Courier New" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Courier New</option>
            <option value="Verdana" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Verdana</option>
            <option value="Trebuchet MS" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Trebuchet MS</option>
            <option value="Impact" class="text-gray-800 bg-white hover:bg-gray-100 py-2">Impact</option>
          </select>

          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="w-5 h-5 text-white/70 transition-all duration-300 transform group-focus-within:rotate-180 group-hover:text-white group-focus-within:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            </div>
        </div>
      </div>

      <div class="space-y-2"> <label for="font-text-size" class="block text-sm font-medium text-white/80"></label> <input
          id="font-text-size" v-model="fonts.text.size"
          placeholder="Taille du texte (ex: 16px)" required
          class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/25 focus:bg-white/25" />
      </div>
    </div>
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-center pb-2">Aperçu d'un texte</h3>
      <TextPreview :font="fonts.text.fontfamily" :size="fonts.text.size">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </TextPreview>
    </div>
    <div class="flex justify-center mt-6">
      <UButton
          leading-icon="i-lucide-arrow-left"
          size="md"
          @click="previousStep(); desincrement()"
          class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
      >
        Retour
      </UButton>
      <UButton
          trailing-icon="i-lucide-arrow-right"
          size="md"
          @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
      >
        Suivant
      </UButton>
    </div>
  </div>
        <!-- Composants -->
        <div v-show="currentStep === 7" class="space-y-4">
          <h2 class="text-xl font-semibold border-b pb-2">Les composants</h2>
          <h3 class="text-lg text-center font-semibold pb-2">Les boutons</h3>
          <input
            v-model="components.buttons[0].padding"
            type="number"
            placeholder="Marges internes (en px)" required
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input
            v-model="components.buttons[0].fontSize"
            type="number"
            placeholder="Taille du texte (en px)" required
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <input
            v-model="components.buttons[0].border.radius"
            type="number"
            placeholder="Border radius (en px)" required
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <div class="mt-6 flex flex-col items-center">
            <h3 class="text-lg font-semibold text-center pb-2">Aperçu du bouton</h3>
            <ButtonPreview class="item" :padding="components.buttons[0].padding" :fontSize="components.buttons[0].fontSize" :border="components.buttons[0].border" />
          </div>

          <div class="flex justify-center mt-6">
            <UButton
                leading-icon="i-lucide-arrow-left"
                size="md"
                @click="previousStep(); desincrement()"
                class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
            >
              Retour
            </UButton>
            <UButton
                trailing-icon="i-lucide-arrow-right"
                size="md"
                @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
            >
              Suivant
            </UButton>
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
            placeholder="Border radius (en px)" required
            class="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
          <div class="flex justify-center mt-6">
            <UButton
                leading-icon="i-lucide-arrow-left"
                size="md"
                @click="previousStep(); desincrement()"
                class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white mr-6"
            >
              Retour
            </UButton>
            <UButton
                trailing-icon="i-lucide-arrow-right"
                size="md"
                @click="nextStep() ; increment()" class="bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer text-white"
            >
              Suivant
            </UButton>
          </div>
        </div>

        <div v-show="currentStep === 9">
          <div class="flex flex-col items-center justify-center mt-8 space-y-4">
            <UButton
                    @click="submitKit"
                    to="/my-kits-ui"
                    class="w-64 flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-white bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg rounded-xl transition duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Télécharger
                </UButton>

                <UButton
                    to="/create-kit-ui"
                    class="w-64 flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-white bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg rounded-xl transition duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Créer un nouveau kit
                </UButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { jwtDecode } from 'jwt-decode';
import ContainerPreview from '../components/ContainerPreview.vue'
import GridPreview from '../components/GridPreview.vue'
import ButtonPreview from '../components/ButtonPreview.vue'
import TitlePreview from '../components/TitlePreview.vue'
import TextPreview from '../components/TextPreview.vue'
export default {
  data() {
    return {
      valueProgress: 0,
      currentStep: 1,
      userId: null,
      colors: {
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
          fontfamily:'',
          size:''
        }
      },
      layout: {
        container: {
          maxWidth: '',
          padding: '',
        },
        grid: {
          breakpoints: [
          {
            columns: '',
            gap: ''
          }
        ]
        }
      },
      components: {
        buttons: [
          {
            padding: '',
            fontSize: '',
            border: { radius: '' }
          }
        ],
        tiles: [
          {
            margin: '',
            border: { radius: '' }
          }
        ]
      }
    };
  },
  mounted() {
    this.decodeUserFromToken();
  },
  methods: {
    increment() {
      if (this.valueProgress < 100) {
        this.valueProgress += 13;
      }
    },
    desincrement() {
      if (this.valueProgress > 0) {
        this.valueProgress -= 13;
      }
    },
    nextStep() {
      if (this.currentStep < 9) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    decodeUserFromToken() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        this.userId = decoded.id || decoded.userId || null;
      } catch (err) {
        console.error('Token invalide ou expiré', err);
      }
    },
    hashEmail(email) {
      return crypto.subtle.digest('MD5', new TextEncoder().encode(email)).then(buffer => {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      });
    },
    addBreakpoint() {
      this.layout.grid.breakpoints.push({
        minWidth: '',
        columns: '',
        gap: ''
      });
    },
    async submitKit() {
      try {
        const payload = {
          userId: this.userId,
          colors: this.colors,
          fonts: this.fonts,
          layout: this.layout,
          components: this.components
        };

        const response = await fetch('http://localhost:3000/kit/generated', {
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
