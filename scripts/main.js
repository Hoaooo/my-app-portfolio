 // 打开应用详情
function openApp(appId) {
  // 隐藏所有应用详情
  const details = document.querySelectorAll('.app-detail');
  details.forEach(detail => {
    detail.classList.remove('active');
    });

  // 显示选中的应用详情
  document.getElementById(`${appId}-detail`).classList.add('active');
  // 滚动到详情区域
  document.getElementById(`${appId}-detail`).scrollIntoView({ behavior: 'smooth' });
}
// 关闭应用详情
function closeApp() {
  const details = document.querySelectorAll('.app-detail');
  details.forEach(detail => {
    detail.classList.remove('active');
  });
}
        
 // 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
