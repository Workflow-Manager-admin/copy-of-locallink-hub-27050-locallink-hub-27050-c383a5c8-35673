#!/bin/bash
cd /home/kavia/workspace/code-generation/locallink-hub-27050-c383a5c8/locallink_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

