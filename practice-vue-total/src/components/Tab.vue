<template>
  <ul id="tabs" class="tabs">
    <li v-for="tab in tabs" v-bind:class="{active: tab===selectedTab}" v-on:click="onClick(tab)">{{tab}}</li>    
  </ul>
</template>

<script>
export default {
  props: ['tabs', 'selectedTab'],
  methods: {
    onClick(tab) {
      this.$emit('@click', tab);
    }
  }
}
</script>