#!/bin/bash
set -u
set -e
export MSG="$1";
timestamp="$(date)"
for f in bones generator-flesh spider
do
  cd $f;
  echo "=================== $f ==================="
  echo "$MSG $timestamp" > MSG;
  git add --all && git commit -m "$MSG $timestamp"
  npm version patch
  npm publish
  git push;
  echo "$f published"
  cd ..;
done
