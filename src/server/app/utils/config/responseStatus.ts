const ResponceStatus = {
  success(name: string, action?: string) {
    return {
      status: true,
      message: `${name} has been successfully ${action || "created"}.`,
    };
  },
  failed(name: string, action?: string) {
    return {
      status: false,
      message: `There was an error in ${
        action || "creating"
      } the ${name}. Please try again or contact support if the issue persists.`,
    };
  },
};

export default ResponceStatus;
