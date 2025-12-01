import RecommendedFeedView from "@/app/(edu)/components/feed/RecommendedFeedView";
import { HOME_VIDEOS } from "@/app/data/content";

export default function HomePage() {
  return <RecommendedFeedView videos={HOME_VIDEOS} />;
}


