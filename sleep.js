const sleep = (ms, callback, ...args) => {
  return new Promise((resolve) => {setTimeout(() => {callback(arg); resolve(result); }, ms);
})}

const wakeUp = async () => {
  const a = 1;
  const b = 2;
  const result = await sleep(3000, (arg) => {
    console.log('2초 뒤 실행')
    return arg + 1
  });
  console.log(a)
  return console.log('wake up!')
}



wakeUp();