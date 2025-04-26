export const colorSuccess = (message: string) => {
  console.log(`\x1b[32m%s\x1b[0m`, `SUCCESS: ${message}`);
};

export const colorError = (message: any) => {
  console.error(`\x1b[31m%s\x1b[0m`, `ERROR: ${message}`);
};
