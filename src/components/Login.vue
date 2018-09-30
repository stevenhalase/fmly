<template>
  <div class="login">
    <Avatar :imgSrc="userAvatar" class="login-user-image" />
    <router-link :to="{ name: 'dashboard', params: { }}">
      <Button text="Login" :block="true" />
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';
export default {
  name: 'login',
  components: {
    Avatar,
    Button,
  },
  computed: {
    ...mapState({
      userAvatar: state => state.userData.avatar,
    }),
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.3);

  .login-user-image {
    margin-bottom: 15px;
  }

  a {
    width: 100%;
  }
}
</style>
