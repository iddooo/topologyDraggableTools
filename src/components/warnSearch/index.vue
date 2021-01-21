<template>
  <div class="warn-search flex-ct">
    <BtSelect label="设备名称" v-model="form.name" :options="deviceOptions" />
    <BtSelect label="告警等级" v-model="form.level" :options="levelOptions" />
    <el-date-picker v-model="form.date" type="date" placeholder="选择日期" prefix-icon='null' :clearable="false">
    </el-date-picker>
    <BtSelect label="处理状态" v-model="form.state" :options="stateOptions" />
    <div class="searchbt">查询</div>
  </div>
</template>

<script>
import BtSelect from "./BtSelect";

export default {
  name: "",
  components: {
    BtSelect
  },
  data() {
    return {
      form: {
        name: undefined,
        level: undefined
      },
      deviceOptions: [
        {
          label: "设备名称",
          value: undefined
        },
        {
          label: "设备2",
          value: "2"
        },
        {
          label: "设备1",
          value: "1"
        },
        {
          label: "设备3",
          value: "4"
        }
      ],
      levelOptions: [
        {
          label: "告警等级",
          value: undefined
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "1",
          value: "1"
        },
        {
          label: "3",
          value: "4"
        }
      ],
      stateOptions: [
        {
          label: "处理状态",
          value: undefined
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.warn-search {
  padding-left: 68px;
  margin-bottom: 16px;
  .select {
    margin-right: 20px;
  }
  .searchbt{
      width: 120px;
      height: 38px;
      background-image: url('/static/images/btn5.png');
      background-size: 100% 100%;
      line-height: 38px;
      text-align: center;
      color: #294247;
  }
}
</style>
