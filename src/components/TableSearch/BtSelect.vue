<template>
  <div class="select" ref="select">
    <div class="button" @click="toggleMenu" v-clickoutside="handleClose">
      {{ selected.label || label }}
    </div>
    <slot>
      <div class="p-list-ctr" :style="{ height: height + 'px' }">
        <div class="p-list">
          <div
            class="p-item"
            v-for="(item, i) in options"
            @click="handleClick(item)"
            :key="i"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "",
  components: {},
  props: ["value", "options",'label'],
  directives: { Clickoutside },
  data() {
    return {
      show: false,
      selected: {},
      height: 0
    };
  },
  computed: {},

  watch: {
    value: {
      immediate: true,
      handler(v, o) {
        this.setSelected();
      }
    },
    show: {
      handler(v, o) {
        let h = this.$refs.select.offsetHeight;
        this.height = v ? h * this.options.length + 2 : 0;
      }
    }
  },

  methods: {
    handleClick(item) {
      this.selected = item;
      this.$emit("input", this.selected.value);
      this.toggleMenu();
    },
    setSelected() {
      let selected = this.options.filter(v => {
        return v.value == this.value;
      });
      this.selected = selected[0];
    },
    toggleMenu() {
      this.show = !this.show;
    },
    handleClose() {
      this.show = false;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.select {
  width: 120px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #25d9ff;
  position: relative;
  z-index: 10;
  .button {
    background-image: url("/static/images/btn3.png");
    background-size: 100% 100%;
  }
  .p-list-ctr {
    width: 100%;
    position: absolute;
    left: 0;
    top: 48px;
    height: 0;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }
  .p-list {
    background: rgba(37, 217, 255, 0.15);
    border: 1px solid #25d9ff;
    box-shadow: 0px -2px 12px 0px rgba(37, 217, 255, 0.6);
  }

  .p-item {
    cursor: pointer;
  }
  .p-item:hover {
    background: rgba(37, 217, 255, 0.2);
  }
}
</style>
