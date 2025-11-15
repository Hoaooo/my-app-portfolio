// 打开应用详情
// 从tools目录加载工具HTML
function openApp(appId) {
    // 清空并显示工具容器（需在index.html中新增一个容器）
    const detailContainer = document.getElementById('tool-detail-container');
    detailContainer.innerHTML = '';
    detailContainer.style.display = 'block';
    
    // 动态加载工具的HTML（比如加载tools/data-visualizer/index.html）
    fetch(`tools/${appId}/index.html`)
        .then(response => response.text())
        .then(html => {
            detailContainer.innerHTML = html;
            // 加载工具专属JS（比如data-visualizer.js）
            const script = document.createElement('script');
            script.src = `scripts/tools/${appId}.js`;
            detailContainer.appendChild(script);
        });
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
