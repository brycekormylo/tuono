#!/bin/bash

SESH="tuono"

tmux has-session -t $SESH 2>/dev/null

if [ $? != 0 ]; then
	tmux new-session -d -s $SESH -n "editor"

	tmux send-keys -t $SESH:editor "cd ~/dev/tuono/" C-m
	tmux send-keys -t $SESH:editor "vi ." C-m

	tmux new-window -t $SESH -n "server"
	tmux send-keys -t $SESH:server "cd ~/dev/tuono/" C-m
	tmux send-keys -t $SESH:server "npm run dev" C-m
	
	tmux new-window -t $SESH -n "terminal"
	tmux send-keys -t $SESH:terminal "cd ~/dev/tuono/" C-m
    # tmux send-keys -t $SESH:terminal "firefox --new-window localhost:3000" C-m

	tmux select-window -t 1
fi

tmux attach-session -t $SESH
