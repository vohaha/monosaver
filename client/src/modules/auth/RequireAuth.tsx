import { useQuery } from "react-query";
import { fetchVerify } from "../../api";
import { FullSizeLoader } from "../../components/loader";
import { Navigate, useLocation } from "react-router-dom";
import { ThwackResponse, ThwackResponseError } from "thwack";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const resp = useQuery<ThwackResponse, ThwackResponseError>(
    ["auth/verify"],
    fetchVerify
  );
  if (resp.isLoading) {
    return <FullSizeLoader />;
  }
  if (resp.error?.thwackResponse?.status === 401) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (resp.isError) {
    return (
      <div>
        <h1>{resp.error.message}</h1>
        <button
          type="button"
          onClick={() => {
            resp.refetch();
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  return children;
}
