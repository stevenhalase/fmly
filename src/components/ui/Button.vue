<template>
  <button :class="classes">{{ text }}</button>
</template>

<script>
export default {
  name: 'button',
  props: {
    text: {
      type: String,
      required: true,
    },
    block: {
      type: Boolean,
    },
    size: {
      type: String,
    },
  },
  computed: {
    classes() {
      let classes = 'button';
      classes += this.block ? ' block' : '';
      classes += this.size ? ` ${this.size}` : '';
      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.button {
  background-color: $carrotOrange;
  color: $chromeWhite;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: $goldenBell;
    cursor: pointer;
  }

  &.block {
    width: 100%;
    padding: 10px 20px;
  }

  &.small {
    padding: 5px 10px;
  }
}
</style>
