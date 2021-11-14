export const assertExhausted = (value: never): never => {
    throw new Error(`Unexpected value: ${value}`);
};
