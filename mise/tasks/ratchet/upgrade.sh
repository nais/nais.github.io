#!/usr/bin/env bash
set -euo pipefail
#MISE description="Upgrade GitHub actions in deploy.yml to latest"
export GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)}
ratchet upgrade .github/workflows/deploy.yml
