const { expect } = require('chai');

describe('hexo-plugin-apache-echarts', () => {
    let hexo;
    
    beforeEach(() => {
        global.hexo = {
            config: {
                echarts: {
                    enable: true,
                    js_url: 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js',
                    id_generation: 'random'
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

    it('should generate chart HTML with random ID', () => {
        require('../index.js');
        const content = '{ title: { text: "Test" } }';
        const result = hexo.extend.tag.registered.fn('', content);
        
        expect(result).to.include('class="echarts"');
        expect(result).to.include('chart_');
        expect(result).to.include('width: 800px');
        expect(result).to.include('height: 600px');
        expect(result).to.include(content);
    });

    it('should generate consistent hash-based IDs', () => {
        hexo.config.echarts.id_generation = 'hash';
        require('../index.js');
        const content = '{ title: { text: "Test" } }';
        
        const result1 = hexo.extend.tag.registered.fn('', content);
        const result2 = hexo.extend.tag.registered.fn('', content);
        
        const id1 = result1.match(/id="(chart_[^"]+)"/)[1];
        const id2 = result2.match(/id="(chart_[^"]+)"/)[1];
        
        expect(id1).to.equal(id2);
        expect(id1).to.equal('chart_0f358dac6');
    });

    it('should generate different IDs for different content with hash mode', () => {
        hexo.config.echarts.id_generation = 'hash';
        require('../index.js');
        
        const content1 = '{ title: { text: "Test1" } }';
        const content2 = '{ title: { text: "Test2" } }';
        
        const result1 = hexo.extend.tag.registered.fn('', content1);
        const result2 = hexo.extend.tag.registered.fn('', content2);
        
        const id1 = result1.match(/id="(chart_[^"]+)"/)[1];
        const id2 = result2.match(/id="(chart_[^"]+)"/)[1];
        
        expect(id1).to.not.equal(id2);
    });
});