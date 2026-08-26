// pages/index/index.js
// 直航 DirectAir 100% 原生全交互体验版控制器 (v1.2.0)

const MOCK_CITIES = [
  { code: 'PEK', city: '北京', airport: '首都国际 T2/T3' },
  { code: 'PKX', city: '北京', airport: '大兴国际' },
  { code: 'SHA', city: '上海', airport: '虹桥国际 T2' },
  { code: 'PVG', city: '上海', airport: '浦东国际 T1/T2' },
  { code: 'CAN', city: '广州', airport: '白云国际 T1/T2' },
  { code: 'SZX', city: '深圳', airport: '宝安国际 T3' },
  { code: 'CTU', city: '成都', airport: '双流国际' },
  { code: 'TFU', city: '成都', airport: '天府国际' },
  { code: 'HGH', city: '杭州', airport: '萧山国际' },
  { code: 'XIY', city: '西安', airport: '咸阳国际' },
  { code: 'CKG', city: '重庆', airport: '江北国际' },
  { code: 'KMG', city: '昆明', airport: '长水国际' }
];

const MOCK_FLIGHT_LIST = [
  {
    id: 'f-mu5101',
    airlineCode: 'MU',
    airlineName: '中国东航',
    flightNo: 'MU5101',
    aircraftModel: '波音 777-300ER (宽体客机)',
    isWideBody: true,
    punctuality: '95.2%',
    depTime: '08:00',
    depAirport: '北京首都',
    depTerminal: 'T2',
    arrTime: '10:15',
    arrAirport: '上海虹桥',
    arrTerminal: 'T2',
    duration: '2h 15m',
    ecoPrice: 620,
    busPrice: 2800,
    seatsLeft: 4
  },
  {
    id: 'f-ca1501',
    airlineCode: 'CA',
    airlineName: '中国国航',
    flightNo: 'CA1501',
    aircraftModel: '空客 A350-900 (宽体墨镜侠)',
    isWideBody: true,
    punctuality: '96.8%',
    depTime: '09:00',
    depAirport: '北京首都',
    depTerminal: 'T3',
    arrTime: '11:20',
    arrAirport: '上海虹桥',
    arrTerminal: 'T2',
    duration: '2h 20m',
    ecoPrice: 670,
    busPrice: 2950,
    seatsLeft: 6
  },
  {
    id: 'f-cz3101',
    airlineCode: 'CZ',
    airlineName: '南方航空',
    flightNo: 'CZ3101',
    aircraftModel: '空客 A330-300 (宽体客机)',
    isWideBody: true,
    punctuality: '94.0%',
    depTime: '10:30',
    depAirport: '北京大兴',
    depTerminal: '主楼',
    arrTime: '12:45',
    arrAirport: '上海虹桥',
    arrTerminal: 'T2',
    duration: '2h 15m',
    ecoPrice: 600,
    busPrice: 2450,
    seatsLeft: 3
  },
  {
    id: 'f-hu7601',
    airlineCode: 'HU',
    airlineName: '海南航空',
    flightNo: 'HU7601',
    aircraftModel: '波音 787-9 (梦想客机)',
    isWideBody: true,
    punctuality: '93.5%',
    depTime: '11:15',
    depAirport: '北京首都',
    depTerminal: 'T2',
    arrTime: '13:30',
    arrAirport: '上海虹桥',
    arrTerminal: 'T2',
    duration: '2h 15m',
    ecoPrice: 560,
    busPrice: 2200,
    seatsLeft: 5
  }
];

Page({
  data: {
    // Navigation Views
    currentView: 'home', // 'home' | 'flight_results'
    activeTab: 'home',   // 'home' | 'wishlist' | 'trips' | 'wallet'

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
    departDate: '2026-10-01',
    isSwapping: false,
    selectedCabin: 'ECONOMY', // 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'

    // City Picker Modal
    showCityModal: false,
    selectingType: 'origin', // 'origin' | 'dest'
    cityList: MOCK_CITIES,

    // Flight Search Results
    allFlights: MOCK_FLIGHT_LIST,
    filteredFlights: MOCK_FLIGHT_LIST,
    activeFilter: 'ALL', // 'ALL' | 'WIDE_BODY' | 'CHEAPEST' | 'EARLIEST'

    // Flight Detail Modal
    showFlightModal: false,
    selectedFlight: MOCK_FLIGHT_LIST[0],

    // Credit Cards State
    selectedCard: 'cmb', // 'cmb' | 'ccb' | 'bocom'
    loungePoints: 4,
    claimToast: false,

    // Anti-OTA Rights Modals
    showNameCorrectionModal: false,
    correctionAirline: 'CX', // 'CX' | 'MU' | 'CA' | 'CZ'

    showDisruptionModal: false,
    showBoardingPassModal: false
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

  // Navigation handlers
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab, currentView: 'home' });
  },

  switchToTrips() {
    this.setData({ activeTab: 'trips', currentView: 'home' });
  },

  switchToWishlist() {
    this.setData({ activeTab: 'wishlist', currentView: 'home' });
  },

  backToHome() {
    this.setData({ currentView: 'home' });
  },

  // City Picker Handlers
  openCityPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectingType: type,
      showCityModal: true
    });
  },

  closeCityModal() {
    this.setData({ showCityModal: false });
  },

  selectCityItem(e) {
    const item = e.currentTarget.dataset.item;
    if (this.data.selectingType === 'origin') {
      this.setData({
        originCode: item.code,
        originCity: item.city,
        originAirport: item.airport,
        showCityModal: false
      });
    } else {
      this.setData({
        destCode: item.code,
        destCity: item.city,
        destAirport: item.airport,
        showCityModal: false
      });
    }
    wx.vibrateShort({ type: 'light' });
  },

  // Airport Swap
  swapAirports() {
    this.setData({ isSwapping: true });
    wx.vibrateShort({ type: 'medium' });
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

  // Date & Cabin
  onDateChange(e) {
    this.setData({ departDate: e.detail.value });
  },

  setTripType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ tripType: type });
  },

  selectCabin(e) {
    const cabin = e.currentTarget.dataset.cabin;
    this.setData({ selectedCabin: cabin });
  },

  // Flight Search Flow
  performSearch() {
    wx.showLoading({ title: '直连航司官方报价...' });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        currentView: 'flight_results',
        activeFilter: 'ALL',
        filteredFlights: this.data.allFlights
      });
      wx.vibrateShort({ type: 'light' });
    }, 400);
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    let list = [...this.data.allFlights];

    if (filter === 'WIDE_BODY') {
      list = list.filter(f => f.isWideBody);
    } else if (filter === 'CHEAPEST') {
      list.sort((a, b) => a.ecoPrice - b.ecoPrice);
    } else if (filter === 'EARLIEST') {
      list.sort((a, b) => a.depTime.localeCompare(b.depTime));
    }

    this.setData({
      activeFilter: filter,
      filteredFlights: list
    });
  },

  // Flight Detail Modal
  openFlightDetail(e) {
    const flight = e.currentTarget.dataset.flight;
    this.setData({
      selectedFlight: flight,
      showFlightModal: true
    });
  },

  closeFlightModal() {
    this.setData({ showFlightModal: false });
  },

  handleOfficialBooking() {
    this.closeFlightModal();
    wx.showModal({
      title: '航司官方通道出票',
      content: `已为您直通【${this.data.selectedFlight.airlineName}】官方直营渠道，本次购票享 100% 官方电子客票与退改保障，0 任何中介捆绑！`,
      showCancel: false,
      confirmText: '完成官方直通'
    });
  },

  // Credit Cards State
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

  // Rights Hub Modals
  openNameCorrectionModal() {
    this.setData({ showNameCorrectionModal: true, correctionAirline: 'CX' });
  },

  closeNameCorrectionModal() {
    this.setData({ showNameCorrectionModal: false });
  },

  selectCorrectionAirline(e) {
    const code = e.currentTarget.dataset.code;
    this.setData({ correctionAirline: code });
  },

  openDisruptionModal() {
    this.setData({ showDisruptionModal: true });
  },

  closeDisruptionModal() {
    this.setData({ showDisruptionModal: false });
  },

  openBoardingPassModal() {
    this.setData({ showBoardingPassModal: true });
  },

  closeBoardingPassModal() {
    this.setData({ showBoardingPassModal: false });
  },

  addNewMonitorRule() {
    wx.showModal({
      title: '添加放票雷达',
      content: '已为您建立【北京 PEK ✈ 上海 SHA】次卡放票 24h 毫秒级雷达，有余票将第一时间推送！',
      showCancel: false,
      confirmText: '开启监控'
    });
  },

  openAirlineDirectApp() {
    wx.showToast({
      title: '正在直通东航官方App...',
      icon: 'none',
      duration: 2000
    });
  },

  preventDumb() {
    // Prevent modal content clicks from bubbling to mask
  },

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
