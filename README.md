# Hexo Plugin Apache ECharts

A Hexo plugin for rendering Apache ECharts diagrams in your blog posts.

## Installation

```bash
npm install hexo-plugin-apache-echarts
```

## Configuration

Add the following configuration to your `_config.yml`:

```yaml
echarts:
  enable: true
  js_url: 'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js'
```

## Usage

Use the `echarts` tag in your markdown files:

```markdown
{% echarts %}
{
  title: {
    text: 'Sample Chart'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
}
{% endecharts %}
```

## Features

- Interactive client-side charts
- CDN-based ECharts library loading

## License

MIT