#!/bin/bash
set +e
TRIBE="$1";
COMMAND="$2";
EXTRA="$3";
PROJECT=${PWD##*/};
source "../_say.sh" "$TRIBE" "$COMMAND" "$PROJECT";
source "../_$COMMAND.sh" "$TRIBE" "$EXTRA";
while IFS='' read -r line || [[ -n "$line" ]]; do
  cd $line;
  source "../../_say.sh" "$TRIBE" "$COMMAND" "$line";
  source "../../_$COMMAND.sh" "$TRIBE" "$EXTRA";
  cd ..;
done < ".tribalinclude"
