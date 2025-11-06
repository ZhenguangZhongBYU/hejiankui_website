// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== 移动端导航菜单切换 =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // 动画效果
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 点击菜单项后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 滚动动画观察器 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.research-card, .people-card, .position-card, .support-card, .principle-card, .publication-card, .interview-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== 模态框功能 =====
const modal = document.getElementById('linkModal');
const modalLink = document.getElementById('modalLink');
const modalClose = document.querySelector('.modal-close');

// 打开模态框
function openModal(link) {
    modal.classList.add('show');
    modalLink.href = link;
    modalLink.textContent = '打开链接';
    
    // 添加淡入动画
    setTimeout(() => {
        modalLink.textContent = '在新标签页中打开';
    }, 500);
}

// 关闭模态框
function closeModal() {
    modal.classList.remove('show');
}

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// ===== 采访图片点击事件 - 直接打开链接 =====
const interviewItems = document.querySelectorAll('.interview-item');
interviewItems.forEach(item => {
    item.addEventListener('click', () => {
        const link = item.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
    
    // 添加键盘支持
    item.setAttribute('tabindex', '0');
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = item.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        }
    });
});

// ===== 论文图片点击事件 - 直接打开链接 =====
const publicationCards = document.querySelectorAll('.publication-card');
publicationCards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
    
    // 添加键盘支持
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        }
    });
});

// ===== 图片懒加载优化 =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== 鼠标粒子效果（可选增强） =====
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    let mouseX = 0;
    let mouseY = 0;
    let particles = document.querySelector('.particles');

    heroSection.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        if (particles) {
            particles.style.background = `
                radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(79, 172, 254, 0.1) 0%, transparent 50%)
            `;
        }
    });
}

// ===== 页面加载完成后的初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // 初始化所有动画元素
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 为所有卡片添加悬停效果增强
    const cards = document.querySelectorAll('.research-card, .people-card, .position-card, .support-card, .principle-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// ===== 滚动进度指示器（可选） =====
const scrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    // 可以在这里添加进度条显示
    // console.log(`Scroll progress: ${scrollPercent.toFixed(2)}%`);
};

window.addEventListener('scroll', scrollProgress);

// ===== 性能优化：防抖函数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScroll = debounce(() => {
    // 滚动相关的操作
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===== 错误处理 =====
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// ===== 图片加载错误处理 =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('图片加载失败:', this.src);
        // 可以设置一个默认占位图
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
    });
});

// ===== 控制台欢迎信息 =====
console.log('%c🧬 北京贺建奎实验室', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c一个相信科学可以温柔地改变命运的地方', 'font-size: 14px; color: #b8b8b8;');
console.log('Website: https://hejiankuilab.com');
console.log('Email: jiankuihe@gmail.com');

