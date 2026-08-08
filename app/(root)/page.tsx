import { onBoardUser } from "@/modules/auth/actions";
import { HomeContent } from "@/modules/home/components/home-content";

export default async function Home() {
  await onBoardUser();
  return <HomeContent />;
}
