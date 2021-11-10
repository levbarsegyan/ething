#!/bin/bash
set +e
TRIBE="$1";
COMMAND="$2";
EXTRA="$3";
for APP in bones flesh generator-flesh spider thing
do
  cd $APP;
  source "../../_$COMMAND.sh" "$TRIBE" "$EXTRA";
  source "../../_say.sh" "$TRIBE" "$COMMAND" "$APP";
  cd ..;
done
PROJECT=${PWD##*/};
source "../_$COMMAND.sh" "$TRIBE" "$EXTRA";
source "../_say.sh" "$TRIBE" "$COMMAND" "$PROJECT";
