#!/bin/sh
BASTION=REDACTED
PRIMARY=mmalone-test-stk-83486.gpztxp.ng.0001.euw1.cache.amazonaws.com
READER=mmalone-test-stk-83486-ro.gpztxp.ng.0001.euw1.cache.amazonaws.com
ssh -L 51410:$PRIMARY:6379 -L 51409:$READER:6379 mmalone@$BASTION
