<template>
    <div class="default-box">
        <div v-for="(item, index) in data"
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
    props:['data'],
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
    padding: 0.1rem 0;
    img{
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
    a {
    display: inline-block;
    color: #314659;
    line-height: 1;
    width: 0.4rem;
    height: 0.4rem;
    text-align: center;
    text-decoration: none !important;
    cursor: pointer;

    .iconfont {
        font-size: 0.24rem;
    }

    &:hover {
        color: #1890ff;
    }
    }
}
</style>