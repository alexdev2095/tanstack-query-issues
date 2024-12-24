 import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues";
import { State } from "../types/issue";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {

  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues",'infinite', { state, selectedLabels }],
    queryFn: ({pageParam, queryKey}) => {
      const [, , args] = queryKey;
      const {state, selectedLabels} = args as Props
      return getIssues(state, selectedLabels, pageParam)
    },
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, page) => lastPage.length > 0 ? page.length + 1 :undefined
  });

 


  return { issuesQuery};
};
