<template>
  <div :class="classes" :style="styles">
    <div :class="imgClasses" :style="bgImg"></div>
  </div>
</template>

<script>
export default {
  name: 'responsive-image',
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    innerShadow: {
      type: Boolean,
    },
  },
  computed: {
    classes() {
      const classes = 'responsive-image';
      return classes;
    },
    imgClasses() {
      let classes = 'responsive-image-image';
      classes += this.innerShadow ? ' shadow' : '';
      return classes;
    },
    styles() {
      return {
        width: this.width || '640px',
        height: this.height || '480px',
      };
    },
    bgImg() {
      return { backgroundImage: `url(${this.imgSrc})` };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.responsive-image {
  background-color: $chromeWhite;
  height: auto;
  width: auto;

  .responsive-image-image {
    background-position: center;
    background-size: cover;
    height: 100%;
    width: 100%;

    &.shadow {
      -webkit-box-shadow: inset 0px 11px 38px -17px rgba(0,0,0,0.75);
      -moz-box-shadow: inset 0px 11px 38px -17px rgba(0,0,0,0.75);
      box-shadow: inset 0px 11px 38px -17px rgba(0,0,0,0.75);
    }
  }
}
</style>
