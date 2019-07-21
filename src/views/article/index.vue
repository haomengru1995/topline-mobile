<template>
  <div class="article-wrap">
    <van-nav-bar
      title="今日头条"
      left-text="返回"
      left-arrow
      @click-left="$route.back()"
    />
    <h2 class="article-title">{{ article.title }}</h2>
    <AuthInfo class="arto-info" :article="article" />
    <div class="article-content" v-html="article.content"></div>
    <MoreAction :article="article"/>
    <!-- <RecommendArticle /> -->
    <!-- <RecommendSearch /> -->
    <!--
      source 用来指定数据的 id，默认获取文章评论，如果是获取评论的回复列表，则指定 is-article 为 false
     -->
    <CommentList
      :source="$route.params.articleId.toString()"
      @is-replylist-show="handleIsReplyListShow" />

    <!-- 回复列表组件 -->
    <ReplyList
      v-model="isReplyListShow"
      :comment-id="commentId"
    />
    <!-- /回复列表组件 -->
    <WriteComment />
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import CommentList from './components/comment-list'
import MoreAction from './components/more-action'
// import RecommendArticle from './components/recommend-article'
// import RecommendSearch from './components/recommend-search'
import ReplyList from './components/reply-list'
import WriteComment from './components/write-comment'
import { getArticleDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    // RecommendArticle,
    // RecommendSearch,
    CommentList,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      article: {
      },
      isReplyListShow: false, // 控制回复组件的显示状态
      commentId: null // 点击回复的评论 id
    }
  },
  created () {
    this.loadArticleDetail()
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    async loadArticleDetail () {
      try {
        const data = await getArticleDetail(this.$route.params.articleId.toString())
        this.article = data
      } catch (err) {
        console.log(err)
      }
    },
    handleIsReplyListShow (id) {
      this.commentId = id
      this.isReplyListShow = true
    }
  }
}
</script>

<style lang="less" scoped>
  .article-wrap {
    padding: 20px;
    .article-content {
      font-size: 24px;
    }
    .arto-info {
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 10;
    }
  }
</style>
