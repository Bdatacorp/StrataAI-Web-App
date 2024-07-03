const getMainPath = (pathname: string) => {
  const pathParts = pathname.split("/").filter((part) => part);
  return `/${pathParts[0]}` || "/";
};

export default getMainPath;
