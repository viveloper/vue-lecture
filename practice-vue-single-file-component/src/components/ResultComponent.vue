<template>
  <div v-if="searchResult.length>0" id="search-result">
    <ul>
      <li v-for="item in searchResult">
        <img v-bind:src="item.image" v-bind:alt="item.image">
        {{item.name}}
      </li>
    </ul>
  </div>
  <div v-else id="search-result">
    {{query}} 검색어로 찾을 수 없습니다
  </div>
</template>

<script>
export default {  
  props: ['searchResult', 'query'],
}
</script>