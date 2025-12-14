window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// 新增：网页端适配 PakePlus 容器分辨率的逻辑
const adaptToContainer = () => {
    // 获取 WebView 可视区域尺寸（而非设备物理分辨率）
    const containerWidth = window.innerWidth
    const containerHeight = window.innerHeight
    
    // 示例1：根据容器宽度调整网页根节点字体大小（适配移动端rem）
    document.documentElement.style.fontSize = (containerWidth / 10) + 'px'
    
    // 示例2：强制网页适配容器尺寸，避免溢出
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflow = 'auto' // 内容超出时滚动
    
    // 示例3：针对不同分辨率容器做特殊样式适配
    if (containerWidth <= 750) {
        // 小屏适配（如iPhone SE）
        document.body.classList.add('mobile-small')
    } else if (containerWidth <= 1080) {
        // 中屏适配（主流安卓机）
        document.body.classList.add('mobile-normal')
    } else {
        // 平板适配
        document.body.classList.add('tablet')
    }
}

// 初始化适配 + 窗口尺寸变化时重新适配（若PakePlus支持窗口缩放）
adaptToContainer()
window.addEventListener('resize', adaptToContainer)