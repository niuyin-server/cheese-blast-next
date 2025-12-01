import EduLayout from "@/components/edu/EduLayout";
import RecommendedFeedView from "@/components/edu/feed/RecommendedFeedView";
import { HOME_VIDEOS } from "@/app/data/content";

export default function Home() {
  return (
    <EduLayout>
      <RecommendedFeedView videos={HOME_VIDEOS} />
    </EduLayout>
  );
}
