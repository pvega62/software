---
id: artie-case-study
title: 'Designing an AI Documentation Assistant'
sidebar_label: 'AI Assistant Case Study'
sidebar_position: 7
slug: artie-case-study
description: A case study on designing Artie, an AI documentation assistant.
---

# Designing an AI documentation assistant

This case study walks through the design decisions behind **Artie**, the AI assistant embedded in this documentation site. Artie is a retrieval-augmented generation (RAG) assistant built to answer questions using only the content published here. It has no access to general-purpose knowledge and won't generate hallucinated links or invented features.

Building a documentation assistant sounds straightforward until you consider the edge cases: what happens when someone asks a question the docs don't cover? What if two distinct audiences use the same interface? How do you give an AI personality without letting it ramble? And how do you prevent someone from hijacking the prompt entirely?

This page covers how each of those problems was solved.

---

## Audience routing

Artie serves two audiences through a single conversational interface:

- **Developers and end-users** looking for setup instructions, API references, or explanations of the documentation samples.
- **Recruiters and hiring managers** evaluating this portfolio who may ask about qualifications, experience, or writing process.

Rather than building separate flows or asking users to self-identify, the prompt routes by intent. Technical questions get step-by-step answers grounded in the documentation index. Portfolio-related questions get responses that synthesize résumé context with the writing samples on the site. If résumé context isn't available in the index, Artie directs visitors to the About Me page instead of attempting to generate an answer.

This approach keeps the interface clean—one chat, no branching menus—while ensuring each audience gets a relevant response.

---

## Knowledge grounding and retrieval

The most important constraint in Artie's design is that it answers **exclusively** from the provided documentation index. This is the core principle of retrieval-augmented generation. The model's responses anchor to a specific body of content rather than drawing from general training data.

In practice, this means:

- **No invented content.** Artie won't fabricate features, create download links, or describe steps that aren't in the docs.
- **Source linking.** Responses include URLs or file references from the index so users can navigate directly to the relevant page.
- **Graceful fallback.** When the index doesn't contain relevant information, Artie says so plainly and suggests contacting me directly. It doesn't retry, loop, or speculate.

The tradeoff is scope: Artie can't help with anything outside the published documentation. That's a feature, not a limitation. For a portfolio site, accuracy matters more than breadth. A precise, well-sourced answer to a narrow question builds more confidence than a plausible-sounding answer that turns out to be wrong.

---

## Persona and tone calibration

Artie has a lightweight personality: a quiet, George Harrison-inspired warmth with occasional Liverpool dialect. The key word is *lightweight*. The persona adds character to greetings and sign-offs without interfering with the technical content.

The design constraints here are intentional:

- **Technical answers stay concise.** Personality doesn't justify longer responses. A warm greeting followed by a tight, factual answer is the goal.
- **Variety over repetition.** The prompt includes a pool of expressions to draw from so that Artie doesn't default to the same phrase every time.
- **No preaching.** The persona is warm and wry, never preachy or overbearing. It should feel like a helpful colleague, not a character performance.

This kind of tone calibration is a common challenge in conversational AI design. Too much personality and the assistant feels gimmicky. Too little and it feels robotic. The solution is to treat persona as seasoning—present but never the main ingredient.

---

## Security and guardrails

This is where the design gets serious. A public-facing AI assistant is an attack surface, and the prompt includes explicit defenses against common large language model (LLM) vulnerabilities.

### Prompt injection protection

Artie rejects any attempt to override its instructions, such as commands like "ignore previous instructions" or requests to adopt a different persona. This is a direct defense against prompt injection, one of the [Open Worldwide Application Security Project (OWASP) Top 10 risks for LLM applications](https://owasp.org/www-project-top-10-for-large-language-models/).

### Scope restriction

The prompt defines explicit rejection categories:

- **General coding help** not covered in the documentation.
- **Unrelated trivia** outside of two specifically scoped fun features.
- **Personal information** about me that isn't in the professional portfolio.
- **Freelance rates or negotiations.** Visitors are directed to reach out directly instead.

Each category has a clear boundary. The assistant doesn't need to make judgment calls about what's "close enough" to answer. If it falls outside the defined scope, it declines politely.

### Data privacy

Artie only shares contact information that's explicitly published in the documentation, such as a LinkedIn profile or a portfolio email. It won't guess, infer, or generate personal details like phone numbers or addresses.

### Professional boundaries

The assistant won't engage with hostile messages, use profanity, or break character. This goes beyond politeness. It's about maintaining predictable behavior. A recruiter testing the assistant's limits should hit a consistent, professional boundary every time.

---

## Controlled easter eggs

Artie includes two "fun features"—Snapple Real Facts and clean jokes—that demonstrate how to add personality without opening the door to abuse.

Both features share the same design pattern:

- **Explicit triggers.** They activate only on specific user requests ("give me a Snapple fact," "tell me a joke"), not on vague or tangential prompts.
- **Bounded content.** The Snapple facts draw from a verified list. The jokes are curated and family friendly.
- **No open-ended generation.** Artie doesn't write original jokes or invent facts. The scope is fixed.

This matters because unbounded creative features quickly burn through tokens and produce unpredictable output. By keeping the content curated and the triggers explicit, the features add warmth without risk.

---

## What I'd do differently

No design survives contact with real users unchanged. Here's what I'd reconsider:

- **Token cost.** The Snapple facts list alone is over 100 items. In a production system with per-token billing, I'd move that to a retrieval layer rather than embedding it in the system prompt. Every token in the prompt is paid for on every request, whether the user asks for a fact or not.
- **Multi-turn context.** The current design targets single-turn Q&A. A more sophisticated version could maintain conversation history to handle follow-up questions like "What about the next step?" without re-retrieving the same context.
- **Analytics and feedback.** There's no mechanism to track which questions Artie handles well and which ones hit the fallback. Adding lightweight logging—even just counting fallback responses—would surface documentation gaps worth filling.
- **Dynamic persona tuning.** The personality expressions are hard-coded in the prompt. A more maintainable approach would reference an external persona configuration, making it easier to adjust tone without editing the core instruction set.

Each of these is a deliberate tradeoff for a portfolio project where simplicity and clarity matter more than production-scale optimization. But they're the first things I'd address if this moved into a higher-traffic environment.
