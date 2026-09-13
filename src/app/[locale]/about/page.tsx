import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crewgirl.online'
  const path = '/about'

  return {
    title: 'About Crew Girl Wiki - Your Ultimate Netflix Series Guide',
    description: 'Learn about Crew Girl Wiki, a fan-made resource hub providing episode recaps, cast profiles, character guides, and rowing details for the Netflix series Crew Girl.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Crew Girl Wiki',
      title: 'About Crew Girl Wiki',
      description: 'Learn about our mission to provide the best Crew Girl fan resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1280,
          height: 720,
          alt: 'Crew Girl Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Crew Girl Wiki',
      description: 'Learn about our mission to provide the best Crew Girl fan resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Crew Girl Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Crew Girl
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Crew Girl Wiki</h2>
            <p>
              Crew Girl Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping viewers explore the Netflix series "Crew Girl". We are a fan-run platform that provides episode recaps, cast profiles, character guides, rowing explainers, and release news to enhance your viewing experience.
            </p>
            <p>
              Whether you're a new viewer just starting the series or a longtime fan revisiting key moments,
              Crew Girl Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Crew Girl viewers with accurate, up-to-date information and useful guides</strong> that deepen their enjoyment of the show. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest series news, new episodes, and cast updates</li>
              <li><strong>Build useful tools:</strong> Develop guides, episode trackers, and watching orders that help viewers decide what to watch next</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can learn, share theories, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for fans everywhere</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Crew Girl Wiki as the <strong>go-to destination</strong> for every Crew Girl viewer looking to dive deeper into the show. We want to be the resource that fans trust and rely on, whether they need episode recaps, character profiles, or the latest release news.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📺</div>
              <h3 className="text-xl font-semibold text-white mb-2">Episode Guides</h3>
              <p className="text-slate-300">
                Recaps and guides for every episode of the season. Follow Teagan Tao's journey from her first race to the finale!
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Cast Profiles</h3>
              <p className="text-slate-300">
                Meet the actors behind Crew Girl, the roles they play, and where you have seen them before.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">Character Guide</h3>
              <p className="text-slate-300">
                Profiles of Teagan Tao, Cam Dillinger, and the Easton Prep crew — their relationships, rivalries, and story arcs.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🚣</div>
              <h3 className="text-xl font-semibold text-white mb-2">Rowing Explained</h3>
              <p className="text-slate-300">
                Plain-language explainers for the rowing terms, race formats, and crew positions featured in the show.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📰</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release News</h3>
              <p className="text-slate-300">
                Release dates, trailers, and official updates about Crew Girl on Netflix, all in one place.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in English, Spanish, Português (Brazil), and Français.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Crew Girl Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from fans of all kinds. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Fan feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New theories, hidden details, and Easter eggs shared by fans</li>
              <li><strong>Official updates:</strong> We monitor Netflix news and adjust our content accordingly</li>
              <li><strong>Fan discussions:</strong> We track viewer conversations and update guides based on real fan reactions</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you've spotted a rowing detail, have a theory about the ending, or have suggestions for new guides, we'd love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Crew Girl Wiki is maintained by a dedicated team of passionate viewers and writers who love Crew Girl as much as you do. We're fans first, constantly rewatching episodes, digging into cast interviews, and staying updated with the latest news.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Series analysis:</strong> Deep familiarity with Crew Girl's story and characters</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to fan feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Eight" – One crew, one stroke at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Crew Girl Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with, endorsed by, or associated with Netflix or the creators of Crew Girl or any official entities.
            </p>
            <p>
              All series content, trademarks, characters, and assets are the property of their respective owners. We use series-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Crew Girl Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@crewgirl.online" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@crewgirl.online
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@crewgirl.online" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@crewgirl.online
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@crewgirl.online" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@crewgirl.online
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@crewgirl.online" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@crewgirl.online
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, tips, and Crew Girl news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
