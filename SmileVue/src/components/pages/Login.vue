<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>

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
        <van-button type="primary" @click="loginAction" :loading="openLoading" size="large">马上登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
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
  created() {
    if (localStorage.userInfo) {
      Toast.success('您已经登录过啦！');
      this.$router.push('/');
    }
  },
  methods: {
    // 验证表单之后向后端发送请求进行登录
    loginAction() {
      this.checkForm() && this.loginUser();
    },
    // 用户登录方法
    loginUser() {
      // 先把按钮设置成灰色，防止重复提交
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        console.log(res);
        // 如果返回 code 为 200，代表登录成功
        if (res.data.code === 200) {
          // 把登录状态保存在本地
          new Promise((resolve, reject) => {
            localStorage.userInfo = { username: this.username };
            setTimeout(() => {
              resolve();
            }, 500);
          }).then(() => {
            Toast.success('登录成功');
            this.$router.push('/');
          }).catch(() => {
            Toast.fail('登录状态保存失败');
            console.log(err);
          });
        } else {
          Toast.fail('登录失败');
          this.openLoading = false;
        }
      }).catch((err) => {
        console.log(err);
        Toast.fail('登录失败');
        this.openLoading = false;
      });
    },
    // 验证表单信息
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位';
        isOk = false;
      } else {
        this.usernameErrorMsg = '';
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位';
        isOk = false;
      } else {
        this.passwordErrorMsg = '';
      }
      return isOk;
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
