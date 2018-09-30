<template>
  <div :class="classes">
    <div @click="closeModal" class="modal-backdrop"></div>
    <div class="modal-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    classes() {
      let classes = 'modal';
      classes += this.open ? ' open' : '';
      return classes;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;

  &.open {
    display: flex;
  }

  .modal-backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0,0,0,0.6);
  }

  .modal-container {
    width: 80%;
    min-height: 300px;
    border-radius: 4px;
    overflow: hidden;
    z-index: 101;
    background-color: $chromeWhite;
    padding: 15px;
  }
}
</style>
