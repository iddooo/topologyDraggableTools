<template>
  <div class="login">
    <img class="img" src="/static/images/ys.png" alt="" />
    <div class="box">
      <div class="box_title">用户登录</div>
      <div class="from">
        <div class="form-item">
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            @input="changeValue"
          >
          </el-input>
        </div>
        <div class="form-item">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            type="password"
            @input="changeValue"
          >
          </el-input>
        </div>
        <el-button @click="submit" :disabled="isFill">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isFill: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeValue() {
      if (
        this.username &&
        this.username != "" &&
        this.password &&
        this.password != ""
      ) {
        this.isFill = false;
      } else {
        this.isFill = true;
      }
    },
    submit() {
      this.$router.push("/");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.login {
  width: 100%;
  min-height: 100%;
  position: relative;
  background-image: url("/static/images/bg.png");
  background-size: 100% 100%;
  .img {
    width: 816px;
    height: 628px;
    margin-left: 110px;
    margin-top: 200px;
  }
  .box {
    width: 466px;
    height: 452px;
    position: absolute;
    left: 1182px;
    top: 266px;
    background: url("/static/images/login.png") no-repeat;
    background-size: 100% 100%;
    .box_title {
      padding-top: 51px;
      text-align: center;
      line-height: 24px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
    }
    .from {
      padding: 57px 50px 0px;
      .form-item {
        padding-bottom: 42px;
        /deep/.el-input {
          width: 366px;
          height: 48px;
          background-color: transparent;
          .el-input__inner {
            height: 100%;
            background-color: transparent;
            padding-left: 24px;
            color: #ffffff !important;
            font-size: 16px;
            border: 1px solid #25d9ff;
            border-radius: 4px;
          }
          .el-input__inner::-webkit-input-placeholder {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      /deep/.el-button {
        border: 0;
        padding: 0;
        width: 366px;
        height: 48px;
        background: #25d9ff;
        border-radius: 4px;
        text-align: center;
        line-height: 48px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        margin: 0 auto;
      }
    }
  }
}
</style>
