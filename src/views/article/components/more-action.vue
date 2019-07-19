<template>
  <div class="more-action">
    <van-button
    icon="star-o"
    round
    :loading="isLikeLoading"
    :type="isLike ? 'danger' : 'default'"
    @click="handleLike"
    >{{ isLike ? '取消' : ''}}点赞</van-button>
    <van-button icon="delete" round type="default">不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle } from '@/api/article'
export default {
  name: 'MoreAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLikeLoading: false
    }
  },
  computed: {
    isLike () {
      return this.article.attitude === 1
    }
  },
  created () {},
  methods: {
    async handleLike () {
      try {
        if (!this.$checkLogin()) {
          return
        }
        this.isLikeLoading = true
        const articleId = this.article.art_id
        console.log(articleId)
        // 如果已赞，则取消点赞
        if (this.article.attitude === 1) {
          await unLikeArticle(articleId)
          this.article.attitude = -1
        } else {
          // 如果没赞，则赞
          await likeArticle(articleId)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isLikeLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
