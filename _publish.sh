#!/bin/bash
set -u
set -e
export TRIBE="$1";
export APP="$2";
timestamp="$(date)"
echo "$TRIBE" > ".tribe.$TRIBE.PUBLISH";
git add --all && git commit -m "$TRIBE $timestamp"
npm version patch
npm publish
git push -u origin "$TRIBE";
