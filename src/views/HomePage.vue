<script>
export default {
  name: 'HomePage',
}
</script>

<template>
  <div class="flex min-h-screen items-start justify-center">
    <div class="flex flex-col items-start justify-center w-1/2 p-8 mt-52">
      <div>
        <h1 class="text-7xl font-bold mb-12">
          Un panneau, <br>
          <span class="text-primary">1000</span> regards
        </h1>
        <p class="text-base text-gray-700 leading-relaxed">
          Donec tincidunt ultricies dui, at tincidunt nisl porta eu.
          Fusce nec ipsum dignissim, egestas nisl a, interdum dui.
          Fusce urna erat, efficitur et lectus vitae, congue tincidunt augue.
          Suspendisse venenatis vel elit sed ullamcorper. 
          Donec vel semper risus, eu mollis lectus. 
          Phasellus commodo lectus libero. Integer lorem enim, lobortis sed mi quis, suscipit vulputate nulla. 
          Donec at vulputate metus, a varius purus. 
        </p>
        <RouterLink to="/carte-interactive">
          <button class="btn btn-xs btn-primary sm:btn-sm md:btn-md lg:btn-lg mt-16">Carte Interactive</button>
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-1 items-center justify-end pr-8 mr-5 mt-5">
      <div class="carousel w-[1014px] h-[658px] rounded-lg">
        <div id="slide1" class="carousel-item relative w-full h-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            class="w-full h-full object-cover" />
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" class="btn btn-circle">❮</a>
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full h-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            class="w-full h-full object-cover" />
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" class="btn btn-circle">❮</a>
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full h-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            class="w-full h-full object-cover" />
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" class="btn btn-circle">❮</a>
            <a href="#slide4" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" class="carousel-item relative w-full h-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            class="w-full h-full object-cover" />
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" class="btn btn-circle">❮</a>
            <a href="#slide1" class="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


