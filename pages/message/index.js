// pages/message/index.js
const { $Message } = require('../../components/base/index');
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
      second_subject: []
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
      url: 'http://127.0.0.1:7001/api/user/auth/user',
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`
      },
      success: (res) => {
        let data = Object.assign({}, res.data);
        data.second_subject = data.second_subject.split(',');
        this.setData({
          message: data
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
  toFirst: function () {
    this.setData({
      step: 0
    });
  },
  toSecond: function () {
    const message = this.data.message;
    if (!message.sex) {
      return $Message({
        content: '请选择性别',
        type: 'error'
      })
    }
    if (!message.tel_num) {
      return $Message({
        content: '请填写电话号码',
        type: 'error'
      })
    }
    if (!message.address) {
      return $Message({
        content: '请填写家庭住址',
        type: 'error'
      })
    }
    if (!message.account_location) {
      return $Message({
        content: '请填写户口所在地',
        type: 'error'
      })
    }
    if (!message.is_dorm) {
      return $Message({
        content: '请选择是否内宿',
        type: 'error'
      })
    }
    this.setData({
      step: 1
    });
  },
  toThird: function () {
    const message = this.data.message;
    if (!message.guardian_name) {
      return $Message({
        content: '请填写监护人姓名',
        type: 'error'
      })
    }
    if (!message.guardian_tel_num) {
      return $Message({
        content: '请填写监护人电话号码',
        type: 'error'
      })
    }
    if (!message.guardian_id_card) {
      return $Message({
        content: '请填写监护人身份证号',
        type: 'error'
      })
    }
    this.setData({
      step: 2
    });
  },
  handleSexChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        sex: e.detail.value
      }
    });
  },
  handleIsDormChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        is_dorm: e.detail.value
      }
    });
  },
  handleFirstSubjectChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        first_subject: e.detail.value
      }
    });
  },
  handleSecondSubjectChange: function (e) {
    const subject = e.detail.value;
    let second_subject = this.data.message.second_subject;
    if (second_subject.length < 2) {
      second_subject.push(subject);
    } else {
      second_subject.shift()
      second_subject.push(subject);
    }
    this.setData({
      message: {
        ...this.data.message,
        second_subject
      }
    });
  },
  handleSubmit: function () {
    const message = this.data.message;
    if (!message.first_subject) {
      return $Message({
        content: '请进行科目二选一',
        type: 'error'
      })
    }
    if (message.second_subject.length !== 2) {
      return $Message({
        content: '请进行科目四选二',
        type: 'error'
      })
    }
    const token = wx.getStorageSync('token');
    wx.request({
      url: 'http://127.0.0.1:7001/api/user/auth/user',
      method: 'PUT',
      header: {
        Authorization: `Bearer ${token}`
      },
      data: this.data.message,
      success: (res) => {
        $Message({
          content: '信息修改成功',
          type: 'success'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/home/index'
          })
        }, 1000);
      },
      fail: () => {
        $Message({
          content: '信息修改失败',
          type: 'error'
        })
      }
    });
  },
  handleNameChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        name: e.detail.detail.value
      }
    })
  },
  handleTemNumChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        tel_num: e.detail.detail.value
      }
    })
  },
  handleAddressChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        address: e.detail.detail.value
      }
    })
  },
  handleAccountLoactionChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        account_location: e.detail.detail.value
      }
    })
  },
  handleGuardianNameChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        guardian_name: e.detail.detail.value
      }
    })
  },
  handleGuardianTelNumChange: function (e) {
    this.setData({
      message: {
        ...this.data.message,
        guardian_id_card: e.detail.detail.value
      }
    })
  }
});