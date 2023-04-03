export const objectKeys = <Obj extends object>(obj?: Obj): (keyof Obj)[] => {
  return obj ? (Object.keys(obj) as (keyof Obj)[]) : [];
};
