# 核心原则

- 简体中文回答
- Claude 4并行优先
- 官方Subagents标准
- MCP工具优先
- 时间感知优先

# 复杂度决策

```python
if 文件数 < 3 and 代码行数 < 200:
    使用 Claude 4 并行模式 + 基础MCP工具
elif 文件数 <= 10 and 需要专业协作:
    使用 官方Subagents + 核心MCP工具
else:
    使用 Opus 4 + 完整MCP生态
```

# 工具优先级

## 基础层 (必须)

- Read, Write, Edit, Grep, Glob, Bash, TodoWrite

## MCP层 (优先使用)

- mcp__plugin_context7_context7: 实时文档查询
- mcp__plugin_playwright_playwright: 跨浏览器测试
- mcp__chrome-devtools: 浏览器自动化
- mcp__sequential-thinking: 复杂逻辑分析
- mcp__exa_mcp_server: 智能网络搜索和代码搜索

## 受限工具

- ⚠️ WebFetch → ✅ mcp__fetch (WebFetch可用但MCP更优)
- ⚠️ WebSearch → ✅ mcp__tavily__tavily-search (WebSearch可用但MCP更优)

# Subagents配置

## 创建方式

- 命令: `/agents`
- 存储: `.claude/agents/{name}.md`
- 格式: YAML frontmatter + Markdown

## 调用语法

- 自动委派: 基于description字段智能匹配
- 显式调用:
  - `Use the {agent-name} subagent to {task}`
  - `Have the {agent-name} subagent {action}`
  - `Ask the {agent-name} subagent to {request}`
- 链式调用: `First use the analyzer subagent, then use the optimizer subagent`

## 创建策略

- 项目特定: 基于当前项目技术栈和需求自动生成
- 单一职责: 每个agent专注一个明确任务
- Claude生成: 先用Claude生成基础结构，再个性化定制
- 描述优化: 在description中使用"PROACTIVELY"或"MUST BE USED"提高自动使用率
- 并行优化: 在系统提示中注入Claude 4并行工具调用指导，确保subagents也能享受78%性能提升

# 执行规则

## 必须执行

1. 获取当前时间: `mcp__mcp-server-time`
2. 并行工具调用: 同时执行独立操作
3. 验证API真实性: 通过Context7确认
4. 配置质量Hooks: PreToolUse + PostToolUse

## 并行场景

- 多文件读取 → 同时Read
- 多关键词搜索 → 同时Grep
- 多命令执行 → 同时Bash
- 多资源获取 → 同时MCP工具

## 禁止行为

- 串行执行可并行操作
- 虚构API或配置信息
- 跳过时间感知步骤
- 使用被禁用的内置工具

# Hooks配置

## PreToolUse Hooks

### Bash
- 检查git状态: `git status --porcelain`
- 验证命令权限
- 记录执行上下文

### Edit/Write
- 创建备份: `cp "$CLAUDE_FILE" "$CLAUDE_FILE.backup"`
- 验证目录存在: `mkdir -p "$(dirname "$CLAUDE_FILE")"`
- 检查文件权限

### Read/Glob/Grep
- 验证路径存在
- 检查文件大小限制

## PostToolUse Hooks

### Edit/Write
- 输出成功消息: `echo '✅ File modified: $CLAUDE_FILE'`
- 验证文件内容
- 自动格式化检查

### Bash
- 输出执行结果: `echo '🔧 Command executed successfully'`
- 检查退出码
- 记录执行时间

### MCP工具
- 验证连接状态
- 记录响应时间
- 缓存结果验证

# MCP服务器配置

## 已配置的MCP服务器

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {}
    },
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    },
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"],
      "env": {}
    },
    "exa": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {}
    }
  }
}
```

## 使用场景

### Context7 (文档查询)
- **使用时机**: 实现新功能前查询文档
- **调用方式**: `mcp__plugin_context7_context7__resolve-library-id` + `mcp__plugin_context7_context7__query-docs`
- **优势**: 实时API文档，避免虚构信息

### Playwright (浏览器测试)
- **使用时机**: 前端UI测试、截图、自动化操作
- **调用方式**: `mcp__plugin_playwright_playwright__*`
- **优势**: 跨浏览器兼容性测试

### Chrome DevTools (浏览器调试)
- **使用时机**: 页面性能分析、网络请求检查、DOM操作
- **调用方式**: `mcp__chrome-devtools__*`
- **优势**: 深度浏览器集成，性能追踪

### Sequential Thinking (复杂逻辑)
- **使用时机**: 复杂问题分解、架构设计、多步骤推理
- **调用方式**: `mcp__sequential-thinking`
- **优势**: 系统化思考，避免遗漏

### Exa (智能搜索)
- **使用时机**: 网络搜索、代码搜索、文档检索、深度研究
- **调用方式**: `mcp__exa_mcp_server__*`
- **优势**:
  - 搜索数十亿GitHub仓库、文档页面和Stack Overflow帖子
  - 避免AI幻觉，提供准确的代码上下文
  - 实时网络搜索和深度研究能力
- **核心工具**:
  - `web_search_exa`: 实时网络搜索
  - `get_code_context_exa`: 代码上下文搜索
  - `deep_search_exa`: 深度网络搜索
  - `company_research`: 公司研究
  - `deep_researcher_start/check`: AI深度研究

# 项目初始化流程

1. `mcp__mcp-server-time`: 获取当前时间
2. 并行项目分析: Read + Grep + Glob
3. 技术栈识别: 基于依赖和文件模式
4. 文档查询: 使用Exa搜索相关技术文档
5. Subagents匹配: 检查`.claude/agents/`目录
6. 创建缺失专家: 使用`/agents`命令，自动注入并行工具调用优化指导
7. 配置Hooks管道: 基于项目类型设置

# 权限配置

## 允许的工具

### Git操作
- `Bash(git add:*)`
- `Bash(git commit:*)`
- `Bash(git push:*)`
- `Bash(git pull:*)`
- `Bash(git status:*)`
- `Bash(git diff:*)`
- `Bash(git log:*)`
- `Bash(git branch:*)`
- `Bash(git worktree list:*)`

### 包管理器
- `Bash(npm run:*)`
- `Bash(yarn:*)`
- `Bash(pnpm:*)`

### 文件操作
- `Edit(*)`
- `Write(*)`
- `Read(*)`
- `Glob(*)`
- `Grep(*)`
- `TodoWrite(*)`

### MCP工具
- `mcp__plugin_context7_context7__resolve-library-id`
- `mcp__plugin_context7_context7__query-docs`
- `mcp__plugin_playwright_playwright__*`
- `mcp__chrome-devtools__*`
- `mcp__exa_mcp_server__*`

### Skills
- `Skill(skill-creator)`
- `Skill(skill-creator:*)`
- `Skill(commit-commands:*)`
- `Skill(init:*)`

## 默认模式
- `defaultMode`: "acceptEdits" (自动接受编辑)

# 并行工具调用优化

## 优化策略

### 1. 批量文件读取
```javascript
// 串行 (慢)
const file1 = await Read("file1.txt");
const file2 = await Read("file2.txt");

// 并行 (快)
const [file1, file2] = await Promise.all([
  Read("file1.txt"),
  Read("file2.txt")
]);
```

### 2. 多关键词搜索
```javascript
// 串行 (慢)
const results1 = await Grep("keyword1");
const results2 = await Grep("keyword2");

// 并行 (快)
const [results1, results2] = await Promise.all([
  Grep("keyword1"),
  Grep("keyword2")
]);
```

### 3. 多命令执行
```javascript
// 串行 (慢)
await Bash("git status");
await Bash("git log --oneline -5");

// 并行 (快)
const [status, log] = await Promise.all([
  Bash("git status"),
  Bash("git log --oneline -5")
]);
```

### 4. MCP工具并行调用
```javascript
// 串行 (慢)
const docs1 = await mcp__plugin_context7_context7__query-docs(...);
const search1 = await mcp__exa_mcp_server__web_search_exa(...);

// 并行 (快)
const [docs1, search1] = await Promise.all([
  mcp__plugin_context7_context7__query-docs(...),
  mcp__exa_mcp_server__web_search_exa(...)
]);
```

## 性能提升

- **并行执行**: 78%性能提升
- **减少等待时间**: 独立操作同时执行
- **资源利用率**: 最大化工具并行度

# 项目特定配置

## GitHub Profile 仓库

### 技术栈
- GitHub Actions (CI/CD)
- SVG生成 (Metrics)
- Markdown文档

### 工作流优化

#### Pre-Commit Hooks
```bash
# 验证SVG文件完整性
file github-metrics.svg | grep "SVG"

# 检查README链接
grep -o "https://[^)]*" README.md | head -5
```

#### Post-Edit Hooks
```bash
# 验证YAML语法
yamllint .github/workflows/*.yml 2>/dev/null || true

# 检查Markdown格式
markdownlint README.md 2>/dev/null || true
```

### MCP工具使用场景

#### Context7 (文档查询)
- 查询GitHub Actions最佳实践
- 获取SVG生成API文档
- 学习Metrics配置模板

#### Playwright (测试)
- 截图验证SVG渲染
- 测试README展示效果
- 验证GitHub Pages部署

#### Chrome DevTools (调试)
- 分析SVG性能
- 检查网络请求
- 追踪CI/CD流程

#### Exa (智能搜索)
- 搜索GitHub Actions最新最佳实践
- 查找SVG生成优化方案
- 研究GitHub Profile设计趋势
- 检索开源项目配置示例
- 深度研究技术文档

# 时间感知

## 获取当前时间
```bash
# 使用MCP时间服务器
mcp__mcp-server-time
```

## 时间敏感操作
- Git提交时间戳
- 日志记录时间
- 性能追踪时间
- CI/CD触发时间

# 错误处理

## 验证步骤
1. **API真实性**: 通过Context7验证
2. **配置完整性**: 检查所有必需字段
3. **权限验证**: 确认工具访问权限
4. **连接状态**: 验证MCP服务器连接

## 回滚机制
- 自动备份: PreToolUse创建备份
- 版本控制: Git提交前验证
- 状态恢复: PostToolUse检查

# 最佳实践

## 1. 并行优先
- 独立操作必须并行执行
- 使用Promise.all处理批量任务
- 避免不必要的串行等待

## 2. MCP优先
- 优先使用MCP工具而非内置工具
- 通过Context7验证API信息
- 使用Playwright进行UI测试

## 3. 时间感知
- 获取当前时间用于日志
- 记录操作耗时
- 验证时间敏感配置

## 4. 质量保证
- PreToolUse验证环境
- PostToolUse检查结果
- 自动化格式化和检查

## 5. 安全性
- 最小权限原则
- 备份关键文件
- 验证外部输入

# 性能监控

## 指标追踪
- 工具调用耗时
- MCP响应时间
- 并行执行效率
- 缓存命中率

## 优化建议
- 识别串行瓶颈
- 增加并行度
- 优化MCP调用频率
- 减少不必要的工具调用
