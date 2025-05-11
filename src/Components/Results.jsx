export default function Results({ keyword, category }) {
  return (
    <div className="mt-8 p-6 rounded-lg shadow bg-white text-center">
      {keyword ? (
        <div>
          <span className="font-medium text-gray-700">Search keyword:</span>{" "}
          <span className="font-bold text-purple-700">{keyword}</span>
        </div>
      ) : (
        <div>
          <span className="font-medium text-gray-700">Selected category:</span>{" "}
          <span className="font-bold text-purple-700">{category || "All"}</span>
        </div>
      )}
    </div>
  );
}
