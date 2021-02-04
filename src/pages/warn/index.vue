<template>
  <div class="page">
    <div class="serch-ctr">
      <warnSearch :form="form" @search="search" />
    </div>
    <div class="table-ctr">
      <Table :data="warnList" :columns="columns"></Table>
    </div>
  </div>
</template>

<script>
import Table from "~/components/TableSearch/Table";
import warnSearch from "./warnSearch";

const columns = [
  { label: "序号", prop: "index", width: "" },
  { label: "设备名称", prop: "sno", width: "" },
  { label: "告警内容", prop: "phone", width: "110" },
  { label: "告警等级", prop: "nickname", width: "" },
  { label: "告警时间", prop: "age", width: "" },
  { label: "处理状态", prop: "province", width: "" }
];
export default {
  name: "warn",
  components: {
    Table,
    warnSearch
  },
  data() {
    return {
      warnList: [],
      columns,
      form: {
        name: undefined,
        level: undefined,
        date: undefined,
        state: undefined
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
      search(form){
          console.log('form :>> ', form);
      }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.page {
  position: absolute;
  left: 0;
  top: 120px;
  width: 100%;
  z-index: 9;
  .table-ctr {
    margin: 0 68px;
  }
}
</style>
