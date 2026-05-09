export const createEntity = (defFn) => {
  return (ctx) => defFn(ctx);
};