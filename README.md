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
  id_generation: 'random'  # 'random' for performance, 'hash' for consistency
```

### Configuration Options

- `enable`: Enable/disable the plugin (default: `true`)
- `js_url`: CDN URL for ECharts library (default: jsdelivr CDN)
- `id_generation`: ID generation method (default: `'random'`)
  - `'random'`: Generate random IDs for better performance
  - `'hash'`: Generate hash-based IDs from chart content for consistency

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
- Configurable ID generation (random or hash-based)
- Automatic ECharts script injection
- Support for all ECharts chart types

## Development

### Testing

Run the test suite:

```bash
npm test
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT