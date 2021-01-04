<template>
  <div class="event">
    <el-form label-width="80px" :model="event">
      <el-form-item label="事件类型">
        <el-select v-model="event.type" @change="onTypeChange">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- webscoket 事件才有消息名称 -->
      <el-form-item label="消息名称" v-show="event.type == 2">
        <el-select v-model="event.name" @change="onChange">
          <el-option
            v-for="item in names"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件行为">
        <el-select v-model="event.action" @change="onActionChange">
          <el-option
            v-for="item in actions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- * window下的全局函数 -->
      <el-form-item label="函数名称">
        <el-select v-model="value" @change="onValueChange">
          <el-option
            v-for="item in values"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="函数参数">
        <el-select v-model="event.params" @change="onChange">
          <el-option
            v-for="item in params"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { msgList, eventList, controlDevice } from "~/api/zutai";

let vm;
import { fns } from "./e";
// 注册全局事件
Object.keys(fns).forEach(fn => {
  window[fn] = fns[fn];
});
window.control = (pen, params) => {
  console.log("控制",JSON.parse(params));
  controlDevice(JSON.parse(params)).then(res=>{
    // 执行控制操作
    console.log(res)
  })
};

export default {
  name: "",
  components: {},
  props: ["event"],
  data() {
    return {
      value: "",
      types: [
        { label: "单击", value: 0 },
        { label: "双击", value: 1 },
        { label: "websocket", value: 2 }
      ],
      // 消息名称
      names: [],
      // 事件行为
      actions: [],
      // 自定义函数
      values: [],
      // 参数
      params: [],
      //自定义 事件行为
      actionsWebscket: [
        { label: "获取状态", value: 3 },
        { label: "获取数据", value: 4 }
      ],
      actionsClick: [{ label: "自定义事件", value: 3 }],
      // 自定义 函数名称
      valueRenderView: [
        { label: "状态监测(红)", value: "radioRed" },
        { label: "状态监测(绿)", value: "radioGreen" },
        { label: "电机状态", value: "buttonState" }
      ],
      valueEditAttr: [{ label: "修改属性", value: "editAttr" }],
      valueControl: [],
    };
  },
  computed: {},
  methods: {
    onChange(value) {
      this.$emit("change", this.event);
    },
    async getMsgData() {
      let res = await msgList();
      this.names = res.data;
    },
    async getEventData() {
      let res = await eventList();

      let result = res.data.reduce((a, b, i) => {
        a.push({
          label: b.name,
          value: i,
          identifier: b.identifier,
          controlValue: b.value
        });
        return a;
      }, []);

      this.valueControl = result
    },
    onTypeChange(type) {
      if( type == 2 ){
        this.actions = this.actionsWebscket
        this.values =  this.valueRenderView
      }else{
        this.actions  = this.actionsClick
        this.values = this.valueControl
      }

      this.event.name = undefined
      this.event.action = undefined
      this.value = undefined
      this.event.value = this.value
    },
    onActionChange(action) {
      if(action==4){
        this.values = this.valueEditAttr
        this.value = 'editAttr'
      }else{
        this.values = this.event.type==2 ? this.valueRenderView : this.valueControl
        this.value = undefined
      }
      this.event.value = this.value
    },
    onValueChange(value) {
      console.log("value :>> ", value);
      if (this.event.type == 2) {
        this.event.value = value;
      } else {
        this.event.value = "control";
        let checked = this.values[value];
        let params = {
          identifier: checked.identifier,
          value: checked.controlValue,
          deviceId: 522
        };
        this.event.params = JSON.stringify(params);
      }
    }
  },
  created() {
    this.getMsgData();
    this.getEventData();
    this.actions = this.actionsWebscket;
    this.values = this.valueRenderView;
  },
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
