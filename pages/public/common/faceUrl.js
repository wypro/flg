const faceUrl = {
  // path:  'http://47.103.11.36:3000',
   path: 'http://127.0.0.1:8081',//请求本地
  // path: 'http://114.116.244.32:8080',
  // path: 'http://www.erbazi.xyz:8081', //请求服务器
  login: '/lr/loginTel',//手机号码登录
  getCode: '/code/get',//获取验证码
  positionDetail: '/data/getJobsDetail',//获取职位详情
  positionSearch: '/data/getJobsAll',//搜索职位
  tips: '/data/getTipsAll',//曝光度排行
  register: '/lr/register',//手机号码注册
  getwxid: '/lr/getWxId',//获取微信openid
  collectionJobs: '/upload/collectionJobs',//收藏职位
  uploadResume: '/upload/setResume',//上传简历
  uploadimages: '/upload/fileUpload', //上传图片
  getResume: '/data/getResume',//获取简历
  deliveryResume: '/upload/deliveryResume',//简历投递
  isDelivery: '/data/isDelivery',//判断当前职位是否投递
  recruiterGetResume: '/data/recruiterGetResume',//招聘者查看投递简历
  delivererGetResume: '/data/delivererGetResume',//投递者查看投递简历
  getCollectionJobs: '/data/getCollectionJobs',//获取收藏职位
  feedback: '/upload/feedback', //意见反馈
  setCompanyInfo: '/upload/setCompanyInfo', //上传公司信息
  getCompanyInfo: '/data/getCompanyInfo', //获取公司信息
}

module.exports = faceUrl;