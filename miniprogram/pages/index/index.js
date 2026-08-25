// pages/index/index.js
// 直航 DirectAir 原生微信小程序脚本 (0 业务域名依赖 · 全网 5G/4G 极速秒开)

Page({
  data: {
    activeTab: 'home', // 'home' | 'wishlist' | 'trips' | 'wallet'
    
    // Flight & Countdown Status
    currentFlight: {
      airlineName: '中国东航',
      flightNo: 'MU5101',
      originCode: 'PEK',
      destCode: 'SHA',
      gate: 'C42',
      seat: '12F'
    },
    countdown: {
      hrs: '02',
      mins: '14',
      secs: '22'
    },
    totalSeconds: 2 * 3600 + 14 * 60 + 22,

    // Search Capsule States
    tripType: 'ONE_WAY', // 'ONE_WAY' | 'ROUND_TRIP' | 'DAY_RETURN'
    originCode: 'PEK',
    originCity: '北京',
    originAirport: '首都国际',
    destCode: 'SHA',
    destCity: '上海',
    destAirport: '虹桥国际',
    isSwapping: false,
    selectedCabin: 'ECONOMY', // 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'

    // Credit Cards State
    selectedCard: 'cmb', // 'cmb' | 'ccb' | 'bocom'
    claimToast: false
  },

  timer: null,

  onLoad() {
    this.startCountdown();
  },

  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  startCountdown() {
    this.timer = setInterval(() => {
      let secs = this.data.totalSeconds;
      if (secs > 0) {
        secs--;
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        this.setData({
          totalSeconds: secs,
          countdown: {
            hrs: String(h).padStart(2, '0'),
            mins: String(m).padStart(2, '0'),
            secs: String(s).padStart(2, '0')
          }
        });
      }
    }, 1000);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  switchToTrips() {
    this.setData({ activeTab: 'trips' });
  },

  switchToWishlist() {
    this.setData({ activeTab: 'wishlist' });
  },

  setTripType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ tripType: type });
  },

  swapAirports() {
    this.setData({ isSwapping: true });
    setTimeout(() => {
      const origCode = this.data.originCode;
      const origCity = this.data.originCity;
      const origAirport = this.data.originAirport;

      this.setData({
        originCode: this.data.destCode,
        originCity: this.data.destCity,
        originAirport: this.data.destAirport,
        destCode: origCode,
        destCity: origCity,
        destAirport: origAirport,
        isSwapping: false
      });
    }, 200);
  },

  selectCabin(e) {
    const cabin = e.currentTarget.dataset.cabin;
    this.setData({ selectedCabin: cabin });
  },

  selectCard(e) {
    const card = e.currentTarget.dataset.card;
    this.setData({ selectedCard: card, claimToast: false });
  },

  generateClaimPack() {
    this.setData({ claimToast: true });
    wx.showToast({
      title: '理赔材料包已生成',
      icon: 'success',
      duration: 2000
    });
  },

  handleSearchCTA() {
    wx.showModal({
      title: '航司官方全量比价',
      content: `已为您直连【${this.data.originCode} ✈ ${this.data.destCode}】东航、国航、南航官方全量舱位，无任何中间商加价与默认捆绑！`,
      showCancel: false,
      confirmText: '查看官方报价'
    });
  },

  openNameCorrection() {
    this.setData({ activeTab: 'wallet' });
  },

  openDisruptionGuide() {
    wx.showModal({
      title: '航变100%无损退改',
      content: '航司官方规定：因天气/航空管制导致的航班延误超15分钟，旅客享有100%全额非自愿退票权益，OTA中介不得扣除任何手续费！',
      showCancel: false,
      confirmText: '了解维权标准'
    });
  },

  openAirlineDirectApp() {
    wx.showToast({
      title: '正在直通东航官方App...',
      icon: 'none',
      duration: 2000
    });
  },

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
