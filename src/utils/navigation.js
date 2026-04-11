export const buildPath = (template, params = {}) => {
  let path = template;

  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });

  return path;
};

export const navigateToEntity = ({
  navigate,
  location,
  listPath,
  createPath,
  editPath,
  id,
}) => {
  const hasId = id !== undefined && id !== null;

  const path = hasId
    ? buildPath(editPath, { id })
    : createPath;

  navigate(path, {
    state: { from: location.pathname },
  });
};