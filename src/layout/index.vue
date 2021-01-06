<template>
  <div class="container">
      <div :class="['sidebar',{'isCollapse':!sidebar.opened}]">
          <div class="fold">
                <i @click="fold" class="el-icon-s-fold"></i>
            </div>
          <sidebar/>
      </div>
      <div class="main">
          <router-view/>
      </div>
  </div>
</template>

<script>
import sidebar from './siderbar'
import { mapGetters } from 'vuex'

export default {
  name: "",
  components: {
      sidebar
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['sidebar'])
    },
  watch: {},
  methods: {
      fold(){
          this.$store.dispatch('toggleSideBar')
        }
  },
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
        &.isCollapse{
            width: 54px;
        }
    }
    .main{
        flex: 1;
        height: 100%;
    }
}
.fold{
    font-size: 20px;
    padding-left: 20px;
}
</style>
