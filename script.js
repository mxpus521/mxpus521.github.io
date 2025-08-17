// iOS风格的交互效果实现

// 底部导航切换
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const cards = document.querySelectorAll('.card');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有激活状态
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 简单的页面切换效果（实际应用中可以更复杂）
            const index = Array.from(navItems).indexOf(this);
            console.log(`切换到页面 ${index + 1}`);
        });
    });
    
    // 为所有可点击元素添加触摸反馈
    const clickableElements = document.querySelectorAll('.card, .skill-item, .project-item, .contact-item, .nav-item');
    
    clickableElements.forEach(element => {
        // 触摸开始时添加效果
        element.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        });
        
        // 触摸结束时移除效果
        element.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
        
        // 触摸取消时移除效果
        element.addEventListener('touchcancel', function(e) {
            this.classList.remove('touch-active');
        });
    });
    
    // 平滑滚动到顶部
    const navTitle = document.querySelector('.nav-title');
    if (navTitle) {
        navTitle.addEventListener('click', function() {
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                contentArea.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 联系方式链接的处理
    const contactLinks = document.querySelectorAll('.contact-item');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('mailto:')) {
                // 模拟邮件应用打开
                console.log('打开邮件应用');
            } else if (href && href.startsWith('https://')) {
                // 外部链接处理
                console.log('打开外部链接');
            }
        });
    });
});

// 防止页面过度滚动的iOS效果
document.addEventListener('touchmove', function(e) {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        const scrollTop = contentArea.scrollTop;
        const scrollHeight = contentArea.scrollHeight;
        const clientHeight = contentArea.clientHeight;
        
        // 防止顶部过度滚动
        if (scrollTop <= 0 && e.touches[0].clientY > 50) {
            e.preventDefault();
        }
        
        // 防止底部过度滚动
        if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < window.innerHeight - 50) {
            e.preventDefault();
        }
    }
}, { passive: false });

// 动态更新状态栏时间
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.querySelector('.time');
    
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 每分钟更新一次时间
setInterval(updateTime, 60000);
updateTime(); // 初始化时间

// 页面可见性变化时更新时间
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateTime();
    }
});

// 模拟iOS的"轻点反馈"效果
function addHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(10); // 短暂震动
    }
}

// 为重要交互添加触觉反馈
document.querySelectorAll('.nav-item, .contact-item').forEach(item => {
    item.addEventListener('click', addHapticFeedback);
});

// 模拟iOS的页面切换动画
function simulatePageTransition() {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.style.opacity = '0.8';
        contentArea.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentArea.style.opacity = '1';
            contentArea.style.transform = 'translateY(0)';
        }, 150);
    }
}

// 监听页面切换
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', simulatePageTransition);
});