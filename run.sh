#!/bin/sh
DEBUG=ioredis:* node test.mjs 2>&1 | tee run.log
