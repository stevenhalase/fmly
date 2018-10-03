<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'app',
  created() {
    this.$store.dispatch('getLocalUser')
      .then(() => {
        this.$router.push({ name: 'dashboard' });
      })
      .catch(() => {

      });
  },
};
</script>

<style lang="scss">
@import './styles/global';

#app {
  background-color: $chathamsBlue;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

</style>
