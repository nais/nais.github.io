#!/usr/bin/env bash
set -euo pipefail
#MISE description="Verify all GitHub actions are pinned"
export GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)}
ratchet lint .github/workflows/*.yml
