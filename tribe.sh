#!/bin/bash
set +e
TRIBE="$1";
COMMAND="$2";
EXTRA="$3";
while IFS='' read -r line || [[ -n "$line" ]]; do
  cd $line;
  source "../../_say.sh" "$TRIBE" "$COMMAND" "$line";
  source "../../_$COMMAND.sh" "$TRIBE" "$EXTRA";
  cd ..;
done < ".tribalinclude"
PROJECT=${PWD##*/};
source "../_say.sh" "$TRIBE" "$COMMAND" "$PROJECT";
source "../_$COMMAND.sh" "$TRIBE" "$EXTRA";
