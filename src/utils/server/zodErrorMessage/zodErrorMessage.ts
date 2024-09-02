class ZodErrorMessage {
  format(error: any) {
    console.log(error);

    if (!error.errors) return { errors: error };

    const formattedErrors = error.errors.reduce((acc: any, err: any) => {
      const key = err.path[0];
      if (!key) return;
      let formattedMessage = err.message;

      acc[key] = { message: formattedMessage };
      return acc;
    }, {});

    return { zodErrors: formattedErrors };
  }
}

export default ZodErrorMessage;
