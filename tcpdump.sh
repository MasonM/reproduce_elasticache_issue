#!/bin/sh
sudo tcpdump -i lo0 -n -v -s 0 'tcp port 51409 or tcp port 51410' -w tcpdump.pcap
