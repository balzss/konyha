#!/bin/sh
tmux send-keys 'cd ./keystone-backend && yarn dev' C-m \; \
  split-window -v \; \
  send-keys 'cd ./next-frontend && yarn dev' C-m \; 
