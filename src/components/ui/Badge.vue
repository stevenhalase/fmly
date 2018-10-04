<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'badge',
  props: {
    size: {
      type: String,
    },
  },
  computed: {
    classes() {
      let classes = 'badge';
      classes += this.size ? ` ${this.size}` : '';
      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global';

.badge {
  background-color: $chromeWhite;
  color: $silver;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;

  &.small {
    padding: 2px 5px;
  }
}
</style>
