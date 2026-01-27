# GitHub Actions CI/CD Workflows

This document describes the GitHub Actions workflows configured for this project.

## Workflows Overview

### 1. CI Workflow (`ci.yml`)

**Trigger:** Push to `master` or `feature/*` branches, and pull requests to `master`

**What it does:**

- Caches Bun dependencies for faster builds
- Tests the code against Node.js versions: 20.x, 22.x, and LTS
- Runs type checking
- Executes all tests
- Builds the package for Node.js, Browser, and TypeScript declarations

**Action Versions (Latest):**

- `actions/checkout@v5`
- `actions/setup-node@v6`
- `oven-sh/setup-bun@v2`
- `actions/cache@v4`

**Matrix Strategy:**

```yaml
node-version: [20.x, 22.x, 'lts/*']
```

### 2. Publish Workflow (`publish.yml`)

**Trigger:** When a GitHub release is published

**What it does:**

- Caches Bun dependencies for faster builds
- Runs full CI checks (type check, tests, build)
- Publishes the package to npm with provenance
- Uses `id-token: write` permission for npm provenance
- Uses `--provenance --access public` flags for secure publishing

**Required Setup:**

1. Set `NPM_TOKEN` in repository secrets (Settings → Secrets and variables → Actions)
   - Get your token from https://www.npmjs.com/settings/tokens
   - Token should have "Automation" permissions
   - Add as repository secret named `NPM_TOKEN`

### 3. Code Quality Workflow (`code-quality.yml`)

**Trigger:** Push to `master` or `feature/*` branches, and pull requests to `master`

**What it does:**

- Caches Bun dependencies for faster builds
- Verifies TypeScript type checking
- Ensures build artifacts are generated correctly
- Runs dependency review on PRs (fails on moderate+ severity vulnerabilities)
- Verifies all build outputs exist (node, browser, types)

### 4. Release Workflow (`release.yml`)

**Trigger:** Manual workflow dispatch (Actions → Create Release → Run workflow)

**What it does:**

- Creates a new version (major, minor, or patch)
- Runs tests and builds
- Commits the version bump
- Creates a Git tag
- Pushes to master
- Creates a GitHub release
- **This automatically triggers the `publish.yml` workflow**

**Usage:**

1. Go to Actions → Create Release
2. Click "Run workflow"
3. Select version bump type (patch/minor/major)
4. Optionally mark as pre-release
5. Click "Run workflow"

## Release Process

### Automated Release Workflow

1. **Create Release:**

   ```bash
   # Via GitHub UI:
   # Actions → Create Release → Run workflow
   ```

2. **What happens:**
   - Version is bumped in package.json
   - Commit is created and tagged
   - GitHub release is created
   - **Publish workflow is automatically triggered**
   - Package is published to npm

### Manual Release Process

If you prefer manual control:

1. **Bump version locally:**

   ```bash
   bunx npm version major|minor|patch
   ```

2. **Push tags:**

   ```bash
   git push origin master --tags
   ```

3. **Create release on GitHub:**
   - Go to Releases → Create new release
   - Select the tag you just pushed
   - Click "Publish release"

4. **Publish workflow runs automatically**

## Development Workflow

### Feature Development

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/my-feature`
4. Open a pull request to `master`
5. CI runs automatically
6. After approval, merge the PR

### Hotfix to Master

1. Create branch: `git checkout -b hotfix/urgent-fix`
2. Make changes and commit
3. Push to GitHub: `git push origin hotfix/urgent-fix`
4. Open a PR to `master`
5. After approval, merge

## Secrets Required

Add these secrets in your repository settings (Settings → Secrets and variables → Actions):

| Secret      | Description          | How to get                                                     |
| ----------- | -------------------- | -------------------------------------------------------------- |
| `NPM_TOKEN` | npm automation token | https://www.npmjs.com/settings/tokens (Automation permissions) |

## Branch Protection Rules (Recommended)

Configure these in Settings → Branches:

**For `master` branch:**

- ✅ Require a pull request before merging
  - Require approvals: 1
- ✅ Require status checks to pass before merging
  - `Type check`
  - `Run tests`
  - `Build`
  - `Code Quality`
- ✅ Require branches to be up to date before merging
- ⚠️ Do not allow bypassing the above settings

## Badges (Optional)

Add to README.md:

```markdown
![CI](https://github.com/AungMyoKyaw/mycal/workflows/CI/badge.svg)
![npm version](https://badge.fury.io/js/mycal.svg)
```

## Troubleshooting

### Publish fails with "404 Not Found"

- Check that `NPM_TOKEN` has correct permissions
- Verify package name doesn't conflict
- Ensure you're a maintainer/owner on npm

### Tests pass locally but fail in CI

- Ensure all dependencies are in package.json
- Check for platform-specific code (Windows vs Unix)
- Verify Node.js version compatibility

### Build artifacts not found

- Ensure `bun run build` generates all required files
- Check that paths in `.npmignore` aren't too aggressive

### Provenance fails

- Ensure npm token has "Automation" permissions
- Package must be public for provenance to work
- Verify `id-token: write` permission is set in workflow

### Action version warnings

- All workflows use latest action versions (checkout@v5, setup-node@v6, cache@v4)
- Bun dependencies are cached for faster CI/CD
- Warnings about outdated versions should not appear
