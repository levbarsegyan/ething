#!/bin/bash
set -u
set -e
export COMMIT="$1";
timestamp="$(date)"
for f in bones generator-flesh spider
do
  cd $f;
  echo "=================== $f ==================="
  echo "$COMMIT" > COMMIT;
  git add --all && git commit -m "$COMMIT $timestamp"
  npm version patch
  npm publish
  git push;
  echo "$f published"
  cd ..;
done
