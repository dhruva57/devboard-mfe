export const ErrorState = ({
  errorMsg,
  onRetry,
}: {
  errorMsg: string;
  onRetry: () => void;
}) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-red-700 common_color_error">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-red-600 common_color_error">{errorMsg}</p>
      <button
        type="button"
        onClick={onRetry}
        className="common_bg_error mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};
