import "./index.css";

export function ErrorFallback({ reset }: { reset: () => void }) {
  return (
    <div className="error-fallback">
      Йой, щось сталося!
      <button onClick={reset}>Спробуй зараз</button>
    </div>
  );
}
