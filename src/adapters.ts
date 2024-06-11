//  add new storage adapters here
export const adapterClasses = {
  b2: ["AdapterBackblazeB2", "@caporaldead/sab-adapter-backblaze-b2"],
  s3: ["AdapterAmazonS3", "@caporaldead/sab-adapter-amazon-s3"],
  gcs: ["AdapterGoogleCloud", "@caporaldead/sab-adapter-google-cloud"],
  local: ["AdapterLocal", "@caporaldead/sab-adapter-local"],
  azure: ["AdapterAzureBlob", "@caporaldead/sab-adapter-azure-blob"],
  minio: ["AdapterMinio", "@caporaldead/sab-adapter-minio"],
};

// or here for functional adapters
export const adapterFunctions = {
  b2f: ["AdapterBackblazeB2F", "@caporaldead/sab-adapter-backblaze-b2f"],
};

export function getAvailableAdapters(): string {
  return Object.keys(adapterClasses)
    .concat(Object.keys(adapterFunctions))
    .reduce((acc, val) => {
      if (acc.findIndex((v) => v === val) === -1) {
        acc.push(val[0]);
      }
      return acc;
    }, [])
    .sort()
    .join(", ");
}
