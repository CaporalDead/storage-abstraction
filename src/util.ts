import fs from "fs";

// not in use, keep for reference
export const getGCSProjectIdAsync = async (config: string): Promise<string> => {
  const data = await fs.promises.readFile(config).catch(e => {
    throw e;
  });
  const json = JSON.parse(data.toString("utf-8"));
  return json.project_id;
};

// not in use, keep for reference
export const readFilePromise = (path: string): Promise<Buffer> =>
  new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

/**
 * @param url
 * Parses a url string into fragments.
 * Urls must be formatted as: type://part1:part2?key1=value1&key2=value2")
 * If a url is provided, only type://part1 is mandatory.
 */
export const parseUrl = (url?: string): [string, string, string, { [key: string]: string }] => {
  if (url === "" || typeof url === "undefined") {
    return ["local", "", "local-bucket", {}];
  }
  const type = url.substring(0, url.indexOf("://"));
  let config = url.substring(url.indexOf("://") + 3);
  const questionMark = config.indexOf("?");
  const colon = config.indexOf(":");
  let part1 = "";
  let part2 = "";
  let options: { [key: string]: string } = {};
  let optionsString = "";
  if (questionMark !== -1) {
    optionsString = config.substring(questionMark + 1);
    config = config.substring(0, questionMark);
  }
  if (colon !== -1) {
    [part1, part2] = config.split(":");
  } else {
    part1 = config;
  }
  // console.log(config, optionsString);
  if (questionMark !== -1) {
    options = optionsString
      .split("&")
      .map(pair => pair.split("="))
      .reduce((acc, val) => {
        acc[val[0]] = val[1];
        return acc;
      }, {});
  }
  // console.log(type, part1, part2, options);
  return [type, part1, part2, options];
};
