// eslint-disable-next-line no-magic-numbers
export const jdmp = (wat: unknown) => JSON.stringify(wat, null, 4);
export const jcon = (wat: unknown) => {
  // eslint-disable-next-line no-console
  console.log(jdmp(wat));
  return wat;
};
// export const jdbg = (wat:unknown) => process.env.DEBUG ? jcon(wat) : wat;
