#!/bin/sh
tmux send-keys 'cd ./konyha-backend && npm start' C-m \; \
  split-window -v \; \
  send-keys 'cd ./konyha-ui && npm start' C-m \; 
