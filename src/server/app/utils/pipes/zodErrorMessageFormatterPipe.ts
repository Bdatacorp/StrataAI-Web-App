export default function zodErrorMessageFormatter(error: any) {
  if (!error.errors) return { errors: error };

  const formattedErrors = error.errors.reduce((acc: any, err: any) => {
    const key = err.path[0];
    if (!key) return;
    let formattedMessage = err.message;

    acc[key] = { message: formattedMessage };
    return acc;
  }, {});
  return { errors: formattedErrors };
}
