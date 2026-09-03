// ============================================================
// 作品集配置与作品数据 —— 日常主要改这个文件
// 新增作品：把压缩包放进 works/ 文件夹，再在 WORKS 数组里加一条记录
// ============================================================

const PORTFOLIO_CONFIG = {
  title: "刘铭涛的作品集",
  subtitle: "机械结构设计与机器人研发作品",
  intro: "这里收录了我的机械结构设计、机器人建模与算法对接等作品，点击下载即可获取压缩包文件。",
  contact: "1043053416@qq.com"
};

const WORKS = [
  // 可选字段：
  //   fileUrl: "https://你的云存储地址/works/机器人3代.zip"
  //   大文件放云端后填这里，页面会优先用云端链接（新窗口打开下载）
  {
    title: "机器人第三代（M9）",
    date: "2026-08",
    tags: ["机器人", "第三代", "结构设计"],
    description: "机器人第三代项目文件包（M9 迭代版），含整机结构、装配体及配套文件。",
    file: "works/机器人3代 -m9.zip",
    fileUrl: "https://github.com/mito2504lmt/portfolio/releases/download/works-v1/robot-gen3-m9.zip",
    fileLabel: "机器人3代 -m9.zip",
    sizeMB: 187.8,
    thumb: ""
  },
  {
    title: "第三代外骨骼（交接版本）",
    date: "2026-08",
    tags: ["外骨骼", "机器人", "结构设计"],
    description: "第三代外骨骼机器人交接版本项目文件，含关节结构件、电机、驱动板及配套模型。",
    file: "works/第三代外骨骼交接版本.zip",
    fileUrl: "https://github.com/mito2504lmt/portfolio/releases/download/works-v1/exoskeleton-gen3.zip",
    fileLabel: "第三代外骨骼交接版本.zip",
    sizeMB: 76.4,
    thumb: ""
  },
  {
    title: "手持测绘仪结构模块（Mechanical）",
    date: "2026-08",
    tags: ["手持测绘仪", "三维激光扫描", "结构设计"],
    description: "手持测绘设备结构模块项目文件，含外壳与支架三维模型、需求书、设计变更文档及 BOM 目录。",
    file: "works/Mechanical.zip",
    fileUrl: "https://github.com/mito2504lmt/portfolio/releases/download/works-v1/Mechanical.zip",
    fileLabel: "Mechanical.zip",
    sizeMB: 149.0,
    thumb: ""
  },
  {
    title: "摆线减速器 3D 打印源文件",
    date: "2026-08",
    tags: ["摆线减速器", "3D打印", "结构设计"],
    description: "摆线减速器 3D 打印源文件包，含外壳套件、中心轴、轴承及装配体模型。",
    file: "works/摆线减速器3D打印源文件.zip",
    fileUrl: "https://github.com/mito2504lmt/portfolio/releases/download/works-v1/cycloid-reducer-3dprint.zip",
    fileLabel: "摆线减速器3D打印源文件.zip",
    sizeMB: 8.0,
    thumb: ""
  },
  {
    title: "2026机械装配体",
    date: "2026-04",
    tags: ["机械创新设计大赛", "机械结构", "装配体"],
    description: "2026 年机械装配体项目文件包，含装配体及配套文件。",
    file: "works/2026机械装配体.zip",
    fileUrl: "https://github.com/mito2504lmt/portfolio/releases/download/works-v1/2026-mechanical-assembly.zip",
    fileLabel: "2026机械装配体.zip",
    sizeMB: 17.4,
    thumb: ""
  }
];
