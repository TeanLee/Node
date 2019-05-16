const BASEURL = 'https://www.easy-mock.com/mock/5b67eb7b75d70b78bbc620f8/SmileVue/';
const LOCALURL = 'http://localhost:3000/';
const URL = {
  getShopingMallInfo: `${BASEURL}goods`, // 商城首页所有信息
  getGoodsInfo: `${BASEURL}getGoodsInfo`,
  registerUser: `${LOCALURL}user/register`, // 用户注册接口
  loginUser: `${LOCALURL}user/login`, // 用户登录接口
};

module.exports = URL;
