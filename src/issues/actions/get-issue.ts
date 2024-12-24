import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../types/issue";

export const getIssue = async (issueNumber: number): Promise<GithubIssue> => {
  await sleep(1500);


  const { data } = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);

  return data;
};
