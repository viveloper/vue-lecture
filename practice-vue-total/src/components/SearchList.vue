<template>
  <div v-if="searchList.length">
    <ul class="list">
    <li v-for="(item, index) in searchList" v-on:click="onClickList(item.keyword)">
      <span v-if="keywordType" class="number">{{index+1}}</span>
      {{item.keyword}}
      <span v-if="historyType" class="date">{{item.date}}</span>
      <button v-if="historyType" class="btn-reset" v-on:click.stop="onClickHistoryRemove(item.keyword)"></button>
    </li>
  </ul>
  </div>
  <div v-else>
    <p v-if="keywordType">추천 검색어가 없습니다</p>
    <p v-if="historyType">최근 검색어가 없습니다</p>
  </div>
</template>

<script>
export default {
  props: ['type','searchList'],
  computed: {
    keywordType() {
      return this.type === 'keyword' ;
    },
    historyType() {
      return this.type === 'history';
    }
  },
  methods: {
    onClickList(keyword) {
      this.$emit('@onClickList', keyword);
    },
    onClickHistoryRemove(keyword) {
      this.$emit('@onClickHistoryRemove', keyword)
    }
  }
}
</script>