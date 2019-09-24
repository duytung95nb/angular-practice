addEventListener('message', ({ data }) => {
    // long running task
    let x = 0;
    const time = Date.now();
    while(x < 10000000000) {
        x++;   
    }
    console.log('Task run for', Date.now() - time);
    postMessage(x);
  });