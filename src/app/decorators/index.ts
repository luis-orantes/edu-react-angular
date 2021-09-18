

export function AppDecorator(config) {

  console.log(config.message);

  return (target) => {
    console.log ('decorated class - ', target);
    target.prototype.hello = 'Hello from decorator';
  };
}
