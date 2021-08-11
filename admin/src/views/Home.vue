<template>
  <div>
    <avue-data-tabs :option="option"></avue-data-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      option: {
        data: [
          
        ],
      },
    };
  },
  methods: {
    async fetchtotal(){
      const total = await this.$http.get('home/option')
      this.option.data = total.data.data
    }
  },
  created () {
    this.fetchtotal()
  }
};
</script>
