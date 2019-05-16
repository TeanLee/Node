<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" @click="registerAction" :loading="openLoading" size="large">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios';
import url from '@/serviceAPI.config.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开启用户的Loading
      usernameErrorMsg: '',
      passwordErrorMsg: '',
    };
  },
  methods: {
    // 验证表单之后向后端发送请求进行注册
    registerAction() {
      this.checkForm() && this.registerUser();
    },
    // 用户注册方法
    registerUser() {
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
        }
      }).then((res) => {
        console.log(res);
        // 如果返回 code 为 200，代表注册成功
        if (res.data.code === 200) {
          Toast.success('注册成功');
        } else {
          Toast.fail('注册失败');
          this.openLoading = false;
        }
      }).catch((err) => {
        console.log(err);
        Toast.fail('注册失败');
        this.openLoading = false;
      })
    },
    // 验证表单信息
    checkForm() {
      let isOk = true;
      if (this.username.length < 5){
        this.usernameErrorMsg = '用户名不能小于5位';
        isOk = false;
      } else {
        this.usernameErrorMsg = '';
      }
      if (this.password.length < 6){
        this.passwordErrorMsg= '密码不能少于6位';
        isOk= false;
      } else {
        this.passwordErrorMsg = '';
      }
      return isOk;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
