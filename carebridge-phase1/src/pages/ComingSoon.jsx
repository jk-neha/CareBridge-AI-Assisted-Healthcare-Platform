import Card from "../components/common/Card";

// Temporary placeholder — replaced page by page as later phases are built.
export default function ComingSoon({ label }) {
  return (
    <Card className="text-center" padding="p-10">
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="mt-2 text-sm text-ink-muted">This page will be built in an upcoming phase.</p>
    </Card>
  );
}
