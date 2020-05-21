# IUV

### 本地开发

```shell
# 安装依赖
npm i

# 开启 client + server 服务
npm start
```

### 生产环境打包

```shell
# 编译 client + server 文件
npm run build
```

### 推荐开发工具

- IDE

    Visual Studio Code

- VS Code 插件

    - esbenp.prettier-vscode
    - dbaeumer.vscode-eslint
    - stylelint.vscode-stylelint

- VS Code 配置
    ```json
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true
    }
    ```