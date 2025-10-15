'use strict';
/* global hexo */

const crypto = require('crypto');
const log = hexo.log || console;

hexo.config.echarts = Object.assign({
    enable: true,
    js_url: 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js',
    id_generation: 'random' // 'random' for performance, 'hash' for consistency
}, hexo.config.echarts);

global.hexo = Object.assign(hexo, global.hexo);

if (hexo.config.echarts.enable) {
    
    // Inject ECharts script
    hexo.extend.filter.register('after_generate', function() {
        const route = hexo.route;
        const routeList = route.list();
        const routes = routeList.filter(hpath => hpath.endsWith('.html'));
        
        const htmls = {};
        return Promise.all(routes.map(hpath => {
            return new Promise((resolve) => {
                const contents = route.get(hpath);
                let htmlTxt = '';
                contents.on('data', (chunk) => (htmlTxt += chunk));
                contents.on('end', () => {
                    if (htmlTxt.includes('class="echarts"') && !htmlTxt.includes('echarts-scripts')) {
                        let scripts = `<script id="echarts-scripts" src="${hexo.config.echarts.js_url}"></script>`;
                        const newContent = htmlTxt.replace('</head>', `${scripts}</head>`);
                        htmls[hpath] = newContent;
                    }
                    resolve();
                });
            });
        }))
        .then(() => {
            const htmlPaths = Object.keys(htmls);
            for (const hpath of htmlPaths) {
                route.set(hpath, htmls[hpath]);
            }
        });
    });
    
    hexo.extend.tag.register('echarts', (arg, content) => {
        let chartId;
        if (hexo.config.echarts.id_generation === 'hash') {
            const hash = crypto.createHash('md5').update(content).digest('hex').substr(0, 9);
            chartId = 'chart_' + hash;
        } else {
            chartId = 'chart_' + Math.random().toString(36).substr(2, 9);
        }
        return `<div id="${chartId}" class="echarts" style="width: 800px; height: 600px;"></div>
<script>
(function() {
    if (typeof echarts !== 'undefined') {
        var chart = echarts.init(document.getElementById('${chartId}'));
        var option = ${content};
        chart.setOption(option);
    }
})();
</script>`;
    }, { async: true, ends: true });
}