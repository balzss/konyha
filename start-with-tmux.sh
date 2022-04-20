#!/bin/sh
tmux send-keys 'cd ./keystone-backend && npm run dev' C-m \; \
  split-window -v \; \
  send-keys 'cd ./konyha-ui && npm start' C-m \; 
