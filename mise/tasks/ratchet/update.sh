#!/usr/bin/env bash
set -euo pipefail
#MISE description="Upgrade all GitHub actions to latest version satisfying their version tag"
export GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)}
ratchet update .github/workflows/*.yml
