"use client";

import { useState, Suspense, lazy } from "react";
import {
  Anchor,
  ArrowRight,
  BookOpen,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronDown,
  Clapperboard,
  Compass,
  Crosshair,
  Drama,
  Dumbbell,
  ExternalLink,
  EyeOff,
  Film,
  Flag,
  Flame,
  Handshake,
  Heart,
  HeartHandshake,
  Home,
  LifeBuoy,
  ListVideo,
  MessagesSquare,
  MonitorPlay,
  PlayCircle,
  Popcorn,
  Route,
  Sailboat,
  ScrollText,
  Search,
  Shell,
  Ship,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Tv,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

// 官方渠道链接（外部）
const NETFLIX_TITLE_URL = "https://www.netflix.com/title/81991578";
const NETFLIX_TUDUM_URL = "https://www.netflix.com/tudum/crew-girl";
const TRAILER_WATCH_URL = "https://www.youtube.com/watch?v=o2u0MtxjLsU";

// Tools Grid 卡片对应的模块 section ID（与下方 8 个模块一一对应）
const MODULE_SECTION_IDS = [
  "crew-girl-cast",
  "crew-girl-watch-online",
  "crew-girl-episodes",
  "crew-girl-plot",
  "crew-girl-ending-explained",
  "crew-girl-characters",
  "crew-girl-trailer",
  "crew-girl-rowing-guide",
];

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://crewgirl.online";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Crew Girl Wiki",
        description:
          "Crew Girl Wiki covers episodes, cast, characters, plot explained, rowing details, and release news for Netflix's teen rowing drama series.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Crew Girl - Netflix Teen Rowing Drama",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Crew Girl Wiki",
        alternateName: "Crew Girl Wiki Team",
        url: siteUrl,
        description:
          "Fan-made Crew Girl Wiki resource hub for episode recaps, cast and character guides, rowing details, and release news",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          caption: "Crew Girl Wiki - Netflix Teen Rowing Drama",
        },
        sameAs: [
          "https://www.netflix.com/title/81991578",
          "https://www.netflix.com/tudum/crew-girl",
          "https://media.netflix.com/en/only-on-netflix/81991578",
          "https://www.youtube.com/watch?v=ocTpTujngeM",
        ],
      },
      {
        "@type": "TVSeries",
        name: "Crew Girl",
        description:
          "Netflix's teen rowing drama about Teagan Tao, an elite young sculler who joins an all-boys prep-school crew team after a family scandal.",
        genre: ["Teen Drama", "Sports Drama", "Coming of Age"],
        numberOfEpisodes: 8,
        datePublished: "2026-09-10",
        url: "https://www.netflix.com/title/81991578",
      },
      {
        "@type": "VideoObject",
        name: "Crew Girl | Official Trailer | Miku Martineau | Sep 10 | Netflix",
        description:
          "Official trailer for Crew Girl, Netflix's teen rowing drama about Teagan Tao, an elite young sculler who joins an all-boys prep-school crew team after a family scandal.",
        uploadDate: "2026-06-16",
        thumbnailUrl: "https://i.ytimg.com/vi/ocTpTujngeM/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/ocTpTujngeM",
        url: "https://www.youtube.com/watch?v=ocTpTujngeM",
      },
    ],
  };

  // FAQ accordion states
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [episodeExpanded, setEpisodeExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside> */}

      {/* 右侧广告容器 - Fixed 定位 */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside> */}

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("crew-girl-cast")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getEpisodeGuidesCTA}
              </button>
              <a
                href={NETFLIX_TITLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.watchOnNetflixCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后（容器宽度上限 max-w-5xl） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="ocTpTujngeM"
              title="Crew Girl | Official Trailer | Miku Martineau | Sep 10 | Netflix"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（位于视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = MODULE_SECTION_IDS[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section - 紧接 Tools Grid 之下 */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Crew Girl Cast */}
      <section id="crew-girl-cast" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlCast.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlCast"]}
                locale={locale}
              >
                {t.modules.crewGirlCast.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlCast.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.crewGirlCast.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors text-center"
                >
                  <div className="mb-4 h-12 w-12 mx-auto rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                    {[
                      <Star
                        key="cast-icon-0"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <Heart
                        key="cast-icon-1"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <Swords
                        key="cast-icon-2"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                    ][index]}
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`crewGirlCast::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.name}
                    </LinkedTitle>
                  </h3>
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))] mb-3">
                    {item.role}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Crew Girl Watch Online */}
      <section
        id="crew-girl-watch-online"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlWatchOnline.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlWatchOnline"]}
                locale={locale}
              >
                {t.modules.crewGirlWatchOnline.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlWatchOnline.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.crewGirlWatchOnline.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    {[
                      <Tv
                        key="watch-icon-0"
                        className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <Search
                        key="watch-icon-1"
                        className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <PlayCircle
                        key="watch-icon-2"
                        className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                    ][index]}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `crewGirlWatchOnline::steps::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {step.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="scroll-reveal text-center">
            <a
              href={NETFLIX_TITLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                         bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                         text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
            >
              {t.modules.crewGirlWatchOnline.watchCta}
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Module 3: Crew Girl Episodes */}
      <section id="crew-girl-episodes" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlEpisodes.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlEpisodes"]}
                locale={locale}
              >
                {t.modules.crewGirlEpisodes.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlEpisodes.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-2">
            {t.modules.crewGirlEpisodes.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() =>
                      setEpisodeExpanded(
                        episodeExpanded === index ? null : index,
                      )
                    }
                    className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-3 flex-wrap">
                      {[
                        <CalendarDays
                          key="ep-icon-0"
                          className="w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <ScrollText
                          key="ep-icon-1"
                          className="w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <EyeOff
                          key="ep-icon-2"
                          className="w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]"
                        />,
                      ][index]}
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))] uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="font-semibold">
                        <LinkedTitle
                          linkData={
                            moduleLinkMap[`crewGirlEpisodes::items::${index}`]
                          }
                          locale={locale}
                        >
                          {item.title}
                        </LinkedTitle>
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${episodeExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {episodeExpanded === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm">
                        {item.content}
                      </p>
                      {item.spoiler && (
                        <span className="inline-flex items-center gap-1.5 mt-3 text-xs px-2 py-1 rounded-full bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.3)] text-[hsl(var(--destructive))]">
                          <EyeOff className="w-3.5 h-3.5" />
                          Contains spoilers
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 4: Crew Girl Plot */}
      <section
        id="crew-girl-plot"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlPlot.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlPlot"]}
                locale={locale}
              >
                {t.modules.crewGirlPlot.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlPlot.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.crewGirlPlot.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="mb-4 h-11 w-11 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    {[
                      <Compass
                        key="plot-icon-0"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <Sailboat
                        key="plot-icon-1"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <HeartHandshake
                        key="plot-icon-2"
                        className="h-6 w-6 text-[hsl(var(--nav-theme-light))]"
                      />,
                    ][index]}
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`crewGirlPlot::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: Crew Girl Ending Explained */}
      <section
        id="crew-girl-ending-explained"
        className="scroll-mt-24 px-4 py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlEndingExplained.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlEndingExplained"]}
                locale={locale}
              >
                {t.modules.crewGirlEndingExplained.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlEndingExplained.intro}
            </p>
          </div>

          <div className="scroll-reveal mb-8 p-4 md:p-5 bg-[hsl(var(--destructive)/0.08)] border border-[hsl(var(--destructive)/0.3)] rounded-xl flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-[hsl(var(--destructive))] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[hsl(var(--destructive))] font-medium">
              {t.modules.crewGirlEndingExplained.spoilerNotice}
            </p>
          </div>

          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6">
            {t.modules.crewGirlEndingExplained.steps.map(
              (step: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                  <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)]">
                        {[
                          <Trophy
                            key="end-icon-0"
                            className="h-4 w-4 text-[hsl(var(--nav-theme-light))]"
                          />,
                          <Handshake
                            key="end-icon-1"
                            className="h-4 w-4 text-[hsl(var(--nav-theme-light))]"
                          />,
                          <MessagesSquare
                            key="end-icon-2"
                            className="h-4 w-4 text-[hsl(var(--nav-theme-light))]"
                          />,
                          <Home
                            key="end-icon-3"
                            className="h-4 w-4 text-[hsl(var(--nav-theme-light))]"
                          />,
                        ][index]}
                      </div>
                      <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))] uppercase tracking-wider">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1.5">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[
                            `crewGirlEndingExplained::steps::${index}`
                          ]
                        }
                        locale={locale}
                      >
                        {step.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 6: Crew Girl Characters */}
      <section
        id="crew-girl-characters"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlCharacters.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlCharacters"]}
                locale={locale}
              >
                {t.modules.crewGirlCharacters.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlCharacters.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.crewGirlCharacters.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                      {[
                        <Anchor
                          key="char-icon-0"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <Flame
                          key="char-icon-1"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <Zap
                          key="char-icon-2"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <LifeBuoy
                          key="char-icon-3"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <Shell
                          key="char-icon-4"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <Dumbbell
                          key="char-icon-5"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                        <Route
                          key="char-icon-6"
                          className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                        />,
                      ][index]}
                    </div>
                    <div>
                      <h3 className="font-bold">
                        <LinkedTitle
                          linkData={
                            moduleLinkMap[
                              `crewGirlCharacters::items::${index}`
                            ]
                          }
                          locale={locale}
                        >
                          {item.name}
                        </LinkedTitle>
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.role}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.connections.map((c: string, ci: number) => (
                      <span
                        key={ci}
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                      >
                        <Check className="w-3 h-3 text-[hsl(var(--nav-theme-light))]" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 7: Crew Girl Trailer */}
      <section id="crew-girl-trailer" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.crewGirlTrailer.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlTrailer"]}
                locale={locale}
              >
                {t.modules.crewGirlTrailer.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlTrailer.intro}
            </p>
          </div>

          {/* Featured video card */}
          <a
            href={TRAILER_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="scroll-reveal group relative block overflow-hidden rounded-2xl border border-border mb-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.ytimg.com/vi/o2u0MtxjLsU/hqdefault.jpg"
              alt={t.modules.crewGirlTrailer.videoTitle}
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] shadow-lg transition-transform group-hover:scale-110">
                <PlayCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <span className="text-left">
                <span className="flex items-center gap-2 text-white font-bold text-base md:text-lg">
                  <Film className="h-5 w-5" />
                  {t.modules.crewGirlTrailer.videoTitle}
                </span>
                <span className="block text-sm text-white/80 mt-1">
                  {t.modules.crewGirlTrailer.videoDescription}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white">
                {t.modules.crewGirlTrailer.watchCta}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </span>
          </a>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.crewGirlTrailer.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="mb-3 h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    {[
                      <Popcorn
                        key="trailer-icon-0"
                        className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <Crosshair
                        key="trailer-icon-1"
                        className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                      />,
                      <CalendarClock
                        key="trailer-icon-2"
                        className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                      />,
                    ][index]}
                  </div>
                  <h3 className="font-bold mb-2">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`crewGirlTrailer::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 8: Crew Girl Rowing Guide */}
      <section
        id="crew-girl-rowing-guide"
        className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Ship className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
              <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[hsl(var(--nav-theme-light))]">
                {t.modules.crewGirlRowingGuide.eyebrow}
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["crewGirlRowingGuide"]}
                locale={locale}
              >
                {t.modules.crewGirlRowingGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.crewGirlRowingGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border">
                  <th className="px-4 py-3 font-semibold">
                    {t.modules.crewGirlRowingGuide.headers.term}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t.modules.crewGirlRowingGuide.headers.meaning}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t.modules.crewGirlRowingGuide.headers.onTheWater}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t.modules.crewGirlRowingGuide.headers.inTheStory}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.modules.crewGirlRowingGuide.terms.map(
                  (row: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-border last:border-b-0 bg-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold align-top">
                        <LinkedTitle
                          linkData={
                            moduleLinkMap[
                              `crewGirlRowingGuide::terms::${index}`
                            ]
                          }
                          locale={locale}
                        >
                          {row.term}
                        </LinkedTitle>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {row.meaning}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {row.onTheWater}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {row.inTheStory}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={NETFLIX_TITLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.netflix}
                  </a>
                </li>
                <li>
                  <a
                    href={NETFLIX_TUDUM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.tudum}
                  </a>
                </li>
                <li>
                  <a
                    href="https://media.netflix.com/en/only-on-netflix/81991578"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.mediaCenter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=ocTpTujngeM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.trailer}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
