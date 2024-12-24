import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";
import { GithubLabel } from "../types/label";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  //   const resp = await fetch(
  //     "https://api.github.com/repos/facebook/react/labels"
  //   ).then((r) => r.json());
  // return resp;

  const { data } = await githubApi.get<GithubLabel[]>("/labels");

  return data;
};
