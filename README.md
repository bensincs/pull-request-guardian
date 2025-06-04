# 🛡️ Pull Request Guardian

**Pull Request Guardian** is a strict, zero-config GitHub Action that enforces clean, consistent pull requests using the [Conventional Commits](https://www.conventionalcommits.org/) standard.

No setup. No options. Just clean PRs.

---

## 🔍 What It Enforces

### ✅ Branch Name Convention

Branch must match:
```
^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$`
```
Examples:
- `feat/login-form` ✅
- `fix/api-crash` ✅
- `feature/add-stuff` ❌ (invalid prefix)

---

### ✅ PR Title Format
PR title must follow [Conventional Commits](https://www.conventionalcommits.org/):
```
^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: [A-Z].{1,50}$
```
Examples:
- `feat: add login form` ✅
- `fix(api): handle null case` ✅
- `docs: update README` ✅
- `style: format code` ✅
- `refactor: improve performance` ✅
- `perf: optimize images` ✅
- `test: add unit tests` ✅
- `chore: update dependencies` ✅

---

### ✅ Prefix Match

PR title `type` must match the branch prefix:

| Branch             | PR Title                        | Valid? |
|--------------------|----------------------------------|--------|
| `feat/login-form`  | `feat(login): add login page`   | ✅      |
| `fix/api-crash`    | `fix: handle API crash`         | ✅      |
| `docs/update`      | `docs: update documentation`    | ✅      |
| `style/code`       | `style: format code`            | ✅      |
| `refactor/cleanup` | `refactor: clean up code`       | ✅      |
| `perf/optimize`    | `perf: improve performance`     | ✅      |
| `test/unit`        | `test: add unit tests`          | ✅      |
| `chore/maintenance`| `chore: update dependencies`    | ✅      |
| `feat/login-form`  | `fix: incorrect prefix`         | ❌      |

---

### ✅ PR Description Required

PR must include a non-empty description (body).

---

## 🚀 Usage

```yaml
name: Validate PR

on:
  pull_request:
    types: [opened, synchronize, reopened, edited]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: your-org/pull-request-guardian@v1