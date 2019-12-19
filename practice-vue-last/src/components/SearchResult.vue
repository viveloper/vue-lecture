<template>
  <ul v-if="searchResult.length" class="list">
    <li v-for="item in searchResult">
      <img v-bind:src="item.image" v-bind:alt="item.image">
      <p>{{item.name}}</p>
    </li>
  </ul>
  <p v-else>검색 결과가 없습니다</p>
</template>

<script>
export default {
  props: ['searchResult'],
  data () {
    return {

    }
  },  
  methods: {
    
  }
}
</script>