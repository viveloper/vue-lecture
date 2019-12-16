export default {
  template: '#list',
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