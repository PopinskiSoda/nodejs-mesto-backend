import mongoose from 'mongoose';

const isInvalidDataError = (error: unknown) => (
  error instanceof mongoose.Error.ValidationError
  || error instanceof mongoose.Error.CastError
);

export default isInvalidDataError;
