#!/bin/sh
ssh -L 51410:$PRIMARY_ENDPOINT:6379 -L 51409:$READER_ENDPOINT:6379 $BASTION
