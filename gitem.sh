#!/bin/bash
set -u
set -e
export MSG="$1";
timestamp="$(date)"
for f in bones flesh generator-flesh spider thing
do
  cd $f;
  echo "=================== $f ==================="
  echo "$MSG $timestamp" > MSG;
  git add --all && git commit -m "$MSG $timestamp" && git push;
  echo "$f committed"
  cd ..;
done
