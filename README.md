This repository contains the code necessary to reproduce an issue with AWS ElastiCache for Redis where the reader endpoint stops responding for ~4 minutes during upgrades. Instructions:
1. Create an ElasticCache for Redis cluster with the following settings:

   * Region - eu-west-1
   * Redis version - 6.2.6
   * Node type - cache.m6g.large
   * Cluster mode disabled and multi-AZ enabled
   * 1 replica (for 2 total nodes)
2. Install packages with `npm install`
3. Start the SSH tunnel with `BASTION=bastion PRIMARY_ENDPOINT=primary READER_ENDPOINT=reader ./tunnel.sh`

   Replace `bastion` with a bastion host with connectivity to the ElastiCache instances, `primary` with the cluster's primary endpoint, and `reader` with the cluster's reader endpoint.
4. Initialize packet capture with `./tcpdump.sh`, which writes to the file `tcpdump.pcap`
5. Start the application server with `./run.sh`, which outputs logs to `run.log`
6. Go to the ["Modify" page](https://eu-west-1.console.aws.amazon.com/elasticache/home?region=eu-west-1#/redis/mmalone-test-stk-83486/modify) for the ElastiCache cluster
7. Change the "Node type" field to `cache.m6g.xlarge`
8. Click "Preview Changes"
9. Click "Modify"
