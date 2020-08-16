// pages/home/index.js
const { logout } = require('../../utils/util');
const { baseUrl } = require('../../config/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     message: {
      name: '',
      sex: '',
      tel_num: '',
      address: '',
      account_location: '',
      is_dorm: '',
      guardian_name: '',
      guardian_tel_num: '',
      guardian_id_card: '',
      first_subject: '',
      second_subject: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.redirectTo({
        url: '/pages/auth/index'
      });
    }
    wx.request({
      url: `${baseUrl}/api/user/auth/user`,
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`
      },
      success: (res) => {
        const { statusCode } = res;
        if (statusCode === 401) {
          return logout();
        } 
        this.setData({
          message: res.data
        });
      },
      fail: () => {
        $Message({
          content: '信息获取失败',
          type: 'error'
        });
      }
    });
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
  toEdit: function () {
    wx.navigateTo({
      url: '/pages/message/index'
    });
  },
  signout: function () {
    logout();
  }
})