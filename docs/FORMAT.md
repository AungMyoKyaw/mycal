# Code Formatting

This project uses **Prettier** for automatic code formatting to ensure consistent code style across the codebase.

## Configuration

- **Formatter**: Prettier 3.8.1
- **Config**: `.prettierrc`
- **Ignore patterns**: `.prettierignore`

## Formatting Rules

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## Usage

### Format all files

```bash
bun run format
```

### Check formatting (CI)

```bash
bun run format:check
```

## Pre-commit Hooks

Formatting is enforced automatically via git pre-commit hooks using **Husky** + **lint-staged**. Every time you commit, staged files will be automatically formatted.

## CI/CD

The format check runs in CI pipeline for every push and pull request. Build will fail if code is not properly formatted.

## Editor Support

For **vim/neovim** users, install and configure:

- [vim-prettier](https://github.com/prettier/vim-prettier)
- Or use [null-ls.nvim](https://github.com/jose-elias-alvarez/null-ls.nvim) with Prettier

**Recommended vim configuration:**

```vim
" Auto-format on save
autocmd BufWritePre *.ts,*.js,*.json,*.md,*.yml Prettier
```
