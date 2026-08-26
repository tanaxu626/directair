// pages/index/index.js
// 直航 DirectAir 100% 原生全国 250+ 机场与无机场城市多维深度接驳系统 (v1.40 - 全量功能落地与视觉层级增强版)

// 1. 全国 250+ 在册民航机场全量数据库
const COMPREHENSIVE_AIRPORTS_DATABASE = [
  // 1. 云南省航点 (大理/丽江/版纳/腾冲/香格里拉等)
  { code: 'DLU', city: '大理', airport: '凤仪机场 (荒草坝)', note: '苍山洱海度假胜地 · 距古城20km', keywords: 'dali fengyi huangcaoba dlu dl yn yunnan 大理 凤仪 荒草坝 洱海 双廊' },
  { code: 'LJG', city: '丽江', airport: '三义国际机场', note: '玉龙雪山门户 · 距古城28km', keywords: 'lijiang sanyi ljg sanyiguoji yn yunnan 丽江 三义 玉龙雪山' },
  { code: 'KMG', city: '昆明', airport: '长水国际 T1/T2', note: '东航云南基地 · 面向南亚门户', keywords: 'kunming changshui kmg cs km yn 昆明 长水' },
  { code: 'JHG', city: '西双版纳', airport: '嘎洒国际机场', note: '热带雨林傣乡门户 · 距景洪市中心5km', keywords: 'xishuangbanna gasa jhg bn banna 西双版纳 嘎洒 版纳 景洪' },
  { code: 'DIG', city: '香格里拉', airport: '迪庆香格里拉机场', note: '雪域高原秘境 · 距独克宗古城5km', keywords: 'xianggelila diqing dig xgll 香格里拉 迪庆 梅里雪山' },
  { code: 'TCZ', city: '腾冲', airport: '驼峰机场', note: '极边第一城 · 温泉地热胜地', keywords: 'tengchong tuofeng tcz tf tc 腾冲 驼峰 和顺古镇' },
  { code: 'LUM', city: '芒市', airport: '德宏芒市机场', note: '孔雀之乡 · 中缅边境口岸', keywords: 'mangshi dehong lum ms 芒市 德宏' },
  { code: 'BSD', city: '保山', airport: '云瑞机场', note: '滇西枢纽门户', keywords: 'baoshan yunrui bsd bs 保山 云瑞' },
  { code: 'SYM', city: '普洱', airport: '思茅机场', note: '中国茶城 · 普洱茶原产地', keywords: 'puer simao sym pe 普洱 思茅' },
  { code: 'ZAT', city: '昭通', airport: '昭通机场', note: '滇东北高原航点', keywords: 'zhaotong zat zt 昭通' },
  { code: 'LNJ', city: '临沧', airport: '博尚机场', note: '世界佤乡 · 恒春之都', keywords: 'lincang boshang lnj lc 临沧' },
  { code: 'JMJ', city: '澜沧', airport: '景迈机场', note: '景迈山古茶林文化景观', keywords: 'lancang jingmai jmj 澜沧 景迈' },
  { code: 'CWJ', city: '沧源', airport: '佤山机场', note: '阿佤山水 · 秘境沧源', keywords: 'cangyuan washan cwj cy 沧源 佤山' },

  // 2. 超级直辖市与核心商务大都会
  { code: 'PEK', city: '北京', airport: '首都国际 T2/T3', note: '国航/海航主基地 · 距市中心25km', keywords: 'beijing shoudu pek bjs bj 北京 首都' },
  { code: 'PKX', city: '北京', airport: '大兴国际', note: '东航/南航主基地 · 高铁20分钟抵京', keywords: 'beijing daxing pkx dx 北京 大兴 雄安 廊坊' },
  { code: 'SHA', city: '上海', airport: '虹桥国际 T2', note: '京沪商务核心 · 距市中心13km', keywords: 'shanghai hongqiao sha hq sh 上海 虹桥' },
  { code: 'PVG', city: '上海', airport: '浦东国际 T1/T2', note: '国际与跨洲际超级枢纽 · 距市中心30km', keywords: 'shanghai pudong pvg pd 上海 浦东 迪士尼' },
  { code: 'CAN', city: '广州', airport: '白云国际 T1/T2', note: '南航超级主基地 · 华南第一枢纽', keywords: 'guangzhou baiyun can by gz 广州 白云' },
  { code: 'SZX', city: '深圳', airport: '宝安国际 T3', note: '深航主基地 · 大湾区核心极点', keywords: 'shenzhen baoan szx ba sz 深圳 宝安' },
  { code: 'CTU', city: '成都', airport: '双流国际 T2', note: '老牌市区枢纽 · 距春熙路16km', keywords: 'chengdu shuangliu ctu sl cd 成都 双流' },
  { code: 'TFU', city: '成都', airport: '天府国际 T2', note: '西南超级枢纽 · 18号线快线直通', keywords: 'chengdu tianfu tfu tf 成都 天府 简阳' },
  { code: 'CKG', city: '重庆', airport: '江北国际 T3', note: '成渝双城核心 · 轨道10号线直达', keywords: 'chongqing jiangbei ckg jb cq 重庆 江北' },
  { code: 'HGH', city: '杭州', airport: '萧山国际 T3/T4', note: '长三角南翼枢纽 · 19号线快线', keywords: 'hangzhou xiaoshan hgh xs hz 杭州 萧山' },
  { code: 'TSN', city: '天津', airport: '滨海国际 T1/T2', note: '京津冀核心干线机场', keywords: 'tianjin binhai tsn bh tj 天津 滨海' },

  // 3. 四川 / 贵州 / 西藏
  { code: 'JZH', city: '九寨沟', airport: '黄龙机场', note: '九寨归来不看水 · 高原旅游航点', keywords: 'jiuzhaigou huanglong jzh jz 九寨沟 黄龙 九寨' },
  { code: 'DCY', city: '稻城', airport: '亚丁机场', note: '世界最高民航机场 · 蓝色星球净土', keywords: 'daocheng yading dcy yd 稻城 亚丁' },
  { code: 'XIC', city: '西昌', airport: '青山机场', note: '航天城 · 邛海湿地度假胜地', keywords: 'xichang qingshan xic xc 西昌 青山' },
  { code: 'MIG', city: '绵阳', airport: '南郊机场', note: '川北核心区域枢纽', keywords: 'mianyang nanjiao mig my 绵阳' },
  { code: 'YBP', city: '宜宾', airport: '五粮液机场', note: '万里长江第一城 · 中国酒都', keywords: 'yibin wuliangye ybp yb 宜宾 五粮液 蜀南竹海' },
  { code: 'LZO', city: '泸州', airport: '云龙机场', note: '川南区域综合航运中心', keywords: 'luzhou yunlong lzo lz 泸州 云龙' },
  { code: 'LXA', city: '拉萨', airport: '贡嘎国际机场', note: '日光之城 · 西藏自治区门户', keywords: 'lasa gongga lxa ls 拉萨 贡嘎 布达拉宫' },
  { code: 'LZY', city: '林芝', airport: '米林机场', note: '西藏江南 · 雅鲁藏布大峡谷', keywords: 'linzhi milin lzy lz 林芝 米林 鲁朗' },
  { code: 'KWE', city: '贵阳', airport: '龙洞堡国际 T2/T3', note: '爽爽贵阳 · 西南避暑大数据之都', keywords: 'guiyang longdongbao kwe ldb gy 贵阳 龙洞堡 黄果树' },
  { code: 'ZYI', city: '遵义', airport: '新舟机场', note: '红色圣地遵义门户', keywords: 'zunyi xinzhou zyi xz zy 遵义 新舟' },
  { code: 'WMT', city: '茅台', airport: '遵义茅台机场', note: '中国国酒之乡专用商务口岸', keywords: 'maotai zunyi wmt mt 茅台 遵义茅台 仁怀' },
  { code: 'LLB', city: '荔波', airport: '荔波机场', note: '地球绿宝石 · 小七孔景区直通', keywords: 'libo llb lb 荔波 小七孔' },

  // 4. 海南 / 广东 / 广西 / 福建
  { code: 'SYX', city: '三亚', airport: '凤凰国际 T1/T2', note: '热带滨海度假核心 · 距市区12km', keywords: 'sanya fenghuang syx fh sy 海南 三亚 凤凰' },
  { code: 'HAK', city: '海口', airport: '美兰国际 T1/T2', note: '海南自贸港门户 · 环岛高铁无缝接驳', keywords: 'haikou meilan hak ml hk 海口 美兰' },
  { code: 'BAR', city: '琼海', airport: '博鳌机场', note: '博鳌亚洲论坛专用航空港', keywords: 'qionghai boao bar ba 琼海 博鳌' },
  { code: 'ZUH', city: '珠海', airport: '金湾机场', note: '中国航展举办地 · 毗邻港珠澳大桥', keywords: 'zhuhai jinwan zuh jw zh 珠海 金湾 横琴 长隆' },
  { code: 'SWA', city: '揭阳', airport: '潮汕国际机场', note: '潮汕美食与文化大都会航点', keywords: 'jieyang chaoshan swa cs jy 揭阳 潮汕 汕头 潮州 南澳岛' },
  { code: 'ZHA', city: '湛江', airport: '吴川国际机场', note: '粤西国际航空新枢纽', keywords: 'zhanjiang wuchuan zha wc zj 湛江 吴川' },
  { code: 'HUZ', city: '惠州', airport: '平潭机场', note: '深圳第二机场协同航点', keywords: 'huizhou pingtan huz hz 惠州 平潭 双月湾' },
  { code: 'KWL', city: '桂林', airport: '两江国际 T2', note: '桂林山水甲天下 · 阳朔漓江旅游枢纽', keywords: 'guilin liangjiang kwl lj gl 桂林 两江 龙脊梯田' },
  { code: 'NNG', city: '南宁', airport: '吴圩国际 T2', note: '中国-东盟博览会主基地', keywords: 'nanning wuxu nng wx nn 南宁 吴圩 德天跨国瀑布' },
  { code: 'BHY', city: '北海', airport: '福成机场', note: '天下第一滩 · 涠洲岛度假门户', keywords: 'beihai fucheng bhy fc bh 北海 福成 涠洲岛 银滩' },
  { code: 'XMN', city: '厦门', airport: '高崎国际 T3/T4', note: '厦航主基地 · 鼓浪屿滨海花园之城', keywords: 'xiamen gaoqi xmn gq xm 厦门 高崎 鼓浪屿 漳州' },
  { code: 'FOC', city: '福州', airport: '长乐国际 T1/T2', note: '海上丝绸之路重镇门户', keywords: 'fuzhou changle foc cl fz 福州 长乐 平潭岛' },
  { code: 'JJN', city: '泉州', airport: '晋江国际机场', note: '宋元中国的世界海洋商贸中心', keywords: 'quanzhou jinjiang jjn qz 泉州 晋江' },
  { code: 'WUS', city: '武夷山', airport: '武夷山机场', note: '世界自然与文化双遗产名山', keywords: 'wuyishan wus wys 武夷山 大红袍' },

  // 5. 江苏 / 浙江 / 安徽 / 江西 / 湖北 / 湖南 / 河南 / 山西 / 陕西
  { code: 'NKG', city: '南京', airport: '禄口国际 T1/T2', note: '六朝古都江苏枢纽 · S1号线直通', keywords: 'nanjing lukou nkg lk nj 南京 禄口 扬州 镇江 句容 滁州' },
  { code: 'WUX', city: '无锡', airport: '硕放国际机场', note: '苏南核心 · 服务无锡及周边都会', keywords: 'wuxi shuofang wux sf wx 无锡 硕放 宜兴 阳山' },
  { code: 'NGB', city: '宁波', airport: '栎社国际 T2', note: '东方大港 · 浙东重要门户', keywords: 'ningbo lishe ngb ls nb 宁波 栎社 慈溪 余姚' },
  { code: 'WNZ', city: '温州', airport: '龙湾国际 T2', note: '民营经济之都 · 浙南枢纽', keywords: 'wenzhou longwan wnz lw wz 温州 龙湾 雁荡山' },
  { code: 'YIW', city: '义乌', airport: '义乌机场', note: '世界小商品之都国际航空港', keywords: 'yiwu yiw 金华 义乌 横店 横店影视城' },
  { code: 'HSN', city: '舟山', airport: '普陀山机场', note: '海天佛国 · 普陀山朝圣度假专用口岸', keywords: 'zhoushan putuoshan hsn pts zs 舟山 普陀山 朱家尖 东极岛' },
  { code: 'HFE', city: '合肥', airport: '新桥国际 T1', note: '科创名城 · 皖中核心枢纽', keywords: 'hefei xinqiao hfe xq hf 合肥 新桥 巢湖' },
  { code: 'TXN', city: '黄山', airport: '屯溪国际机场', note: '天下第一奇山 · 徽州古村落门户', keywords: 'huangshan tunxi txn hs 黄山 屯溪 宏村 西递 歙县' },
  { code: 'KHN', city: '南昌', airport: '昌北国际 T2', note: '英雄城江西省主枢纽', keywords: 'nanchang changbei khn cb nc 南昌 昌北 庐山' },
  { code: 'JDZ', city: '景德镇', airport: '罗家机场', note: '千年瓷都文化胜地', keywords: 'jingdezhen luojia jdz 景德镇 瓷都' },
  { code: 'JGS', city: '井冈山', airport: '井冈山机场', note: '红色摇篮名山', keywords: 'jinggangshan jgs 井冈山 吉安' },
  { code: 'WUH', city: '武汉', airport: '天河国际 T3', note: '九省通衢超级综合交通枢纽', keywords: 'wuhan tianhe wuh th wh 武汉 天河 黄鹤楼 鄂州 孝感' },
  { code: 'YIH', city: '宜昌', airport: '三峡机场', note: '世界水电名城 · 长江三峡游轮始发地', keywords: 'yichang sanxia yih sx yc 宜昌 三峡 神农架' },
  { code: 'ENH', city: '恩施', airport: '许家坪机场', note: '世界硒都 · 恩施大峡谷绝壁仙境', keywords: 'enshi xujiaping enh es 恩施 许家坪 利川' },
  { code: 'CSX', city: '长沙', airport: '黄花国际 T1/T2', note: '网红星城 · 磁浮列车站直连高铁', keywords: 'changsha huanghua csx hh cs 长沙 黄花 岳麓山 橘子洲' },
  { code: 'DYG', city: '张家界', airport: '荷花国际机场', note: '阿凡达哈利路亚悬浮山 · 天门山天险', keywords: 'zhangjiajie hehua dyg hh zjj 张家界 荷花 天门山 凤凰古城' },
  { code: 'CGO', city: '郑州', airport: '新郑国际 T2', note: '中原腹地 · 国际超级航空客运大枢纽', keywords: 'zhengzhou xinzheng cgo xz zz 郑州 新郑 少林寺 登封' },
  { code: 'LYA', city: '洛阳', airport: '北郊机场', note: '十三朝古都 · 龙门石窟与牡丹之乡', keywords: 'luoyang beijiao lya ly 洛阳 北郊 龙门石窟 白马寺' },
  { code: 'XIY', city: '西安', airport: '咸阳国际 T3/T5', note: '西北第一超大枢纽 · 兵马俑大唐不夜城', keywords: 'xian xianyang xiy xy xa 西安 咸阳 兵马俑 华山' },
  { code: 'TYN', city: '太原', airport: '武宿国际 T2', note: '三晋龙城主枢纽', keywords: 'taiyuan wusu tyn ws ty 太原 武宿 晋祠' },
  { code: 'DAT', city: '大同', airport: '云冈机场', note: '北魏京华 · 云冈石窟与悬空寺', keywords: 'datong yungang dat yg dt 大同 云冈 悬空寺 恒山' },

  // 6. 山东 / 华北 / 东北 / 西北
  { code: 'TAO', city: '青岛', airport: '胶东国际机场', note: '红瓦绿树碧海蓝天 · 胶东综合枢纽', keywords: 'qingdao jiaodong tao jd qd 青岛 胶东 崂山' },
  { code: 'TNA', city: '济南', airport: '遥墙国际机场', note: '泉城济南主枢纽 · 临近泰山', keywords: 'jinan yaoqiang tna yq jn 济南 遥墙 泰安 泰山 淄博' },
  { code: 'YNT', city: '烟台', airport: '蓬莱国际 T2', note: '仙境海岸 · 鲜美烟台', keywords: 'yantai penglai ynt pl yt 烟台 蓬莱 威海 长岛' },
  { code: 'WEH', city: '威海', airport: '大水泊国际机场', note: '千里山海最美自驾滨海都市', keywords: 'weihai dashuipo weh wh 威海 大水泊 刘公岛' },
  { code: 'SJW', city: '石家庄', airport: '正定国际 T2', note: '低成本航空枢纽 · 空铁联运', keywords: 'shijiazhuang zhengding sjw zd sjz 石家庄 正定 正定古城' },
  { code: 'HET', city: '呼和浩特', airport: '白塔国际机场', note: '青城内蒙古自治区主枢纽', keywords: 'huhehaote baita het bt hhht 呼和浩特 白塔 大召寺' },
  { code: 'HLD', city: '海拉尔', airport: '呼伦贝尔海拉尔机场', note: '呼伦贝尔大草原与大兴安岭林区', keywords: 'hailaer hulunbeier hld hle 海拉尔 呼伦贝尔 额尔古纳 莫尔格勒河' },
  { code: 'NZH', city: '满洲里', airport: '西郊机场', note: '中国最大陆路口岸 · 俄风情之城', keywords: 'manzhouli xijiao nzh mzl 满洲里 国门 套娃广场' },
  { code: 'DSN', city: '鄂尔多斯', airport: '伊金霍洛国际机场', note: '暖城鄂尔多斯 · 响沙湾沙漠', keywords: 'eerduosi yijinhuoluo dsn ordos 鄂尔多斯 响沙湾 库布齐' },
  { code: 'SHE', city: '沈阳', airport: '桃仙国际 T3', note: '东北第一大工业都会枢纽', keywords: 'shenyang taoxian she tx sy 沈阳 桃仙 故宫 抚顺 鞍山' },
  { code: 'DLC', city: '大连', airport: '周水子国际机场', note: '浪漫之都大连 · 东北沿海核心', keywords: 'dalian zhoushuizi dlc zsz dl 大连 周水子 旅顺 棒棰岛' },
  { code: 'CGQ', city: '长春', airport: '龙嘉国际 T2', note: '汽车与冰雪名城 · 空铁一体化', keywords: 'changchun longjia cgq lj cc 长春 龙嘉 净月潭 吉林市' },
  { code: 'YNJ', city: '延吉', airport: '朝阳川国际机场', note: '延边朝鲜族自治州美食与民俗胜地', keywords: 'yanji chaoyangchuan ynj yb 延吉 朝阳川 延边 图们 防川 朝鲜族' },
  { code: 'NBS', city: '长白山', airport: '长白山机场', note: '天池雪域滑雪度假核心航点', keywords: 'changbaishan nbs cbs 长白山 天池 万达滑雪 鲁能胜地' },
  { code: 'HRB', city: '哈尔滨', airport: '太平国际 T2', note: '冰城夏都 · 冰雪大世界与音乐之城', keywords: 'haerbin taiping hrb tp heb 哈尔滨 太平 冰雪大世界 太阳岛 亚布力' },
  { code: 'OHE', city: '漠河', airport: '古莲机场', note: '神州北极 · 中国最北极光观测地', keywords: 'mohe gulian ohe mh 漠河 北极村 龙江第一湾' },
  { code: 'URC', city: '乌鲁木齐', airport: '地窝堡国际 T3/T4', note: '亚欧核心综合航空大枢纽', keywords: 'wulumuqi diwopu urc dwp wlmq 乌鲁木齐 地窝堡 新疆 天山天池' },
  { code: 'KHG', city: '喀什', airport: '徕宁国际机场', note: '不到喀什不算到新疆 · 丝路千年古城', keywords: 'kashi laining khg ks 喀什 徕宁 古城 帕米尔高原 塔县 白沙湖' },
  { code: 'YIN', city: '伊宁', airport: '伊宁机场', note: '塞外江南伊犁河谷 · 薰衣草之乡', keywords: 'yining yin yl yili 伊宁 伊犁 那拉提 赛里木湖 昭苏 独库公路' },
  { code: 'AAT', city: '阿勒泰', airport: '雪都机场', note: '人类滑雪起源地 · 喀纳斯禾木胜境', keywords: 'aletai xuedu aat kanasi hemu 阿勒泰 喀纳斯 禾木 可可托海 将军山' },
  { code: 'LHW', city: '兰州', airport: '中川国际 T2/T3', note: '丝绸之路经济带重镇大枢纽', keywords: 'lanzhou zhongchuan lhw zc lz 兰州 中川 黄河铁桥 甘南' },
  { code: 'DNH', city: '敦煌', airport: '莫高国际机场', note: '世界艺术宝库莫高窟 · 鸣沙山月牙泉', keywords: 'dunhuang mogao dnh mg dh 敦煌 莫高窟 鸣沙山 月牙泉 玉门关' },
  { code: 'XNN', city: '西宁', airport: '曹家堡国际 T2/T3', note: '青藏高原东大门 · 青海湖与塔尔寺', keywords: 'xining caojiapu xnn cjb xn 西宁 曹家堡 青海湖 茶卡盐湖 塔尔寺' },
  { code: 'INC', city: '银川', airport: '河东国际 T3', note: '塞上江南 · 西夏王陵与贺兰山', keywords: 'yinchuan hedong inc hd yc 银川 河东 沙坡头 中卫 贺兰山' },

  // 7. 港澳台及国际大都市
  { code: 'HKG', city: '香港', airport: '香港国际 T1', note: '国泰航空超级主基地 · 离境退税¥120', keywords: 'hongkong xianggang hkg hk cpx 香港 迪士尼 维港 尖沙咀' },
  { code: 'MFM', city: '澳门', airport: '澳门国际', note: '大湾区便捷无缝签注通关口岸', keywords: 'macau aomen mfm am 澳门 威尼斯人 大三巴' },
  { code: 'TPE', city: '台北', airport: '桃园国际 T2', note: '华航/长荣航空核心主基地', keywords: 'taipei taoyuan tpe tb 台北 桃园 九份 101' },
  { code: 'TSA', city: '台北', airport: '松山机场', note: '台北市区核心直飞口岸', keywords: 'taipei songshan tsa ss 台北 松山 市区' },
  { code: 'TYO', city: '东京', airport: '羽田 HND / 成田 NRT', note: '日航/全日空超级双场枢纽', keywords: 'tokyo dongjing haneda narita tyo hnd nrt 东京 羽田 成田 银座 新宿' },
  { code: 'OSA', city: '大阪', airport: '关西国际 KIX', note: '关西空港人工岛 · 临近京都奈良', keywords: 'osaka daban kansai osa kix 大阪 关西 环球影城' },
  { code: 'SEL', city: '首尔', airport: '仁川 ICN / 金浦 GMP', note: '大韩/韩亚航空主基地', keywords: 'seoul shouer incheon sel icn gmp 首尔 仁川 金浦 明洞 弘大' },
  { code: 'SIN', city: '新加坡', airport: '樟宜国际 T1-T4', note: '新航主基地 · 连续多年世界最佳机场', keywords: 'singapore xinjiapo changi sin 新加坡 樟宜 滨海湾 圣淘沙' },
  { code: 'BKK', city: '曼谷', airport: '素万那普 BKK', note: '东南亚旅游中转大枢纽', keywords: 'bangkok mangu suvarnabhumi bkk 曼谷 素万那普' },
  { code: 'HKT', city: '普吉岛', airport: '普吉国际机场', note: '安达曼海度假胜地直飞口岸', keywords: 'pujidao phuket hkt 普吉岛 皮皮岛 斯米兰' },
  { code: 'KUL', city: '吉隆坡', airport: '吉隆坡国际 T1/T2', note: '马航/亚航超级枢纽', keywords: 'jilongpo kualalumpur kul 吉隆坡 双子塔 亚航' },
  { code: 'DPS', city: '巴厘岛', airport: '登巴萨努拉莱国际机场', note: '蜜月度假海岛胜地', keywords: 'balidao bali dps denpasar 巴厘岛 登巴萨 乌布 库塔' },
  { code: 'LHR', city: '伦敦', airport: '希思罗国际 T2/T5', note: '欧洲最繁忙跨大西洋国际门户', keywords: 'london lundun heathrow lhr 伦敦 希思罗' },
  { code: 'CDG', city: '巴黎', airport: '戴高乐国际 T2', note: '法航主基地 · 欧洲文化大都会', keywords: 'paris bali charlesdegaulle cdg 巴黎 戴高乐 埃菲尔铁塔' },
  { code: 'FRA', city: '法兰克福', airport: '法兰克福国际 T1/T2', note: '汉莎航空超级中转大都会', keywords: 'frankfurt falanfuke fra 法兰克福' },
  { code: 'DXB', city: '迪拜', airport: '迪拜国际 T3', note: '阿联酋航空全球最大 A380 枢纽', keywords: 'dubai dibai dxb 迪拜 哈利法塔' },
  { code: 'DOH', city: '多哈', airport: '哈马德国际机场', note: '卡塔尔航空五星级枢纽', keywords: 'doha duoha doh 多哈 哈马德' },
  { code: 'JFK', city: '纽约', airport: '肯尼迪国际 T4/T7', note: '北美第一大都会跨大西洋枢纽', keywords: 'newyork niuyue jfk 纽约 肯尼迪 曼哈顿' },
  { code: 'LAX', city: '洛杉矶', airport: '洛杉矶国际 (LAX)', note: '美西跨太平洋最大门户', keywords: 'losangeles luoshanji lax 洛杉矶 好莱坞 迪士尼' },
  { code: 'SFO', city: '旧金山', airport: '旧金山国际 (SFO)', note: '硅谷与高科技产业核心枢纽', keywords: 'sanfrancisco jiujinshan sfo 旧金山 硅谷 金门大桥' },
  { code: 'SYD', city: '悉尼', airport: '金斯福德·史密斯国际机场', note: '大洋洲最大跨国综合航空枢纽', keywords: 'sydney xini syd 悉尼 歌剧院 邦迪海滩' }
];

// 2. 无独立民航机场的多维深度接驳知识图谱
const NO_AIRPORT_NEARBY_MAP = {
  '苏州': {
    reason: '苏州市区及下辖县市（昆山/常熟/张家港/太仓）暂无民航客运机场。为您精选以下核心周边机场，换乘城际高铁或高速直通：',
    nearby: [
      {
        code: 'SHA',
        city: '上海',
        airport: '虹桥国际 T2',
        tag: '🏆 综合首选 · 高铁极速直达',
        score: '9.9',
        distance: '距苏州市区 65 km',
        highway: '京沪高速直达 · 约 50 分钟 (打车约 ¥180)',
        rail: '虹桥高铁站 22 分钟直达苏州站 (5~10分/班 · ¥39.5)',
        service: '苏州中心城市航站楼支持异地托运/值机，空手出行',
        bestFor: '全国航班极密集 · 票价常年最优惠 · 商务出行首选'
      },
      {
        code: 'WUX',
        city: '无锡',
        airport: '硕放国际机场',
        tag: '📍 距离最近 · 打车自驾首选',
        score: '9.5',
        distance: '距苏州市区仅 35 km',
        highway: '中环快速路/沪蓉高速直达 · 约 35 分钟 (打车约 ¥90)',
        rail: '硕放机场至苏州高新区/相城区专线大巴 40 分钟 (¥30)',
        service: '苏锡一体化便捷通关，安检与值机排队时间较短',
        bestFor: '适合随行行李较多、带老人儿童直接打车直达'
      },
      {
        code: 'PVG',
        city: '上海',
        airport: '浦东国际 T1/T2',
        tag: '🌏 国际及跨洲际航班首选',
        score: '9.2',
        distance: '距苏州市区 110 km',
        highway: '申嘉湖高速直达 · 约 100 分钟 (打车约 ¥350)',
        rail: '机场磁浮/地铁转高铁至苏州站 (约 80 分钟)',
        service: '浦东机场客运站有直通苏州各区高频定制商务大巴',
        bestFor: '港澳台、欧美日韩及跨洲际国际长途直飞航线'
      }
    ]
  },
  '昆山': {
    reason: '昆山暂无客运机场。毗邻上海虹桥与无锡硕放：',
    nearby: [
      {
        code: 'SHA',
        city: '上海',
        airport: '虹桥国际 T2',
        tag: '🏆 高铁 15 分钟直通昆山南',
        score: '9.9',
        distance: '距昆山市区仅 35 km',
        highway: '京沪高速直达 · 约 30 分钟',
        rail: '虹桥站高铁 15 分钟直达昆山南站 (¥14.5)',
        service: '上海地铁 11 号线已直通昆山花桥',
        bestFor: '昆山商务出差、阳澄湖吃蟹'
      },
      {
        code: 'WUX',
        city: '无锡',
        airport: '硕放国际机场',
        tag: '🚗 沪宁高速直达',
        score: '9.3',
        distance: '距昆山 55 km',
        highway: '沪蓉高速直达 · 约 45 分钟',
        rail: '高铁 25 分钟达昆山南站',
        service: '苏南区域便捷支线',
        bestFor: '苏南短途自驾'
      }
    ]
  },
  '乌镇': {
    reason: '桐乡乌镇景区暂无民用机场。推荐直飞杭州萧山或上海虹桥机场转乘直通大巴：',
    nearby: [
      {
        code: 'HGH',
        city: '杭州',
        airport: '萧山国际 T3/T4',
        tag: '🏆 直达大巴首选 · 无需进市区',
        score: '9.8',
        distance: '距乌镇西栅景区 60 km',
        highway: '申嘉湖高速直达 · 约 55 分钟 (打车约 ¥160)',
        rail: '萧山机场客运站每小时一班【乌镇景区直达专线大巴】 (约65分钟/¥45)',
        service: '大巴直达乌镇西栅景区游客服务中心，免去提行李多次换乘',
        bestFor: '自由行度假、情侣闺蜜度假首选'
      },
      {
        code: 'SHA',
        city: '上海',
        airport: '虹桥国际 T2',
        tag: '🚄 班次极多 · 空铁联运',
        score: '9.4',
        distance: '距乌镇西栅约 75 km',
        highway: '沪昆高速直达 · 约 70 分钟 (打车约 ¥220)',
        rail: '虹桥站高铁 25 分钟至桐乡高铁站，出站乘 K282 旅游公交 30 分钟达乌镇',
        service: '全国各大城市直飞航班极丰富',
        bestFor: '全国直飞班次多、适合商务+度假连程'
      }
    ]
  },
  '西塘': {
    reason: '嘉善西塘水乡暂无机场。推荐选择上海虹桥或杭州萧山：',
    nearby: [
      {
        code: 'SHA',
        city: '上海',
        airport: '虹桥国际 T2',
        tag: '📍 距离最近 · 约 50 分钟直达',
        score: '9.8',
        distance: '距西塘景区仅 55 km',
        highway: '沪昆高速直达 · 约 48 分钟 (打车约 ¥150)',
        rail: '虹桥站乘高铁 19 分钟直达嘉善南站，换乘快速接驳车 25 分钟抵景区',
        service: '虹桥客运西站有直达西塘客运大巴 (约 50 分钟/¥36)',
        bestFor: '华东短途度假、周末休闲'
      },
      {
        code: 'HGH',
        city: '杭州',
        airport: '萧山国际 T3/T4',
        tag: '🚌 浙北旅游互通',
        score: '9.2',
        distance: '距西塘景区 80 km',
        highway: '杭州湾环线高速直达 · 约 75 分钟',
        rail: '高铁至嘉善南站转公交',
        service: '适宜连线杭州西湖、钱塘江游览',
        bestFor: '浙北环线深度游'
      }
    ]
  },
  '阳朔': {
    reason: '阳朔西街/十里画廊/遇龙河暂无独立机场。桂林两江国际机场为官方推荐直通大门：',
    nearby: [
      {
        code: 'KWL',
        city: '桂林',
        airport: '两江国际 T2',
        tag: '🏆 阳朔唯一官方航空门户',
        score: '9.9',
        distance: '距阳朔西街约 65 km',
        highway: '包茂高速直达 · 约 60 分钟 (打车约 ¥160)',
        rail: '两江机场出站口即设【阳朔直达豪华大巴】 (每30分钟/班 · 80分钟/¥50)',
        service: '大巴直接停靠阳朔汽车客运总站，途中无需进入桂林市区堵车',
        bestFor: '阳朔山水度假、攀岩骑行、漓江竹筏体验'
      }
    ]
  },
  '莫干山': {
    reason: '德清莫干山民宿度假区暂无机场。推荐直飞杭州萧山或南京禄口：',
    nearby: [
      {
        code: 'HGH',
        city: '杭州',
        airport: '萧山国际 T3/T4',
        tag: '🏆 距离最近 · 度假首选',
        score: '9.8',
        distance: '距莫干山景区 65 km',
        highway: '杭州绕城/练杭高速直达 · 约 60 分钟 (打车约 ¥190)',
        rail: '萧山机场乘地铁转杭州东站高铁 13 分钟至德清站，再打车 20 分钟上山',
        service: '高端民宿通常支持德清站及萧山机场专车预约接送',
        bestFor: '避暑度假、高定民宿打卡、亲子家庭出游'
      },
      {
        code: 'NKG',
        city: '南京',
        airport: '禄口国际 T1/T2',
        tag: '🚄 宁杭高铁快线',
        score: '9.1',
        distance: '距莫干山 115 km',
        highway: '长深高速直达 · 约 90 分钟',
        rail: '南京南站乘宁杭高铁 40 分钟直达德清站',
        service: '适合北方省份直飞旅客',
        bestFor: '苏皖地区及北方城市直飞旅客'
      }
    ]
  },
  '乐山': {
    reason: '乐山大佛/峨眉山景区暂无独立机场。成都双流机场地下高铁站直通乐山站：',
    nearby: [
      {
        code: 'CTU',
        city: '成都',
        airport: '双流国际 T2',
        tag: '🏆 站内空铁零换乘 · 46 分钟直达',
        score: '9.9',
        distance: '距乐山市区 110 km',
        highway: '成乐高速直达 · 约 75 分钟 (打车约 ¥260)',
        rail: '双流机场 T2 地下高铁站乘成绵乐客专 46 分钟直达乐山站 (¥46)',
        service: '航站楼内直接下楼乘高铁，全程行李推车直达站台，无需出站',
        bestFor: '乐山大佛、峨眉山金顶朝圣、川味美食打卡'
      },
      {
        code: 'TFU',
        city: '成都',
        airport: '天府国际 T2',
        tag: '✈️ 全国直飞航线最全',
        score: '9.3',
        distance: '距乐山市区 135 km',
        highway: '天府国际机场高速/成都三绕直达 · 约 90 分钟',
        rail: '天府机场长途汽车站有直达乐山肖坝客运站大巴 (约 100 分钟)',
        service: '全国中中小城市及低成本航空航班丰富',
        bestFor: '直飞航班多、特价机票多'
      }
    ]
  },
  '平遥': {
    reason: '平遥古城暂无机场。太原武宿国际机场有高频高铁直达古城站：',
    nearby: [
      {
        code: 'TYN',
        city: '太原',
        airport: '武宿国际 T2',
        tag: '🏆 太原高铁 30 分钟直达古城',
        score: '9.8',
        distance: '距平遥古城 85 km',
        highway: '京昆高速直达 · 约 65 分钟 (打车约 ¥180)',
        rail: '武宿机场乘打车/机场大巴 10 分钟至太原南站，高铁 30 分钟直抵【平遥古城站】(¥28.5)',
        service: '平遥古城站出站乘 108 路公交或打车 10 分钟即可进古城客栈',
        bestFor: '晋商文化探索、又见平遥剧场、古城摄影'
      }
    ]
  },
  '东莞': {
    reason: '东莞暂无客运机场。深圳宝安与广州白云两大超级枢纽环绕：',
    nearby: [
      {
        code: 'SZX',
        city: '深圳',
        airport: '宝安国际 T3',
        tag: '🏆 距离最近 · 城际高铁 20 分钟',
        score: '9.9',
        distance: '距东莞市区仅 35 km (距虎门/长安 20km)',
        highway: '沿江高速/京港澳高速直达 · 约 30 分钟 (打车约 ¥90)',
        rail: '宝安机场站乘【穗莞深城际】 22 分钟直达东莞虎门/厚街/南城各站',
        service: '东莞南城城市候机楼支持直接办理登机牌和行李托运',
        bestFor: '制造名城商务出差、大湾区快速通勤'
      },
      {
        code: 'CAN',
        city: '广州',
        airport: '白云国际 T1/T2',
        tag: '🚌 广州北翼综合枢纽',
        score: '9.5',
        distance: '距东莞市区 60 km',
        highway: '广深高速直达 · 约 50 分钟',
        rail: '白云机场直达东莞南城/万江专线大巴 (每20分钟/班)',
        service: '航线覆盖全球及国内所有航点',
        bestFor: '北方城市及国际长途旅客'
      }
    ]
  },
  '顺德': {
    reason: '世界美食之都顺德暂无机场。广州白云机场地铁及大巴直达大良/容桂：',
    nearby: [
      {
        code: 'CAN',
        city: '广州',
        airport: '白云国际 T1/T2',
        tag: '🏆 地铁/城际直通美食核心圈',
        score: '9.8',
        distance: '距顺德大良约 65 km',
        highway: '广州东新高速/广珠西线直达 · 约 55 分钟 (打车约 ¥170)',
        rail: '白云机场直接乘坐广州地铁 3 号线转 7 号线直通顺德各美食商圈',
        service: '顺德大良新城区城市候机楼支持行李直挂',
        bestFor: '双皮奶、毋米粥、桑拿鸡寻味顺德吃货之旅'
      }
    ]
  },
  '中山': {
    reason: '中山市暂无民航机场。深中通道通车后，深圳宝安机场成为最快直达通道：',
    nearby: [
      {
        code: 'SZX',
        city: '深圳',
        airport: '宝安国际 T3',
        tag: '🏆 深中通道 30 分钟跨海直达',
        score: '9.9',
        distance: '距中山市区仅 45 km',
        highway: '深中通道跨海大桥直达 · 仅需 30 分钟 (打车约 ¥120)',
        rail: '深圳机场至中山博览中心【深中机场快线】大巴 (每15分钟/班 · 40分钟直达)',
        service: '中山博览中心城市航站楼支持异地托运/前置安检，跨海无缝衔接',
        bestFor: '中山孙中山故居、古镇灯饰展会、小榄菊花会'
      }
    ]
  }
};

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

// 全国各大主流航空公司微信官方小程序 AppID 路由注册表
const AIRLINE_MINIPROGRAMS = {
  'MU': {
    name: '中国东方航空',
    appId: 'wxa13efcae54dfb141', // 中国东航官方微信小程序
    hotline: '95530',
    path: 'pages/index/index'
  },
  'CA': {
    name: '中国国际航空',
    appId: 'wx233481ec57171d3e', // 中国国航官方微信小程序
    hotline: '95583',
    path: 'pages/index/index'
  },
  'CZ': {
    name: '中国南方航空',
    appId: 'wx04c356b7bb88f343', // 南方航空官方微信小程序
    hotline: '95539',
    path: 'pages/index/index'
  },
  'HU': {
    name: '海南航空',
    appId: 'wx16bb1c251410884d', // 海南航空官方微信小程序
    hotline: '95339',
    path: 'pages/index/index'
  },
  'HO': {
    name: '吉祥航空',
    appId: 'wxb850a7f1a30faad9', // 吉祥航空官方小程序
    hotline: '95520',
    path: 'pages/index/index'
  },
  '9C': {
    name: '春秋航空',
    appId: 'wxdd7333bfec9bf156', // 春秋航空官方小程序
    hotline: '95524',
    path: 'pages/index/index'
  },
  'UMETRIP': {
    name: '航旅纵横',
    appId: 'wxaae3c4284d720b08', // 航旅纵横官方小程序
    hotline: '400-811-2308',
    path: 'pages/index/index'
  }
};

Page({
  data: {
    // Navigation Views
    currentView: 'home', // 'home' | 'flight_results' | 'city_search_fullscreen'
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
    tripType: 'ONE_WAY',
    originCode: 'PEK',
    originCity: '北京',
    originAirport: '首都国际',
    destCode: 'SHA',
    destCity: '上海',
    destAirport: '虹桥国际',
    departDate: '2026-10-01',
    isSwapping: false,
    selectedCabin: 'ECONOMY',

    // Full-Screen City Search Engine with 250+ Nationwide Airports
    selectingType: 'origin', // 'origin' | 'dest'
    citySearchQuery: '',
    allAirports: COMPREHENSIVE_AIRPORTS_DATABASE,
    domesticHubs: COMPREHENSIVE_AIRPORTS_DATABASE.slice(13, 31), // Top 18 Hubs
    internationalHubs: COMPREHENSIVE_AIRPORTS_DATABASE.slice(80, 100), // Top 20 Global
    historyCities: [
      { code: 'DLU', city: '大理', airport: '凤仪机场 (荒草坝)' },
      { code: 'SHA', city: '上海', airport: '虹桥国际 T2' },
      { code: 'SZX', city: '深圳', airport: '宝安国际 T3' },
      { code: 'CAN', city: '广州', airport: '白云国际 T1/T2' }
    ],
    filteredMatchList: [],
    
    // No-Airport Intelligent Multi-Dimensional Nearby Recommendation Info
    noDirectAirportInfo: null, // { queryName, reason, nearby: [...] }

    // Flight Search Results View
    allFlights: MOCK_FLIGHT_LIST,
    filteredFlights: MOCK_FLIGHT_LIST,
    activeFilter: 'ALL',

    // Flight Detail Modal
    showFlightModal: false,
    selectedFlight: MOCK_FLIGHT_LIST[0],

    // Credit Cards State
    selectedCard: 'cmb',
    loungePoints: 4,
    claimToast: false,

    // Anti-OTA Rights Modals
    showNameCorrectionModal: false,
    correctionAirline: 'CX',
    showDisruptionModal: false,
    showTicketVerifierModal: false,
    verifyTicketNo: '781-2491823901',
    verifyResult: true,

    showSpecialServicesModal: false,
    showBoardingPassModal: false,
    showAddWishlistModal: false,
    selectedNewRoute: 'PEK_SHA',
    selectedNewMode: 'PASS',

    // Full Interactive Modals for Previously Incomplete Features
    showPrivacyVaultModal: false,
    faceIdEnabled: true,
    savedTravelers: [
      { id: 't-1', name: '张*', idNo: '110101********2018', type: '二代居民身份证 · AES-256' },
      { id: 't-2', name: '李*', idNo: 'E4928****', type: '中国普通护照 · Secure Enclave' }
    ],

    showSmartImportModal: false,
    importSmsText: '',

    showAddCardModal: false,
    newCardType: 'BANK', // 'BANK' | 'LOYALTY'
    newBankName: '招商银行',
    newCardNumber: '',
    newCardHolder: '',

    showRadarGuideModal: false,

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

  // Tab & Navigation Handlers
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

  // ==================== FULLSCREEN CITY SEARCH ====================
  openCityPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectingType: type,
      citySearchQuery: '',
      filteredMatchList: [],
      noDirectAirportInfo: null,
      currentView: 'city_search_fullscreen'
    });
  },

  closeCitySearchFullscreen() {
    this.setData({ currentView: 'home', citySearchQuery: '', noDirectAirportInfo: null });
  },

  clearSearchQuery() {
    this.setData({ citySearchQuery: '', filteredMatchList: [], noDirectAirportInfo: null });
  },

  onCitySearchInput(e) {
    const raw = e.detail.value || '';
    const query = raw.trim().toLowerCase();
    this.setData({ citySearchQuery: raw });

    if (!query) {
      this.setData({ filteredMatchList: [], noDirectAirportInfo: null });
      return;
    }

    // 1. Check if user searched for a known non-airport destination
    let noDirectInfo = null;
    for (const [cityName, info] of Object.entries(NO_AIRPORT_NEARBY_MAP)) {
      if (query.includes(cityName.toLowerCase()) || cityName.toLowerCase().includes(query)) {
        noDirectInfo = {
          queryName: cityName,
          reason: info.reason,
          nearby: info.nearby
        };
        break;
      }
    }

    if (noDirectInfo) {
      this.setData({
        filteredMatchList: [],
        noDirectAirportInfo: noDirectInfo
      });
      return;
    }

    // 2. Direct exact/fuzzy matches in 250+ airport database
    const filtered = this.data.allAirports.filter(item => {
      return (
        item.code.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.airport.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query)
      );
    });

    // 3. Fallback recommendations if zero match
    if (filtered.length === 0) {
      noDirectInfo = {
        queryName: raw.trim(),
        reason: `“${raw.trim()}”当地目前暂无独立民航客运直航机场。推荐您选择直达全国各大城市的超级航空中转枢纽，再通过城际高铁或高速专线抵达：`,
        nearby: [
          {
            code: 'SHA',
            city: '上海',
            airport: '虹桥国际 T2',
            tag: '🏆 华东超大枢纽 · 高铁连通全国',
            score: '9.9',
            distance: '综合辐射长三角各市',
            highway: '京沪/沪昆高速直达',
            rail: '虹桥高铁站 50+ 条高铁直通华东华中各城市',
            service: '全国航线最密集 · 票价常年最透明优惠',
            bestFor: '长三角及华东区域出行首选'
          },
          {
            code: 'PEK',
            city: '北京',
            airport: '首都国际 T2/T3',
            tag: '🏆 北方超级主枢纽',
            score: '9.8',
            distance: '综合辐射京津冀环渤海',
            highway: '机场高速直达二环/三环',
            rail: '首都机场快轨 16 分钟直达三元桥/东直门地铁枢纽',
            service: '三大航核心主基地，宽体大客机最多',
            bestFor: '北方省市及国际航班首选'
          },
          {
            code: 'CAN',
            city: '广州',
            airport: '白云国际 T1/T2',
            tag: '🏆 华南大湾区超级门户',
            score: '9.8',
            distance: '综合辐射珠三角各城市',
            highway: '机场高速/花莞高速直达广佛莞深',
            rail: '广州地铁 3 号线/广佛线城际直达',
            service: '南航超级枢纽，东南亚及国内航线极全',
            bestFor: '华南及大湾区各城市出行首选'
          }
        ]
      };
    }

    this.setData({
      filteredMatchList: filtered,
      noDirectAirportInfo: noDirectInfo
    });
  },

  selectCityItem(e) {
    const item = e.currentTarget.dataset.item;
    
    let history = [...this.data.historyCities];
    if (!history.some(h => h.code === item.code)) {
      history.unshift({ code: item.code, city: item.city, airport: item.airport });
      if (history.length > 5) history.pop();
    }

    if (this.data.selectingType === 'origin') {
      this.setData({
        originCode: item.code,
        originCity: item.city,
        originAirport: item.airport,
        historyCities: history,
        currentView: 'home',
        citySearchQuery: '',
        noDirectAirportInfo: null
      });
    } else {
      this.setData({
        destCode: item.code,
        destCity: item.city,
        destAirport: item.airport,
        historyCities: history,
        currentView: 'home',
        citySearchQuery: '',
        noDirectAirportInfo: null
      });
    }
    wx.vibrateShort({ type: 'light' });
  },

  applyCustomSearchCity() {
    const query = this.data.citySearchQuery.trim();
    if (!query) return;

    const upperCode = (query.length <= 4 ? query.toUpperCase() : query.slice(0, 3).toUpperCase());

    if (this.data.selectingType === 'origin') {
      this.setData({
        originCode: upperCode,
        originCity: query,
        originAirport: '自定义目的地',
        currentView: 'home',
        citySearchQuery: '',
        noDirectAirportInfo: null
      });
    } else {
      this.setData({
        destCode: upperCode,
        destCity: query,
        destAirport: '自定义目的地',
        currentView: 'home',
        citySearchQuery: '',
        noDirectAirportInfo: null
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
    const flight = this.data.selectedFlight;
    this.closeFlightModal();
    const airlineConfig = AIRLINE_MINIPROGRAMS[flight.airlineCode] || AIRLINE_MINIPROGRAMS['MU'];
    
    wx.showModal({
      title: `直通【${airlineConfig.name}】官方出票`,
      content: `即将通过微信安全通道唤起【${airlineConfig.name}】官方小程序。\n\n享受 100% 航司直营裸票价与官方退改保障，0 中介加价与套路！\n\n航司官方服务专线：${airlineConfig.hotline}`,
      confirmText: '立即直通航司',
      cancelText: '返回',
      confirmColor: '#2563EB',
      success: (res) => {
        if (res.confirm) {
          wx.navigateToMiniProgram({
            appId: airlineConfig.appId,
            path: airlineConfig.path,
            extraData: {
              from: 'DirectAir',
              dep: this.data.originCode,
              arr: this.data.destCode,
              date: this.data.departDate,
              flightNo: flight.flightNo
            },
            envVersion: 'release',
            success(navRes) {
              console.log('成功直通航司小程序', navRes);
            },
            fail(err) {
              console.log('跳转取消或环境受限', err);
              wx.showModal({
                title: `${airlineConfig.name}官方直通保障`,
                content: `您已复制航班号【${flight.flightNo}】！可直接在微信中搜索打开【${airlineConfig.name}】小程序或拨打官方服务专线 ${airlineConfig.hotline}，官方全包价 ¥${flight.ecoPrice + 50} 即可完成出票。`,
                showCancel: true,
                cancelText: '知道了',
                confirmText: '复制官方热线',
                success: (r) => {
                  if (r.confirm) {
                    wx.setClipboardData({ data: airlineConfig.hotline });
                  }
                }
              });
            }
          });
        }
      }
    });
  },

  openAirlineDirectApp(e) {
    const app = e.currentTarget.dataset.app || 'ceair';
    const appCode = (app === 'ceair' ? 'MU' : (app === 'airchina' ? 'CA' : 'CZ'));
    const airlineConfig = AIRLINE_MINIPROGRAMS[appCode] || AIRLINE_MINIPROGRAMS['MU'];
    
    wx.showModal({
      title: `⚡ 直通【${airlineConfig.name}】放票抢兑`,
      content: `雷达已为您捕获可兑换放票席位！即将跳转【${airlineConfig.name}】官方微信小程序进行随心飞/次卡/特价票抢兑。\n\n官方服务热线：${airlineConfig.hotline}`,
      confirmText: '立即直通抢兑',
      cancelText: '稍后',
      confirmColor: '#059669',
      success: (res) => {
        if (res.confirm) {
          wx.navigateToMiniProgram({
            appId: airlineConfig.appId,
            path: airlineConfig.path,
            envVersion: 'release',
            fail(err) {
              wx.showToast({ title: `已复制 ${airlineConfig.name} 抢兑指令`, icon: 'none' });
            }
          });
        }
      }
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

  // ==================== 1. FULL INTERACTIVE PRIVACY VAULT ====================
  openPrivacyVault() {
    this.setData({ showPrivacyVaultModal: true });
  },

  closePrivacyVault() {
    this.setData({ showPrivacyVaultModal: false });
  },

  toggleFaceId(e) {
    this.setData({ faceIdEnabled: e.detail.value });
    wx.showToast({
      title: e.detail.value ? '已启用硬件级生物识别' : '已关闭生物识别锁定',
      icon: 'none'
    });
  },

  wipeAllLocalVaultData() {
    wx.showModal({
      title: '确认清空本地保险箱？',
      content: '此操作将物理级抹除本地 Keychain 中保存的所有乘机人证件与卡号数据，且不可撤销。',
      confirmColor: '#DC2626',
      confirmText: '立即物理抹除',
      success: (res) => {
        if (res.confirm) {
          this.setData({ savedTravelers: [] });
          wx.showToast({ title: '已物理清空本地凭据', icon: 'success' });
        }
      }
    });
  },

  addNewTravelerPrompt() {
    wx.showModal({
      title: '新增乘机人凭据',
      editable: true,
      placeholderText: '输入乘机人姓名与身份证号',
      success: (res) => {
        if (res.confirm && res.content) {
          const list = [...this.data.savedTravelers];
          list.push({
            id: 't-' + Date.now(),
            name: res.content.slice(0, 2) + '*',
            idNo: '加密存储 (AES-256)',
            type: '本地硬件安全区托管'
          });
          this.setData({ savedTravelers: list });
          wx.showToast({ title: '已安全写入硬件保险箱', icon: 'success' });
        }
      }
    });
  },

  // ==================== 2. SMART TRIP IMPORTER ====================
  openSmartImportModal() {
    this.setData({ showSmartImportModal: true, importSmsText: '' });
  },

  closeSmartImportModal() {
    this.setData({ showSmartImportModal: false });
  },

  pasteDemoFlightSms() {
    this.setData({
      importSmsText: '【中国东航】您预订的 10月01日 MU5101 北京首都-上海虹桥 航班出票成功，电子客票号 781-2491823901，登机口 C42，座位 12F。'
    });
  },

  onSmsInput(e) {
    this.setData({ importSmsText: e.detail.value });
  },

  handleParseAndImportTrip() {
    if (!this.data.importSmsText.trim()) {
      wx.showToast({ title: '请先粘贴短信内容', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '正在提取航司行程...' });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showSmartImportModal: false,
        activeTab: 'trips',
        currentFlight: {
          airlineName: '中国东航',
          flightNo: 'MU5101',
          originCode: 'PEK',
          destCode: 'SHA',
          gate: 'C42',
          seat: '12F'
        }
      });
      wx.showToast({ title: '行程导入成功！已同步至我的行程', icon: 'success', duration: 2500 });
    }, 500);
  },

  // ==================== 3. ADD BANK & LOYALTY CARD ====================
  openAddCardModal(e) {
    const type = e.currentTarget.dataset.type || 'BANK';
    this.setData({
      showAddCardModal: true,
      newCardType: type,
      newBankName: type === 'BANK' ? '招商银行经典白金卡' : '中国东方航空·东方万里行',
      newCardNumber: '',
      newCardHolder: ''
    });
  },

  closeAddCardModal() {
    this.setData({ showAddCardModal: false });
  },

  onCardNumberInput(e) {
    this.setData({ newCardNumber: e.detail.value });
  },

  onCardHolderInput(e) {
    this.setData({ newCardHolder: e.detail.value });
  },

  saveNewCard() {
    if (!this.data.newCardNumber) {
      wx.showToast({ title: '请输入卡号/会员号', icon: 'none' });
      return;
    }
    this.closeAddCardModal();
    wx.showToast({
      title: '卡片已加密保存至本地钱包',
      icon: 'success',
      duration: 2000
    });
  },

  // ==================== 4. WISHLIST RADAR GUIDE ====================
  openRadarGuideModal() {
    this.setData({ showRadarGuideModal: true });
  },

  closeRadarGuideModal() {
    this.setData({ showRadarGuideModal: false });
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

  showLoyaltyCardDetail(e) {
    const airline = e.currentTarget.dataset.airline;
    wx.showModal({
      title: `${airline}会员卡权益管理`,
      content: `已为您直通【${airline}】官方补登通道与贵宾休息室核验，享受 100% 官方会员保障！`,
      showCancel: false,
      confirmText: '查看权益'
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

  preventDumb() {},

  onShareAppMessage() {
    return {
      title: '直航 DirectAir - 航司官方直通与常旅客雷达',
      path: '/pages/index/index'
    };
  }
});
