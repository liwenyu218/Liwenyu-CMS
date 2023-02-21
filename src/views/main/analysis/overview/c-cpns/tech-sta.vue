<script setup lang="ts">
const techList = [
  { key: '开发工具', value: 'Visual Studio Code' },
  { key: '编程语言', value: 'TypeScript 4.x + JavaScript' },
  { key: '构建工具', value: 'Vite2.x' },
  { key: '前端框架', value: 'Vue 3.x' },
  { key: '前端路由', value: 'Vue Route 4.x' },
  { key: '状态管理', value: 'Pinia' },
  { key: 'UI框架', value: 'Element Plus' },
  { key: '可视化', value: 'Echart5.x' },
  { key: '富文本', value: 'WangEditor' },
  { key: '工具库', value: '@vueuse/core + dayjs + countup.js' },
  { key: 'css预编译', value: 'Sass/Less' },
  { key: 'HTTP工具', value: 'Axios' },
  { key: 'Git Hook工具', value: 'husky' },
  { key: '代码规范', value: 'EditorConfig + Prettier + ESLint' },
  { key: '提交规范', value: 'Commitizen + Commitlint' },
  { key: '自动部署', value: 'Centos + Jenkins + Nginx' }
]
const dependencies = {
  vue: '^3.2.45',
  'vue-router': '^4.1.6',
  '@element-plus/icons-vue': '^2.0.10',
  axios: '^1.2.2',
  'countup.js': '^2.4.2',
  dayjs: '^1.11.7',
  echarts: '^5.4.1',
  'element-plus': '^2.2.28',
  'normalize.css': '^8.0.1',
  pinia: '^2.0.29'
}
const devDependencies = {
  '@rushstack/eslint-patch': '^1.1.4',
  '@types/node': '^18.11.12',
  '@vitejs/plugin-vue': '^4.0.0',
  '@vue/eslint-config-prettier': '^7.0.0',
  '@vue/eslint-config-typescript': '^11.0.0',
  '@vue/tsconfig': '^0.1.3',
  commitizen: '^4.3.0',
  consola: '^2.15.3',
  'cz-conventional-changelog': '^3.3.0',
  eslint: '^8.22.0',
  'eslint-plugin-prettier': '^4.2.1',
  'eslint-plugin-vue': '^9.3.0',
  husky: '^8.0.0',
  less: '^4.1.3',
  'npm-run-all': '^4.1.5',
  prettier: '^2.7.1',
  typescript: '~4.7.4',
  'unplugin-auto-import': '^0.13.0',
  'unplugin-vue-components': '^0.23.0',
  vite: '^4.0.0',
  'vite-plugin-style-import': '^2.0.0',
  'vue-tsc': '^1.0.12'
}
</script>

<template>
  <div class="tech-sta">
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <span>技术栈</span>
        </div>
      </template>
      <div class="text-link">
        <template v-for="item in techList" :key="item.key">
          <div class="item">
            <el-icon size="15"><CaretRight /></el-icon>
            <span class="title">{{ item.key + ' : ' }}</span>
            <el-link type="primary">{{ item.value }}</el-link>
          </div>
        </template>
      </div>
      <div class="description">
        <el-descriptions title="生产环境依赖" :column="2" size="large" border>
          <template v-for="(val, key) in dependencies" :key="key">
            <el-descriptions-item>
              <template #label>
                {{ key }}
              </template>
              <el-tag size="small">{{ val }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
      <div class="description">
        <el-descriptions title="开发环境依赖" :column="2" size="large" border>
          <template v-for="(val, key) in devDependencies" :key="key">
            <el-descriptions-item>
              <template #label>
                {{ key }}
              </template>
              <el-tag size="small">{{ val }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.item {
  margin: 0 5px 8px 0;
  display: flex;
  align-items: center;

  .title {
    margin-left: 6px;
    margin-right: 15px;
  }
}

.description {
  margin-top: 30px;

  :deep(.el-descriptions__title) {
    font-weight: 400;
  }

  :deep(.el-descriptions__cell) {
    font-weight: 800;
    color: var(--el-text-color-secondary);
  }
}

.lan {
  font-family: monospace, monospace;
  font-size: 1em;
}
</style>
