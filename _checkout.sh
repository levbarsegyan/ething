#!/bin/bash
export TRIBE="$1";
export APP="$2";
timestamp="$(date)"
echo "$TRIBE" > ".tribe.$TRIBE.CHECKOUT";
git add --all && git commit -m "$TRIBE $timestamp";
git checkout -B "$TRIBE"
