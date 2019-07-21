// pages/auth/index.js
const { $Message } = require('../../components/base/index');
const { logout } = require('../../utils/util');
const { baseUrl } = require('../../config/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '20142100236',
    password: '123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    if (token) {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onLogin: function () {
    wx.request({
      url: `${baseUrl}/api/user/signin`,
      method: 'POST',
      data: this.data,
      success: (res) => {
        const { statusCode, data } = res;
        if (statusCode === 401) {
          return logout();
        }
        if (statusCode === 200) {
          this.authSuccess(data);
        } else {
          this.authFail();
        }
      },
      fail: () => {
        this.authFail();
      }
    })
  },

  authSuccess: function (data) {
    $Message({
      content: '登录成功',
      type: 'success'
    });
    wx.setStorage({
      key: 'token',
      data: data.token
    });
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    }, 1000);
  },

  authFail: function () {
    $Message({
      content: '登录失败',
      type: 'error'
    });
  },

  onAccountChange: function (e) {
    this.setData({
      account: e.detail.detail.value
    })
  },
  onPasswordChange: function (e) {
    this.setData({
      password: e.detail.detail.value
    })
  }
})