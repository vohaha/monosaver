import { fetchLogout } from "../../../api";
import { useMutation } from "react-query";
import { useEffect } from "react";

export default function SettingsPage() {
  const { mutate, isSuccess } = useMutation(fetchLogout);
  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/login";
    }
  }, [isSuccess]);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          mutate();
        }}
      >
        Вийти
      </button>
    </div>
  );
}
