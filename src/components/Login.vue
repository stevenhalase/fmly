<template>
  <div class="login">
    <Avatar :imgSrc="userAvatar || 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png'" class="login-user-image" />
    <input @keyup.enter="login" v-model="username" class="login-username-input" placeholder="Username" type="text" />
    <input @keyup.enter="login" v-model="password" class="login-password-input" placeholder="Password" type="password" />
    <Button @click.native="login" text="Login" :block="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  components: {
    Avatar,
    Button,
  },
  computed: {
    ...mapState({
      userAvatar: state => state.userData.avatar,
    }),
    validLogin() {
      return (this.username && this.username.length > 0) && (this.password && this.password.length > 0);
    },
  },
  methods: {
    login() {
      if (this.validLogin) {
        this.$store.dispatch('login', { username: this.username, password: this.password })
          .then(() => {
            this.$router.push({ name: 'dashboard' });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
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

  .login-username-input,
  .login-password-input {
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 5px;
    padding: 10px;
  }

  a {
    width: 100%;
  }
}
</style>
