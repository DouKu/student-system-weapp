// pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    sexEnmus: [{
      id: 1,
      name: '男'
    }, {
      id: 2,
      name: '女'
    }],
    sex: '',
    isDorm: '否',
    first_subject: '',
    second_subject: [],
    message: {
      name: '',
      sex: 0,
      tel_num: '',
      address: '',
      account_location: '',
      is_dorm: 0,
      guardian_name: '',
      guardian_tel_num: '',
      guardian_id_card: '',
      first_subject: 0,
      second_subject: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  toFirst: function () {
    this.setData({
      step: 0
    });
  },
  toSecond: function () {
    this.setData({
      step: 1
    });
  },
  toThird: function () {
    this.setData({
      step: 2
    });
  },
  handleSexChange: function (e) {
    this.setData({
      sex: e.detail.value
    });
  },
  handleIsDormChange: function (e) {
    this.setData({
      isDorm: e.detail.value
    });
  },
  handleFirstSubjectChange: function (e) {
    this.setData({
      first_subject: e.detail.value
    });
  },
  handleSecondSubjectChange: function (e) {
  },
});