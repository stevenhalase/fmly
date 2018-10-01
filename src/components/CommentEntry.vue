<template>
  <div class="comment-entry">
    <Avatar :imgSrc="userData.avatar" size="small" class="comment-entry-avatar" />
    <input @keyup.enter="submitComment" v-model="comment.comment.message" class="comment-entry-input" placeholder="Enter a comment..." />
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
      type: Number,
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
      return this.comment.comment.message && this.comment.comment.message.length > 0;
    },
    submitComment(ev) {
      if (this.validComment()) {
        this.comment.comment.id = Math.floor(Math.random() * 10) + 2394600;
        this.comment.comment.date = new Date().getTime();

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
    this.comment.postId = this.postId;
    this.comment.comment.user = this.userData;
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
