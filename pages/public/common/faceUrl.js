const faceUrl = {
  // path:  'http://47.103.11.36:3000',
  //  path:'http://127.0.0.1:8080',
  path:'http://114.116.244.32:8080',
  // path: 'http://erbazi.xyz:8080',
  login:'/lr/loginTel',//手机号码登录
  getCode: '/code/get',//获取验证码
  positionDetail:'/data/getJobsDetail',//获取职位详情
  positionSearch:"/data/getJobsAll",//搜索职位
  tips:'/data/getTipsAll',//曝光度排行
  register: '/lr/register',//手机号码注册
  getwxid: '/lr/getWxId',//获取微信openid
  collectionJobs: '/upload/collectionJobs',//收藏职位
  uploadResume: '/upload/setResume',//上传简历
  getResume: '/data/getResume',//获取简历
  deliveryResume: '/upload/deliveryResume',//简历投递
  recruiterGetResume: '/data/recruiterGetResume',//招聘者查看投递简历
  delivererGetResume: '/data/delivererGetResume'
}

module.exports = faceUrl;