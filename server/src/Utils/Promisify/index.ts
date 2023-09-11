function Promisify<ParamType = any, ErrorType = any, DataType = any>(
  callback: (
    param: ParamType,
    cb: (err: ErrorType, data: DataType) => void
  ) => void,
  param: ParamType
) {
  return new Promise((resolve, reject) => {
    callback(param, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
}

export { Promisify };
