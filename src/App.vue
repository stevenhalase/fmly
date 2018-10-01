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
    const refs = {
      usersRef: this.$store.state.dbRefs.usersRef,
      postsRef: this.$store.state.dbRefs.postsRef,
      commentsRef: this.$store.state.dbRefs.commentsRef
    }
    this.$store.dispatch('setRefs', refs, this.$store.state);

    
    this.$store.dispatch('getLocalUser')
      .then(() => {
        this.$router.push({ name: 'dashboard' });
      })
      .catch(() => {

      });

    // const user = {
    //   avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd69a733850498.56ba69ac2f221.png',
    //   name: 'Danielle Halase',
    //   username: 'danielle'
    // };
    // this.$store.dispatch('register', user);
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
}

</style>
