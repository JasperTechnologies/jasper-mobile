export function getProvider(location) {
  if (!location) {
    return null;
  }

  if (location.cloverMetaData) {
    return 'CLOVER';
  }

  return null;
}
