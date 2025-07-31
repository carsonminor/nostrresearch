NIP-XX
======

Scientific Research Papers
---------------------------

`draft` `optional`

This NIP defines extensions to NIP-23 `kind:30023` for scientific research papers with embedded comments and zap-based validation.

## Research Paper Event (kind 30023 + Research Tags)

A research paper uses the standard NIP-23 long-form content format with additional research-specific tags for scientific metadata and community validation.

### Format

The `.content` field MUST contain the research paper in Markdown format following the same rules as NIP-23 long-form content:

- MUST NOT hard line-break paragraphs of text
- MUST NOT support adding HTML to Markdown

### Required Tags (NIP-23 Base)

- `d` - Unique identifier for the paper (required for addressable events)
- `title` - The paper title
- `summary` - Brief summary of the research (NIP-23 standard)
- `published_at` - Unix timestamp when first published
- `t` - Must include "research", "science", or "academic" to identify as research content

### Research-Specific Tags (Extensions)

- `authors` - Comma-separated list of author names (anonymized for 3 months)
- `keywords` - Research keywords for discoverability
- `t` - Additional topic tags (e.g. "physics", "biology", "computer-science")

### Optional Tags

- `doi` - Digital Object Identifier if available
- `keywords` - Comma-separated research keywords
- `funding` - Funding source information
- `institution` - Research institution (anonymized for 3 months)
- `price` - Price in millisats to post to relay
- `zap_limit` - Maximum sats per zap (default: 10)

### Anonymity Period

Authors remain anonymous for 3 months after publication to prevent prestige bias. During this period:
- Author pubkeys are not revealed in client interfaces
- Institution information is hidden
- Only the research content and abstract are displayed

### Embedded Comments

Comments on research papers use NIP-22 `kind:1111` with special support for:
- Text selection anchoring using `selection` tags
- Zap-based ranking for comment visibility
- Anonymous commenting during the 3-month period

### Zap Validation

Research papers support zap-based validation with:
- Maximum zap limit per user (typically 10 sats)
- Aggregate zap statistics for quality assessment
- Direct author zapping for high-value contributions

## Example Event

```json
{
  "kind": 30023,
  "content": "# Quantum Computing Applications in Cryptography\n\n## Abstract\n\nThis paper explores...\n\n## Introduction\n\nQuantum computing represents...",
  "tags": [
    ["d", "quantum-crypto-2024-001"],
    ["title", "Quantum Computing Applications in Cryptography"],
    ["summary", "This paper explores the implications of quantum computing on modern cryptographic systems..."],
    ["published_at", "1704067200"],
    ["t", "research"],
    ["t", "science"],
    ["t", "quantum-computing"],
    ["t", "cryptography"],
    ["t", "computer-science"],
    ["authors", "Anonymous Researcher A, Anonymous Researcher B"],
    ["keywords", "quantum computing, cryptography, post-quantum, security"],
    ["zap_limit", "10"],
    ["price", "1000"]
  ],
  "pubkey": "...",
  "created_at": 1704067200,
  "id": "..."
}
```

## Embedded Comments with Text Selection

Comments can reference specific text selections within the paper:

```json
{
  "kind": 1111,
  "content": "This assumption may not hold in practice due to decoherence effects.",
  "tags": [
    ["A", "30023:pubkey:quantum-crypto-2024-001"],
    ["K", "30023"],
    ["P", "author_pubkey"],
    ["a", "30023:pubkey:quantum-crypto-2024-001"],
    ["k", "30023"],
    ["p", "author_pubkey"],
    ["selection", "start_char", "end_char", "selected_text"]
  ]
}
```

The `selection` tag format:
- `start_char`: Character position where selection starts
- `end_char`: Character position where selection ends
- `selected_text`: The actual selected text for validation

## Relay Requirements

Research-focused relays implementing this NIP SHOULD:
- Support standard NIP-23 long-form content
- Recognize research-specific tags for enhanced indexing
- Support pay-to-post functionality for research content
- Implement zap limits per user per paper
- Provide enhanced search across research metadata
- Support anonymous period enforcement for research papers
- Index papers by research topic tags and keywords