<template>
  <svg xmlns="//www.w3.org/2000/svg" version="1.1" class="svg-filters" style="display:none;">
  <defs>
    <filter id="marker-shape">
      <feTurbulence type="fractalNoise" baseFrequency="0.0001 0.25" numOctaves="1" result="warp" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="50" in="SourceGraphic" in2="warp" />
    </filter>
  </defs>
</svg>
</template>