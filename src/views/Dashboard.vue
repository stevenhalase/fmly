<template>
  <div class="dashboard">
    <Button @click.native="logout" text="LOGOUT" :block="true" class="dashboard-logout-button" />
    <PostEntry />
    <Feed />
  </div>
</template>

<script>
import PostEntry from '@/components/PostEntry.vue';
import Feed from '@/components/Feed.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'dashboard',
  methods: {
    logout() {
      this.$store.dispatch('logout')
          .then((response) => {
            this.$router.push({ name: 'auth' });
          });
    },
  },
  components: {
    PostEntry,
    Feed,
    Button
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  min-height: 100vh;
  padding: 15px;

  .dashboard-logout-button {
    margin-bottom: 15px;
  }
}
</style>
