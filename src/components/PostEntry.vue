<template>
  <div class="post-entry">
    <div class="post-entry-user">
      <Avatar :imgSrc="userData.avatar" size="small" />
    </div>
    <div class="post-entry-content">
      <textarea v-model="post.message" class="post-entry-message" placeholder="Enter a message..."></textarea>
      <Button @click.native="submitPost" text="POST" :block="true" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'post-entry',
  data() {
    return {
      post: {},
    };
  },
  computed: {
    ...mapState({
      userData: state => state.userData,
    }),
    validPost() {
      return this.post.message && this.post.message.length > 0;
    },
  },
  methods: {
    submitPost(ev) {
      if (this.validPost) {
        this.post.date = new Date().getTime();

        const newPost = JSON.parse(JSON.stringify(this.post));

        this.$store.dispatch('addPost', newPost)
          .then((response) => {
            this.resetPost();
          });
      }
    },
    resetPost() {
      this.post.date = null;
      this.post.message = '';
    },
  },
  mounted() {
    this.post.user = this.userData._id;
  },
  components: {
    Avatar,
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.post-entry {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;

  .post-entry-user {
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
  }

  .post-entry-content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .post-entry-title,
    .post-entry-message {
      width: 100%;
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,0.1);
      margin-bottom: 5px;
      padding: 10px;
    }

    .post-entry-message {
      resize: none;
    }
  }
}
</style>
