# NostrResearch - Decentralized Scientific Publishing

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/nostrresearch)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nostrresearch)

A decentralized platform for scientific research publishing built on the Nostr protocol, featuring peer review, zap validation, and anonymous evaluation.

🌐 **[Live Demo](https://your-username.github.io/nostrresearch)** | 📖 **[Documentation](./DEPLOYMENT.md)** | 🚀 **[Launch Strategy](./LAUNCH_STRATEGY.md)**

## Features

### 🔬 Scientific Publishing
- **Research Papers**: Publish papers using custom kind 38297 with full metadata
- **Anonymous Period**: 3-month anonymous evaluation to prevent bias
- **Markdown Support**: Full paper content in Markdown format
- **DOI Integration**: Support for Digital Object Identifiers

### 💬 Peer Review System
- **Embedded Comments**: Comment on specific text selections within papers
- **Public Review**: All peer review discussions are transparent
- **Threaded Discussions**: Full comment threading with NIP-22 support
- **Anonymous Reviewers**: Reviewers remain anonymous during evaluation period

### ⚡ Zap Validation
- **Democratic Validation**: Limited zaps (10 sats max) ensure fair evaluation
- **Quality Metrics**: Papers ranked by community validation
- **Lightning Payments**: Direct author support via Lightning Network
- **Spam Prevention**: Pay-to-post model prevents low-quality submissions

### 🌐 Decentralized Infrastructure
- **Nostr Protocol**: Censorship-resistant publishing on distributed relays
- **No Gatekeepers**: Direct researcher-to-researcher communication
- **Global Access**: Free reading access to all research papers
- **Permanent Archive**: Research preserved across multiple relays

## Technology Stack

- **React 18.x** - Modern UI framework with hooks and concurrent rendering
- **TypeScript** - Type-safe development
- **TailwindCSS 3.x** - Utility-first styling with custom research theme
- **Nostrify** - Nostr protocol integration for web
- **shadcn/ui** - Accessible component library
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Vite** - Fast build tool and development server

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Platform Features

### Research Paper Submission
- Submit papers with full metadata (title, abstract, authors, keywords)
- Select research topics and categories
- Anonymous publication with 3-month reveal period
- Pay-to-post spam prevention

### Discovery and Search
- Browse papers by research topic
- Full-text search across papers
- Filter by most zapped, recent, or discussed
- Topic-based categorization

### Peer Review
- Comment on entire papers or specific text selections
- Embedded comments linked to exact text positions
- Zap valuable comments to promote quality feedback
- Anonymous reviewer identities during evaluation period

### Community Validation
- Zap papers to validate research quality
- Limited zap amounts ensure democratic evaluation
- View aggregate statistics and metrics
- Support researchers directly via Lightning

## Custom Nostr Implementation

This platform implements several custom Nostr features:

### Kind 38297 - Research Papers
Addressable events for scientific papers with required tags:
- `d` - Unique paper identifier
- `title` - Paper title
- `abstract` - Research summary
- `authors` - Author list (anonymized)
- `published_at` - Publication timestamp
- `t` - Topic tags for categorization

### Embedded Comments
NIP-22 comments with text selection support:
- `selection` tag with character positions
- Links comments to specific paper sections
- Enables precise feedback and discussion

### Anonymous Period Enforcement
- 3-month anonymity for bias prevention
- Author reveal after evaluation period
- Merit-based research assessment

## Project Structure

```
src/
├── components/
│   ├── research/           # Research-specific components
│   │   ├── ResearchFeed.tsx
│   │   ├── ResearchPaperCard.tsx
│   │   ├── ResearchPaperView.tsx
│   │   ├── SubmitPaperForm.tsx
│   │   ├── ZapButton.tsx
│   │   └── EmbeddedComments.tsx
│   ├── auth/              # Authentication components
│   ├── comments/          # Comment system
│   └── ui/                # shadcn/ui components
├── hooks/
│   ├── useResearchPapers.ts
│   ├── useZapStats.ts
│   ├── useCommentCount.ts
│   └── ...                # Other Nostr hooks
├── pages/
│   ├── Index.tsx          # Research feed homepage
│   ├── ResearchPaper.tsx  # Individual paper view
│   ├── SubmitPaper.tsx    # Paper submission
│   ├── SearchResults.tsx  # Search functionality
│   ├── StatsPage.tsx      # Platform statistics
│   └── TopicPage.tsx      # Topic-based browsing
└── lib/                   # Utilities and helpers
```

## Research Topics

The platform supports categorization across major research areas:
- Physics
- Computer Science
- Biology
- Mathematics
- Chemistry
- Medicine
- Engineering
- Economics
- Psychology
- Neuroscience
- And more...

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Run tests: `npm test`
5. Submit a pull request

## Roadmap

- [ ] Advanced search with filters
- [ ] Citation tracking and metrics
- [ ] Research collaboration tools
- [ ] Integration with existing academic databases
- [ ] Mobile app development
- [ ] Multi-language support

## License

MIT License - see LICENSE file for details

---

**Vibed with [MKStack](https://soapbox.pub/mkstack)**