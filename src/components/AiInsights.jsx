export default function AiInsights({ analysis }) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg">AI Insights</h2>
      <pre className="bg-gray-100 p-4 whitespace-pre-wrap text-sm">{analysis}</pre>
    </div>
  );
}