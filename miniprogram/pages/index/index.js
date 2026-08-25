// pages/index/index.js
Page({
  data: {
    // 永久公网 HTTPS 生产地址 (支持全球任意 5G/4G 移动蜂窝网络及任何 Wi-Fi 访问)
    directAirUrl: 'https://tanaxu626.github.io/directair/'
  },

  onLoad(options) {
    console.log('DirectAir 公网加载地址:', this.data.directAirUrl);
  },

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
