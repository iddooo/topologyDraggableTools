<template>
    <div class="default-box">
        <div v-for="(item, index) in $attrs.defalutMenusData"
            :key="index">
            <div class="title">{{ item.group }}</div>
            <div class="buttons">
                <a v-for="(btn, i) in item.children" 
                    :key="i" 
                    :title="btn.name" 
                    :draggable="btn.data" 
                    @dragstart="onDrag($event, btn)">
                    <i v-if="btn.icon" :class="`iconfont ${btn.icon}`"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'',
    components: {},
    data() {
      return {
          
      };
    },
    computed: {},
    watch: {},
    methods: {
        onDrag(event, node) {
            this.$emit('dragstart',event, node)
        },
    },
    created() {
 
    },
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.default-box{
    padding: 8px;
}
.title {
      color: #0d1a26;
      font-weight: 600;
      font-size: 12px;
      padding: 5px 15px;
      border-bottom: 1px solid #ddd;
    }
.buttons {
    padding: 10px 0;
    img{
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
    a {
    display: inline-block;
    color: #314659;
    line-height: 1;
    width: 40px;
    height: 40px;
    text-align: center;
    text-decoration: none !important;
    cursor: pointer;

    .iconfont {
        font-size: 24px;
    }

    &:hover {
        color: #1890ff;
    }
    }
}
</style>