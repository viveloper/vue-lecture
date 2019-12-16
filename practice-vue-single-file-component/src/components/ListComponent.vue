<template>
  <div v-if="list.length>0">
    <ul class="list">
      <li v-for="(item, index) in list" v-on:click="onClickList(item.keyword)">
        <span v-if="keywordType" class="number">{{index+1}}</span>
        {{item.keyword}}
        <span v-if="historyType" class="date">{{item.date}}</span>
        <button v-if="historyType" class="btn-remove" v-on:click.stop="onClickRemoveList(item.keyword)"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    <span v-if="keywordType">추천 검색어 목록이 없습니다</span>
    <span v-if="historyType">최근 검색어 목록이 없습니다</span>
  </div>
</template>

<script>
export default {  
  props: ['list', 'type'],
  computed: {
    keywordType() {
      return this.type === 'keyword';
    },
    historyType() {
      return this.type === 'history';
    }
  },
  methods: {
    onClickList(keyword) {
      this.$emit('@click', keyword);
    },
    onClickRemoveList(keyword) {
      this.$emit('@remove', keyword);
    }
  }
}
</script>