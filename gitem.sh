#!/bin/bash
set -u
set -e
export COMMIT="$1";
timestamp="$(date)"
echo "$COMMIT" > COMMIT;
git add --all && git commit -m "$COMMIT $timestamp" && git push;
for f in bones flesh generator-flesh spider thing
do
  cd $f;
  echo "=================== $f ==================="
  echo "$COMMIT" > COMMIT;
  echo "$f committed"
  cd ..;
done
