git init
git branch -m main
git remote add origin https://github.com/manojCodeBug/FundForge.git

# Set user
git config user.name "manojCodeBug"
git config user.email "manoj@example.com"

# 1
git add .gitignore
git commit -m "chore: add gitignore"

# 2
git add package.json package-lock.json
git commit -m "build: add npm dependencies and package configuration"

# 3
git add vite.config.ts vitest.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json
git commit -m "build: configure Vite and TypeScript"

# 4
git add index.html
git commit -m "feat: add application entry point"

# 5
git add public/
git commit -m "asset: add public assets"

# 6
git add netlify.toml
git commit -m "ci: add Netlify configuration"

# 7
git add .env
git commit -m "chore: add environment variables template"

# 8
git add .oxlintrc.json
git commit -m "chore: add oxlint configuration"

# 9
git add Cargo.toml Cargo.lock
git commit -m "build: add Rust cargo configuration"

# 10
git add contracts/
git commit -m "feat: add smart contracts"

# 11
git add scripts/
git commit -m "chore: add build and deploy scripts"

# 12
git add stitch/
git commit -m "style: add Stitch design system tokens"

# 13
git add .github/
git commit -m "ci: add GitHub Actions workflows"

# 14
git add src/
git commit -m "feat: implement main application source code"

# 15
git add README.md
git commit -m "docs: add comprehensive project documentation"
