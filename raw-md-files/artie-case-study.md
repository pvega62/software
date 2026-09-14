---
id: artie-case-study
title: 'Designing Artie: An AI documentation assistant'
sidebar_label: 'Ask Artie AI Assistant Case Study'
sidebar_position: 7
slug: artie-case-study
description: A case study on designing Artie, an AI documentation assistant.
---

:::tip
Read the companion blog post for broader context: **[The technical writer and AI agents: What I learned while building Artie](/blog/building-artie)**. It explores retrieval-augmented generation and how this project fits into technical writing.
:::

This case study walks through the design decisions behind **Artie**, an AI documentation assistant built using Algolia and embedded in this documentation site. Artie is a retrieval-augmented generation (RAG) assistant built to answer questions using only the content published here. It has no access to general-purpose knowledge and won't generate hallucinated links or invented features.

Building a documentation assistant sounds straightforward until you consider the edge cases: what happens when someone asks a question the docs don't cover? What if two distinct audiences use the same interface? How do you give an AI personality without letting it ramble? And how do you prevent someone from hijacking the prompt entirely?

This page covers how each of those problems was solved.

---

## Audience routing

Artie serves two audiences through a single conversational interface:

- **Developers and end-users** looking for setup instructions, API references, or explanations of the documentation samples
- **Recruiters and hiring managers** evaluating this portfolio who may ask about qualifications, experience, or writing process

Rather than building separate flows or asking users to self-identify, the prompt routes by intent. Technical questions get step-by-step answers grounded in the documentation index. Portfolio-related questions get responses that synthesize résumé context with the writing samples on the site. If résumé context isn't available in the index, Artie directs visitors to the About Me page instead of attempting to generate an answer.

This approach keeps the interface clean—one chat, no branching menus—while ensuring each audience gets a relevant response.

---

## Knowledge grounding and retrieval

The most important constraint in Artie's design is that it answers **exclusively** from the documentation index powered by Algolia. This is the core principle of retrieval-augmented generation. The model's responses anchor to a specific body of content rather than drawing from general training data.

In practice, this means:

- **No invented content**—the assistant doesn't fabricate features, create download links, or describe steps that aren't in the docs.
- **Source linking**—the assistant provides URLs or file references from the index so users can navigate directly to the relevant page.
- **Graceful fallback**—when the index lacks relevant information, Artie states the limitation plainly and suggests contacting me directly without retrying, looping, or speculating.

The tradeoff is scope: Artie can't help with anything outside the published documentation. That's a feature, not a limitation. For a portfolio site, accuracy matters more than breadth. A precise, well-sourced answer to a narrow question builds more confidence than a plausible-sounding answer that turns out to be wrong.

---

## Persona and tone calibration

Artie has a lightweight personality: a quiet, George Harrison-inspired warmth with occasional Liverpool dialect. The key word is *lightweight*. The persona adds character to greetings and sign-offs without interfering with the technical content.

The design constraints here are intentional:

- **Technical answers stay concise**—personality never justifies longer responses. A warm greeting followed by a tight, factual answer achieves this goal.
- **Variety over repetition**—the prompt includes a pool of expressions so Artie avoids defaulting to the same phrase every time.
- **No preaching**—the persona maintains a warm, wry tone and never sounds preachy or overbearing, functioning like a helpful colleague rather than a character performance.

This kind of tone calibration is a common challenge in conversational AI design. Too much personality and the assistant feels gimmicky. Too little and it feels robotic. The solution is to treat persona as seasoning—present but never the main ingredient.

---

## Security and guardrails

This is where the design gets serious. A public-facing AI assistant is an attack surface, and the prompt includes explicit defenses against common large language model (LLM) vulnerabilities.

### Prompt injection protection

Artie rejects any attempt to override its instructions, such as commands like "ignore previous instructions" or requests to adopt a different persona. This defends directly against prompt injection, ranked #1 on the OWASP [Top 10 Risks for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-models/).

### Scope restriction

The prompt defines explicit rejection categories:

- **General coding help**—the assistant declines coding questions not covered in the documentation.
- **Unrelated trivia**—the assistant rejects requests outside of two specifically scoped fun features.
- **Personal information**—the assistant declines inquiries about personal details not published in the professional portfolio.
- **Freelance rates or negotiations**—the assistant directs visitors to reach out directly instead.

Each category has a clear boundary. The assistant doesn't need to make judgment calls about what's "close enough" to answer. If it falls outside the defined scope, it declines politely.

### Data privacy

Artie only shares contact information that's explicitly published in the documentation, such as a LinkedIn profile or a portfolio email. It won't guess, infer, or generate personal details like phone numbers or addresses.

### Professional boundaries

The assistant won't engage with hostile messages, use profanity, or break character. This goes beyond politeness. It's about maintaining predictable behavior. A recruiter testing the assistant's limits should hit a consistent, professional boundary every time.

---

## Controlled easter eggs

Artie includes two "fun features"—Snapple Real Facts and clean jokes—that demonstrate how to add personality without opening the door to abuse.

Both features share the same design pattern:

- **Explicit triggers**—they activate only on specific user requests ("give me a Snapple fact," "tell me a joke"), not on vague or tangential prompts.
- **Bounded content**—the Snapple facts draw from a verified list, while the jokes remain curated and family friendly.
- **No open-ended generation**—the assistant avoids writing original jokes or inventing facts, keeping the scope fixed.

This matters because unbounded creative features quickly burn through tokens and produce unpredictable output. By keeping the content curated and the triggers explicit, the features add warmth without risk.

---

## What I'd do differently

No design survives contact with real users unchanged. Here's what I'd reconsider:

- **Token cost**—the Snapple facts list alone exceeds 100 items. In a production system with per-token billing, I'd move that to a retrieval layer rather than embedding it in the system prompt. A team pays for every token in the prompt on every request, whether the user asks for a fact or not.
- **Multi-turn context**—the current design targets single-turn Q&A. A more sophisticated version could maintain conversation history to handle follow-up questions like "What about the next step?" without re-retrieving the same context.
- **Analytics and feedback**—no mechanism tracks which questions Artie handles well and which ones trigger the fallback. Adding lightweight logging—even just counting fallback responses—would surface documentation gaps worth filling.
- **Dynamic persona tuning**—the prompt hard-codes the personality expressions. A more maintainable approach would reference an external persona configuration, making it easier to adjust tone without editing the core instruction set.

Each of these is a deliberate tradeoff for a portfolio project where simplicity and clarity matter more than production-scale optimization. But they're the first things I'd address if this moved into a higher-traffic environment.
