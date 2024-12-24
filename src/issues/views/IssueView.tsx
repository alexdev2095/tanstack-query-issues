import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks/useIssue';
import LoadingSpinner from '../../shared/components/LoadingSpinner';


export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const issuesNumber = Number(params.id ?? 0)
  const {issueQuery, commentsQuery } = useIssue(issuesNumber)

  if (issueQuery.isLoading) {
    return <div>Cargando</div>    
  }  

  if (!issueQuery.data) {
    return <Navigate to="/404"/>
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {
        commentsQuery.isLoading
        ? <LoadingSpinner/>
        : commentsQuery.data?.map(comment => (
          <IssueComment issue={comment}/>
        ))
      }

      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
