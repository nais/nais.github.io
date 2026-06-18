#!/usr/bin/env bash
#MISE description="Upgrade all GitHub actions to latest"
export GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)}
ratchet upgrade .github/workflows/deploy.yml
