<template>
  <div class="auth">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'auth',
  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  min-height: 100vh;
  padding: 15px;
}
</style>
