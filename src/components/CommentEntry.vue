<template>
  <div class="comment-entry">
    <Avatar :imgSrc="userData.avatar" size="small" class="comment-entry-avatar" />
    <input @keyup.enter="submitComment" v-model="comment.message" class="comment-entry-input" placeholder="Enter a comment..." />
    <Button @click.native="submitComment" class="comment-entry-submit" text="POST" :block="true" size="small" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'comment-entry',
  data() {
    return {
      comment: { 
        comment: {
          likes: []
        } 
      }
    };
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
  },
  methods: {
    validComment() {
      return this.comment.message && this.comment.message.length > 0;
    },
    submitComment(ev) {
      if (this.validComment()) {
        this.comment.date = new Date().getTime();

        const newComment = JSON.parse(JSON.stringify(this.comment));

        this.$store.dispatch('addComment', newComment)
          .then(response => {
            this.resetComment();
          });
      }
    },
    resetComment() {
      this.comment.comment.date = null;
      this.comment.comment.message = '';
    }
  },
  mounted() {
    this.comment.post = this.postId;
    this.comment.user = this.userData['.key'];
  },
  components: {
    Avatar,
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.comment-entry {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    .comment-entry-input {
      width: calc(100% - 70px);
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,0.1);
      margin-bottom: 5px;
      padding: 10px;
      margin-left: 10px;
    }

    .comment-entry-submit {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
