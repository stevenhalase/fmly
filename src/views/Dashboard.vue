<template>
  <div class="dashboard">
    <PostEntry />
    <Feed />
  </div>
</template>

<script>
import PostEntry from '@/components/PostEntry.vue';
import Feed from '@/components/Feed.vue';

export default {
  name: 'dashboard',
  components: {
    PostEntry,
    Feed,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 15px;
}
</style>
