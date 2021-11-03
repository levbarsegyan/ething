#!/bin/bash
set -u
set -e
export TRIBE="$1";
export APP="$2";
timestamp="$(date)"
echo "$TRIBE" > ".tribe.$TRIBE.PUSH";
git add --all && git commit -m "$TRIBE $timestamp";
git push -u origin "$TRIBE";
