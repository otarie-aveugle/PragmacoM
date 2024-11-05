<script>
export default {
  name: 'HomePage',
  data() {
    return {
      currentSlide: 0,
      slides: [
        { image: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp" },
        { image: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp" },
        { image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" },
        { image: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp" },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
  },
};
</script>

<template>
  <div class="flex flex-col mx-4 gap-6">
    <div
      class="flex flex-col gap-6 md:flex-row md:justify-between md:items-center"
    >
      <!-- texte+CTA -->
      <div class="flex flex-col gap-y-12 md:w-1/2 items-center md:items-start">
        <h1
          class="text-7xl font-bold text-center sm:text-5xl md:text-6xl md:text-start lg:text-7xl"
        >
          Un panneau, <br />
          <span class="text-primary">1000</span> regards
        </h1>

        <p
          class="text-sm text-gray-700 leading-relaxed sm:text-base md:text-lg"
        >
          Donec tincidunt ultricies dui, at tincidunt nisl porta eu. Fusce nec
          ipsum dignissim, egestas nisl a, interdum dui. Fusce urna erat,
          efficitur et lectus vitae, congue tincidunt augue. Suspendisse
          venenatis vel elit sed ullamcorper. Donec vel semper risus, eu mollis
          lectus. Phasellus commodo lectus libero. Integer lorem enim, lobortis
          sed mi quis, suscipit vulputate nulla. Donec at vulputate metus, a
          varius purus.
        </p>

        <RouterLink to="/map">
          <button
            class="btn btn-primary md:btn-md lg:btn-lg flex items-center gap-2"
          >
            Carte Interactive
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </RouterLink>
      </div>
      <!-- carousel -->
      <div class="flex justify-center items-center w-full md:w-1/2">
        <div class="carousel w-full h-auto md:h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
          <div v-for="(slide, index) in slides" :key="index" class="carousel-item relative w-full h-full" :class="{ 'hidden': currentSlide !== index, 'flex': currentSlide === index }">
            <img :src="slide.image" class="w-full h-full object-cover" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button @click="prevSlide" class="btn btn-circle">❮</button>
              <button @click="nextSlide" class="btn btn-circle">❯</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- faces disponibles -->
    <div class="flex flex-col gap-y-6">
      <h1
        class="text-4xl font-bold text-center sm:text-5xl md:text-6xl md:text-start lg:text-7xl"
      >
        Nos <span class="text-primary">faces</span> disponibles
      </h1>
      <div
        class="flex flex-row flex-wrap gap-6 justify-center md:justify-start"
      >
        <img
          src="https://via.placeholder.com/342x257"
          alt="Image 1"
          class="h-[150px] w-[200px] object-cover rounded-lg shadow-lg sm:h-[200px] sm:w-[300px] md:h-[257px] md:w-[342px]"
        />
        <img
          src="https://via.placeholder.com/342x257"
          alt="Image 2"
          class="h-[150px] w-[200px] object-cover rounded-lg shadow-lg sm:h-[200px] sm:w-[300px] md:h-[257px] md:w-[342px]"
        />
        <img
          src="https://via.placeholder.com/342x257"
          alt="Image 3"
          class="h-[150px] w-[200px] object-cover rounded-lg shadow-lg sm:h-[200px] sm:w-[300px] md:h-[257px] md:w-[342px]"
        />
        <img
          src="https://via.placeholder.com/342x257"
          alt="Image 4"
          class="h-[150px] w-[200px] object-cover rounded-lg shadow-lg sm:h-[200px] sm:w-[300px] md:h-[257px] md:w-[342px]"
        />
        <img
          src="https://via.placeholder.com/342x257"
          alt="Image 5"
          class="h-[150px] w-[200px] object-cover rounded-lg shadow-lg sm:h-[200px] sm:w-[300px] md:h-[257px] md:w-[342px]"
        />
      </div>
    </div>
  </div>
</template>
