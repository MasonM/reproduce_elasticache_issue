import Ioredis from 'ioredis';

const primaryHost = 'redis://localhost:51410';
const readerHost = 'redis://localhost:51409'; 

const ioredisOptions = {
  //keyPrefix: 'stocklandingpages:',
  //enableAutoPipelining: true,
  retryStrategy: times => (times > 100 ? false : Math.min(times * 100, 3000)),
  reconnectOnError: (err) => {
    if (err && err.message.includes('READONLY')) {
      return 2; // resend command after reconnecting
    }
    return 0;
  },
};

const primaryClient = new Ioredis(primaryHost, ioredisOptions);
const readerClient = new Ioredis(readerHost, ioredisOptions);

const interval = 1000;

// Infinite loop to call set('test', randomNum) on the primary endpoint
setTimeout(async function set() {
  const start = new Date();
  try {
    const response = await primaryClient.set('test', Math.floor(Math.random() * 100));
    console.log(`set(${new Date() - start}): ${response}`);
  } catch (err) {
    console.log(`GOT ERROR: ${err}`);
  }
  setTimeout(set, interval);
}, interval);

// Infinite loop to call get('test') on the reader endpoint
setTimeout(async function get() {
  const start = new Date();
  try {
    const response = await readerClient.get('test');
    console.log(`get(${new Date() - start}): ${response}`);
  } catch (err) {
    console.log(`GOT ERROR: ${err}`);
  }
  setTimeout(get, interval);
}, interval);
