<template>
  <div :class="classes">
    <v-icon :name="icon"/>
  </div>
</template>

<script>
export default {
  name: 'fab',
  props: {
    icon: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    size: {
      type: String,
    },
  },
  computed: {
    classes() {
      let classes = 'fab';
      classes += this.disabled ? ' disabled' : '';
      classes += this.size ? ` ${this.size}` : '';
      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.fab {
  background-color: $lochinvar;
  color: $chromeWhite;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.small {
    width: 25px;
    height: 25px;
    padding: 7px;
  }

  &:hover {
    background-color: $calypso;
    cursor: pointer;
  }

  &.disabled {
    pointer-events: none;
  }
}
</style>
