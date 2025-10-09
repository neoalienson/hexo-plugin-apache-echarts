const { expect } = require('chai');

describe('hexo-plugin-apache-echarts', () => {
    let hexo;
    
    beforeEach(() => {
        global.hexo = {
            config: {
                echarts: {
                    enable: true,
                    js_url: 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js'
                }
            },
            extend: {
                tag: {
                    register: function(name, fn, options) {
                        this.registered = { name, fn, options };
                    }
                },
                filter: {
                    register: function(event, fn) {
                        this.registered = { event, fn };
                    }
                }
            }
        };
        hexo = global.hexo;
        delete require.cache[require.resolve('../index.js')];
    });

    it('should register echarts tag when enabled', () => {
        require('../index.js');
        expect(hexo.extend.tag.registered.name).to.equal('echarts');
    });

    it('should generate chart HTML with unique ID', () => {
        require('../index.js');
        const content = '{ title: { text: "Test" } }';
        const result = hexo.extend.tag.registered.fn('', content);
        
        expect(result).to.include('class="echarts"');
        expect(result).to.include('chart_');
        expect(result).to.include('width: 800px');
        expect(result).to.include('height: 600px');
        expect(result).to.include(content);
    });
});