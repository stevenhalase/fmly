<template>
  <div :class="classes">
    <div class="avatar-image" :style="bgImg"></div>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    }
  },
  computed: {
    classes() {
      let classes = 'avatar';
      classes += this.size ? ` ${this.size}` : '';
      return classes;
    },
    bgImg() {
      return { backgroundImage: `url(${this.imgSrc})` };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.avatar {
  background-color: $chromeWhite;
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid $chromeWhite;

  &.small {
    height: 50px;
    width: 50px;
    border: 2px solid $chromeWhite;
  }

  .avatar-image {
    background-position: center;
    background-size: cover;
    height: 100%;
    width: 100%;
  }
}
</style>
