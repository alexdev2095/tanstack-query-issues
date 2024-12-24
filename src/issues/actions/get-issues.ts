import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";
import { GithubIssue, State } from "../types/issue";

export const getIssues = async (
  state: State,
  selectedLabels: string[],
  page: number
): Promise<GithubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (selectedLabels.length > 0) {
    params.append("labels", selectedLabels.join(","));
  }

  params.append("page", `${page}`);
  params.append("per_page", "5");

  const { data } = await githubApi.get<GithubIssue[]>("/issues", {
    params,
  });

  return data;
};
