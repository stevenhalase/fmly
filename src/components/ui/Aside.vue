<template>
  <div :class="classes">
    <div @click="closeModal" class="aside-backdrop"></div>
    <div class="aside-container">
      <div class="aside-close">
        <v-icon name="close"/>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aside',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    classes() {
      let classes = 'aside';
      classes += this.open ? ' open' : '';
      return classes;
    },
  },
  methods: {
    closeAside() {
      this.$emit('close-aside');
    },
    toggleNoScroll(apply) {
      const body = document.querySelector('body');
      if (apply) {
        body.classList.add('noscroll');
      } else {
        body.classList.remove('noscroll');
      }
    },
  },
  updated() {
    if (this.open) {
      this.toggleNoScroll(true);
    } else {
      this.toggleNoScroll(false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.aside {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .aside-container {
    width: 75vw;
    height: 100vh;
    overflow: hidden;
    z-index: 101;
    background-color: #333;
    padding: 15px;
    transform: translateX(calc(100% - 25px));

    .aside-close {
      color: $chromeWhite;
      width: 100%;
    }
  }

  .aside-backdrop {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0,0,0,0.6);
  }

  &.open {

    .aside-backdrop {
      display: flex;
    }

    .aside-container {
      transform: translateX(0);
      transition: all .25s ease-in-out;
    }
  }
}
</style>
