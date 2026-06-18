#!/usr/bin/env bash
#MISE description="Verify all GitHub actions are pinned"
export GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)}
ratchet lint .github/workflows/*.yml
