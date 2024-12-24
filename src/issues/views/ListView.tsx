import { useState } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../types/issue";

export const ListView = () => {
  const [selectedState, setSelectedState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery, page, nextPage, previousPage } = useIssues({
    state: selectedState,
    selectedLabels: selectedLabels,
  });

  const issues = issuesQuery.data ?? [];

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <IssueList
              issues={issues}
              onStateChange={setSelectedState}
              state={selectedState}
            />

            <div className="flex justify-between items-center">
              <button onClick={previousPage} className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                Anterior
              </button>
              <span>{page}</span>
              <button onClick={nextPage} className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedlabels={selectedLabels}
        />
      </div>
    </div>
  );
};
