import "./index.css";

export function Loader() {
  return <div className="loader" />;
}

export function FullSizeLoader() {
  return (
    <div className="loader--full-size">
      <Loader />
    </div>
  );
}
