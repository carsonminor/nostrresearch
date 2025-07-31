import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
import { NIP19Page } from "./pages/NIP19Page";
import ResearchPaper from "./pages/ResearchPaper";
import SubmitPaper from "./pages/SubmitPaper";
import SearchResults from "./pages/SearchResults";
import StatsPage from "./pages/StatsPage";
import TopicPage from "./pages/TopicPage";
import TestPage from "./pages/TestPage";
import Debug from "./pages/Debug";
import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/submit" element={<SubmitPaper />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/topic/:topic" element={<TopicPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/paper/:pubkey/:dTag" element={<ResearchPaper />} />
        {/* NIP-19 route for npub1, note1, naddr1, nevent1, nprofile1 */}
        <Route path="/:nip19" element={<NIP19Page />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;