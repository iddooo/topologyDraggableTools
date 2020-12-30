<template>
  <div class="container">
      <div class="sidebar">
          <sidebar/>
      </div>
      <div class="main">
          <router-view/>
      </div>
  </div>
</template>

<script>
import sidebar from './siderbar'

export default {
  name: "",
  components: {
      sidebar
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    .sidebar{
        width: 200px;
        height: 100%;
    }
    .main{
        flex: 1;
        height: 100%;
    }
}
</style>
