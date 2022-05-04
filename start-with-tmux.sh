#!/bin/sh

tmux send-keys 'cd ./next-frontend && yarn dev' C-m
tmux split-window -v
tmux send-keys 'cd ./hasura-backend && yarn dev' C-m
tmux split-window -h
tmux send-keys 'cd ./hasura-backend' C-m
tmux send-keys 'yarn console'
