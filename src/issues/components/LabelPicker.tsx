import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useLabels } from "../hooks/useLabels";

type Props ={
  selectedlabels: string[],
  onLabelSelected: (label: string) => void
}


export const LabelPicker: React.FC<Props> = ({selectedlabels, onLabelSelected}) => {
  const {labelsQuery} =useLabels()


  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h52"> <LoadingSpinner/> </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onLabelSelected(label.name)}
          className={
            `animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${selectedlabels.includes(label.name) ? 'selected-label' : ''}`}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
