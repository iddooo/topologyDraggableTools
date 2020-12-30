<template>
  <div class="">
    <el-row>
      <el-col :span="12">字体</el-col>
      <el-col :span="12">大小</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input v-model="node.font.fontFamily" @change="onChange"/>
      </el-col>
      <el-col :span="12">
        <el-input v-model="node.font.fontSize" @change="onChange"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">颜色</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <colorPicker v-model="node.font.color"  @change="headleChangeColor"/>
        <el-input v-model="node.font.color" @change="onChange"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">倾斜</el-col>
      <el-col :span="12">加粗</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-select v-model="node.font.fontStyle" @change="onChange">
          <el-option
            v-for="item in fontStyle"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select v-model="node.font.fontWeight" @change="onChange">
          <el-option
            v-for="item in fontWeight"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">水平居中</el-col>
      <el-col :span="12">垂直对齐</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-select v-model="node.font.textAlign" @change="onChange">
          <el-option
            v-for="item in textAlign"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select v-model="node.font.textBaseline" @change="onChange">
          <el-option
            v-for="item in textBaseline"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col>文本</el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input type="textarea" v-model="node.text" @change="onChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userImages from '../Tools/userImages'

export default {
  name: "",
  components: {
        userImages
  },
  props:['node'],

  data() {
    return {
      fontStyle:[
        {label:"正常",value:"normal"},
        {label:"倾斜",value:"italic"},
      ],
      fontWeight:[
        {label:"正常",value:"normal"},
        {label:"加粗",value:"bold"},
      ],
      textAlign:[
        {label:"左对齐",value:"left"},
        {label:"居中",value:"center"},
        {label:"右对齐",value:"right"},
      ],
      textBaseline:[
        {label:"顶部对齐",value:"top"},
        {label:"居中",value:"middle"},
        {label:"右对齐",value:"bottom"},
      ]
    };
  },
  computed: {},
  methods: {
    onChange(value){
        this.$emit('change', this.node);
    },
    headleChangeColor(v){
        this.node.bkColor = v
        this.$emit('change', this.node);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
