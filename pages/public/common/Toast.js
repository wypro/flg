export function Toast(title,type,time){
  wx.showToast({
    title: title,
    icon: type == null ? 'none' : type,
    duration: time == null ? 1000 : time
  })
}

export function Loading(title){
  wx.showLoading({
    title: title,
  })
}