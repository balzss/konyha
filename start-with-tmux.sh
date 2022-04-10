#!/bin/sh
tmux send-keys 'cd ./konyha-backend && npm run develop' C-m \; \
  split-window -v \; \
  send-keys 'cd ./konyha-ui && npm start' C-m \; 
