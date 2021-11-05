#!/bin/bash
export TRIBE="$1";
export COMMAND="$2";
timestamp="$(date)";
for f in bones flesh generator-flesh spider thing 
do
  cd $f;
  echo "[>><<TRIBES>><<].$TRIBE.$f._$COMMAND ✓";
  source "../_$COMMAND.sh" "$TRIBE" "$f";
  cd ..;
done
echo "[>><<TRIBES>><<].$TRIBE.elioBelievers._$COMMAND ✓";
source "_$COMMAND.sh" "$TRIBE" "elioThings";
