import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { MeetAndreaPage } from "./pages/MeetAndreaPage";

// Lazy load less frequently accessed pages
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const CommonMistakes = lazy(() => import("./pages/blog/CommonMistakes"));
const EssentialTips = lazy(() => import("./pages/blog/EssentialTips"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/meet-andrea" element={<MeetAndreaPage />} />
            <Route path="/blog" element={
              <Suspense fallback={<LoadingSpinner />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="/blog/common-mistakes-german-learners" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CommonMistakes />
              </Suspense>
            } />
            <Route path="/blog/essential-tips-learning-german" element={
              <Suspense fallback={<LoadingSpinner />}>
                <EssentialTips />
              </Suspense>
            } />
            <Route path="/privacy-policy" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PrivacyPolicyPage />
              </Suspense>
            } />
            <Route path="/terms-of-service" element={
              <Suspense fallback={<LoadingSpinner />}>
                <TermsOfServicePage />
              </Suspense>
            } />
            <Route path="/faq" element={
              <Suspense fallback={<LoadingSpinner />}>
                <FAQPage />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFoundPage />
              </Suspense>
            } />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}