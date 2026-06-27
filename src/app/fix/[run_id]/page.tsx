import PitchPage from "@/views/PitchPage";
import { buildMetadata } from "@/lib/metadata";
import { getRoute } from "@/lib/route-registry";

type FixRouteProps = {
  params: Promise<{ run_id: string }>;
};

export async function generateMetadata({ params }: FixRouteProps) {
  const { run_id } = await params;
  return buildMetadata(getRoute("fix"), `/fix/${run_id}/`);
}

export default async function FixRoute({ params }: FixRouteProps) {
  const { run_id } = await params;
  return <PitchPage runId={run_id} />;
}
