// pages/index/index.js
// 直航 DirectAir 100% 原生全交互与智能搜索输入版 (v1.3.0)

const MOCK_CITIES_ALL = [
  { code: 'PEK', city: '北京', airport: '首都国际 T2/T3', keywords: 'beijing shoudu beijingshoudu pek bjs' },
  { code: 'PKX', city: '北京', airport: '大兴国际', keywords: 'beijing daxing beijingdaxing pkx' },
  { code: 'SHA', city: '上海', airport: '虹桥国际 T2', keywords: 'shanghai hongqiao shanghaihongqiao sha' },
  { code: 'PVG', city: '上海', airport: '浦东国际 T1/T2', keywords: 'shanghai pudong shanghaipudong pvg' },
  { code: 'CAN', city: '广州', airport: '白云国际 T1/T2', keywords: 'guangzhou baiyun guangzhoubaiyun can' },
  { code: 'SZX', city: '深圳', airport: '宝安国际 T3', keywords: 'shenzhen baoan shenzhenbaoan szx' },
  { code: 'CTU', city: '成都', airport: '双流国际 T2', keywords: 'chengdu shuangliu chengdushuangliu ctu' },
  { code: 'TFU', city: '成都', airport: '天府国际 T2', keywords: 'chengdu tianfu chengdutianfu tfu' },
  { code: 'HGH', city: '杭州', airport: '萧山国际 T3/T4', keywords: 'hangzhou xiaoshan hangzhouxiaoshan hgh' },
  { code: 'XIY', city: '西安', airport: '咸阳国际 T3', keywords: 'xian xianyang xianxianyang xiy' },
  { code: 'CKG', city: '重庆', airport: '江北国际 T3', keywords: 'chongqing jiangbei chongqingjiangbei ckg' },
  { code: 'KMG', city: '昆明', airport: '长水国际', keywords: 'kunming changshui kunmingchangshui kmg' },
  { code: 'WUH', city: '武汉', airport: '天河国际 T3', keywords: 'wuhan tianhe wuhantianhe wuh' },
  { code: 'NKG', city: '南京', airport: '禄口国际 T2', keywords: 'nanjing lukou nanjinglukou nkg' },
  { code: 'XMN', city: '厦门', airport: '高崎国际 T3/T4', keywords: 'xiamen gaoqi xiamengaoqi xmn' },
  { code: 'SYX', city: '三亚', airport: '凤凰国际 T1/T2', keywords: 'sanya fenghuang sanyafenghuang syx' },
  { code: 'HAK', city: '海口', airport: '美兰国际 T2', keywords: 'haikou meilan haikoumeilan hak' },
  { code: 'TAO', city: '青岛', airport: '胶东国际', keywords: 'qingdao jiaodong qingdaojiaodong tao' },
  { code: 'DLC', city: '大连', airport: '周水子国际', keywords: 'dalian zhoushuizi dalianzhoushuizi dlc' },
  { code: 'SHE', city: '沈阳', airport: '桃仙国际 T3', keywords: 'shenyang taoxian shenyangtaoxian she' },
  { code: 'HRB', city: '哈尔滨', airport: '太平国际 T2', keywords: 'haerbin taiping haerbintaiping hrb' },
  { code: 'URC', city: '乌鲁木齐', airport: '地窝堡国际 T3/T4', keywords: 'wulumuqi diwopu urc' },
  { code: 'HKG', city: '香港', airport: '香港国际 T1', keywords: 'xianggang hongkong hkg' },
  { code: 'MFM', city: '澳门', airport: '澳门国际', keywords: 'aomen macau mfm' },
  { code: 'TPE', city: '台北', airport: '桃园国际 T2', keywords: 'taipei taoyuan tpe' },
  { code: 'TYO', city: '东京', airport: '羽田/成田国际', keywords: 'dongjing tokyo haneda narita tyo hnd nrt' },
  { code: 'OSA', city: '大阪', airport: '关西国际 KIX', keywords: 'daban osaka kansai osa kix' },
  { code: 'SEL', city: '首尔', airport: '仁川/金浦国际', keywords: 'shouer seoul incheon sel icn gmp' },
  { code: 'SIN', city: '新加坡', airport: '樟宜国际 T1-T4', keywords: 'xinjiapo singapore changi sin' },
  { code: 'BKK', city: '曼谷', airport: '素万那普国际 BKK', keywords: 'mangu bangkok suvarnabhumi bkk' },
  { code: 'LHR', city: '伦敦', airport: '希思罗国际 T2/T5', keywords: 'lundun london heathrow lhr' },
  { code: 'JFK', city: '纽约', airport: '肯尼迪国际 T4/T7', keywords: 'niuyue newyork jfk' },
  { code: 'SFO', city: '旧金山', airport: '旧金山国际', keywords: 'jiujinshan sanfrancisco sfo' }
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
    walletSubTab: 'credit_cards', // 'credit_cards' | 'loyalty_cards' | 'rights_center'

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

    // Searchable City Picker Modal
    showCityModal: false,
    selectingType: 'origin', // 'origin' | 'dest'
    citySearchQuery: '',
    allCities: MOCK_CITIES_ALL,
    filteredCityList: MOCK_CITIES_ALL.slice(0, 12), // default top 12 hubs

    // Flight Search Results
    allFlights: MOCK_FLIGHT_LIST,
    filteredFlights: MOCK_FLIGHT_LIST,
    activeFilter: 'ALL', // 'ALL' | 'WIDE_BODY' | 'CHEAPEST' | 'EARLIEST'

    // Flight Detail Modal
    showFlightModal: false,
    selectedFlight: MOCK_FLIGHT_LIST[0],

    // Credit Cards State
    selectedCard: 'cmb', // 'cmb' | 'ccb' | 'bocom' | 'boc'
    loungePoints: 4,
    claimToast: false,

    // Anti-OTA Rights Modals
    showNameCorrectionModal: false,
    correctionAirline: 'CX', // 'CX' | 'MU' | 'CA' | 'CZ'
    showDisruptionModal: false,
    showTicketVerifierModal: false,
    verifyTicketNo: '781-2491823901',
    verifyResult: true,

    showSpecialServicesModal: false,
    showBoardingPassModal: false,
    showAddWishlistModal: false,
    selectedNewRoute: 'PEK_SHA',
    selectedNewMode: 'PASS',

    // Wishlist Monitored Items
    wishlistItems: [
      {
        id: 'w-1',
        origin: 'PEK (北京首都)',
        dest: 'SHA (上海虹桥)',
        flightInfo: '中国东航 MU5101',
        date: '2026-10-01 08:00',
        priceNote: '次卡固定成本 ¥399/段',
        statusText: '监控中 · 发现 2 个可兑换座位',
        airlineName: '东航',
        airlineApp: 'ceair'
      }
    ]
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

  switchToWallet() {
    this.setData({ activeTab: 'wallet', walletSubTab: 'rights_center', currentView: 'home' });
  },

  setWalletSubTab(e) {
    const sub = e.currentTarget.dataset.sub;
    this.setData({ walletSubTab: sub });
  },

  backToHome() {
    this.setData({ currentView: 'home' });
  },

  // City Picker with Search Input Handlers
  openCityPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectingType: type,
      citySearchQuery: '',
      filteredCityList: this.data.allCities.slice(0, 12),
      showCityModal: true
    });
  },

  closeCityModal() {
    this.setData({ showCityModal: false });
  },

  onCitySearchInput(e) {
    const query = (e.detail.value || '').trim().toLowerCase();
    this.setData({ citySearchQuery: query });

    if (!query) {
      this.setData({ filteredCityList: this.data.allCities.slice(0, 12) });
      return;
    }

    const filtered = this.data.allCities.filter(item => {
      return (
        item.code.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.airport.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query)
      );
    });

    this.setData({ filteredCityList: filtered });
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

  applyCustomSearchCity() {
    const query = this.data.citySearchQuery.toUpperCase();
    if (!query) return;

    if (this.data.selectingType === 'origin') {
      this.setData({
        originCode: query.slice(0, 3),
        originCity: this.data.citySearchQuery,
        originAirport: '机场',
        showCityModal: false
      });
    } else {
      this.setData({
        destCode: query.slice(0, 3),
        destCity: this.data.citySearchQuery,
        destAirport: '机场',
        showCityModal: false
      });
    }
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
    wx.showLoading({ title: `查询 ${this.data.originCode} ✈ ${this.data.destCode}...` });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        currentView: 'flight_results',
        activeFilter: 'ALL',
        filteredFlights: this.data.allFlights
      });
      wx.vibrateShort({ type: 'light' });
    }, 350);
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

  useLoungePoint() {
    if (this.data.loungePoints > 0) {
      this.setData({ loungePoints: this.data.loungePoints - 1 });
      wx.showToast({ title: '已核销 1 次 CIP 贵宾点数', icon: 'success' });
    } else {
      wx.showToast({ title: '年度点数已用尽', icon: 'none' });
    }
  },

  generateClaimPack() {
    this.setData({ claimToast: true });
    wx.showToast({
      title: '理赔材料包已生成',
      icon: 'success',
      duration: 2000
    });
  },

  // Anti-OTA Rights Modals
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

  openTicketVerifierModal() {
    this.setData({ showTicketVerifierModal: true });
  },

  closeTicketVerifierModal() {
    this.setData({ showTicketVerifierModal: false });
  },

  onTicketNoInput(e) {
    this.setData({ verifyTicketNo: e.detail.value });
  },

  handleVerifyTicket() {
    wx.showLoading({ title: '正在连接中航信...' });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({ verifyResult: true });
      wx.showToast({ title: '验真成功：官方正规票', icon: 'success' });
    }, 400);
  },

  openSpecialServicesModal() {
    this.setData({ showSpecialServicesModal: true });
  },

  closeSpecialServicesModal() {
    this.setData({ showSpecialServicesModal: false });
  },

  showRefundLadderModal() {
    wx.showModal({
      title: '民航局官方 4 级阶梯退改标准',
      content: '1. 起飞前 7 天以上：退票 5% / 免费改期\n2. 起飞前 7 天至 4 小时：退票 20% / 改期 10%\n3. 起飞前 4 小时以内：退票 40% / 改期 20%\n4. 起飞后：退票 50% / 改期 30%\n【严厉打击 OTA 任何超出官方费率的二次扣费行为！】',
      showCancel: false,
      confirmText: '核对官方标准'
    });
  },

  openBoardingPassModal() {
    this.setData({ showBoardingPassModal: true });
  },

  closeBoardingPassModal() {
    this.setData({ showBoardingPassModal: false });
  },

  openAddWishlistModal() {
    this.setData({ showAddWishlistModal: true });
  },

  closeAddWishlistModal() {
    this.setData({ showAddWishlistModal: false });
  },

  selectNewRoute(e) {
    this.setData({ selectedNewRoute: e.currentTarget.dataset.route });
  },

  selectNewMode(e) {
    this.setData({ selectedNewMode: e.currentTarget.dataset.mode });
  },

  confirmAddWishlist() {
    this.closeAddWishlistModal();
    wx.showToast({
      title: '已开启 24h 毫秒级放票雷达',
      icon: 'success',
      duration: 2500
    });
  },

  openImportTripModal() {
    wx.showModal({
      title: '导入我的机票行程',
      content: '【🛠️ 2.0版本上线】正在对接中航信自动化客票同步与航司短信 OCR 智能解析，即将于下个版本开放！',
      showCancel: false,
      confirmText: '敬请期待'
    });
  },

  showUpcomingFeature(e) {
    const title = e.currentTarget.dataset.title || '该功能';
    const version = e.currentTarget.dataset.version || '2.0';
    wx.showModal({
      title: `${title} [🛠️ ${version}版本开放]`,
      content: `本功能正在进行航司/银行官方专线加密联调，将在 ${version} 版本全量推送，敬请期待！`,
      showCancel: false,
      confirmText: '好的'
    });
  },

  showLoyaltyCardDetail(e) {
    const airline = e.currentTarget.dataset.airline;
    wx.showModal({
      title: `${airline}会员卡权益管理`,
      content: `已为您直通【${airline}】官方补登通道与贵宾休息室核验，享受 100% 官方会员保障！`,
      showCancel: false,
      confirmText: '查看权益'
    });
  },

  showSecurityVaultInfo() {
    wx.showModal({
      title: '🔒 DirectAir 端侧隐私保险箱',
      content: '所有乘机人证件号码、银行卡号及常旅客卡号均经过 AES-256 硬件级加密保存在您的手机本地 Keychain，绝不上传任何第三方云端服务器，从物理层杜绝数据泄露！',
      showCancel: false,
      confirmText: '安全保障确认'
    });
  },

  openAirlineDirectApp(e) {
    const app = e.currentTarget.dataset.app || '航司';
    wx.showToast({
      title: `正在直通官方 App 抢兑...`,
      icon: 'none',
      duration: 2000
    });
  },

  preventDumb() {
    // Prevent modal clicks bubbling to mask
  },

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
