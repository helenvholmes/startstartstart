---
name: review
description: Review the case studies on someone's portfolio site the way a hiring manager reads them, using Brian Lovin's advice on presenting product design work — context up front, the problem before the solution, constraints and tradeoffs, explored and rejected options, real artifacts, outcomes tied back to the problem, what was learned, and honest credit — then fix only what they choose. Use this whenever someone asks to review, critique, or get feedback on their portfolio, case studies, or project write-ups, asks "is my portfolio good?" or "would this get me hired?", or has just finished adding real case studies to a site built with the start skill.
---

# Review

Read each case study on the person's site the way a hiring manager or client would, and tell them, briefly, what will land and what to change. The goal is case studies that show how they think, not just what they made.

The checklist comes from Brian Lovin's [How to give a great product design portfolio presentation](https://brianlovin.com/writing/how-to-give-a-great-product-design-portfolio-presentation). It's written for live presentations, but the same story is what makes a written case study work. Mention the article once, so they can read it themselves.

## How to work

- **Their words are theirs.** Point out what's missing or unclear and suggest how to fix it; don't rewrite their case studies unless they ask. When you suggest wording, offer it as a draft for them to change.
- **Keep it short.** For each case study: what's working (one line), and the two or three changes that would help most, each in a sentence. Don't list every checklist item; pick what matters.
- **Be specific.** "Add the constraint you mentioned in the meeting notes: one engineer, two weeks" beats "add more context". Quote the line you mean.
- **Real content only.** Review the case studies they've written. If a project is still placeholder text, skip it and say so.
- **Don't invent outcomes.** If a number, quote or result is missing, ask whether they have one; never make one up or suggest a plausible-sounding figure.

## 1. Find the case studies

Read every case study page in the project (the content files, not just the rendered site), and look at the site too, so you see the images and how each one reads. Ask, as a question card if you have one: **What are you going for?** Getting hired · Getting contracting work. A hiring manager and a client read the same story with different questions: a hiring manager wants to see how they think and work with a team, a client wants to see results like theirs.

## 2. Check each one against the story

A strong case study tells a story: who you are and where you worked, the problem, what stood in the way, what you tried, what shipped, and what happened. Check for:

1. **Context up front.** Who they are, the company or client, the team, and their role. Readers don't know the organization; a sentence or two saves them guessing.
2. **The problem before the solution.** Does it open with "we wanted to improve X, so we made Y"? That skips the design process. It should show how they found and prioritized the problem, which says more about them than the finished screens.
3. **Constraints and tradeoffs.** Time, team size, bad data, a design system missing what they needed, a new platform, regulations. At least one specific tradeoff they made, and why.
4. **Exploration.** Several directions, how they were tested, and which were rejected and why. Ideas that didn't work are a strength here, not a weakness: they show breadth instead of fixating on the first idea.
5. **Artifacts from each phase.** Sketches, early wireframes, prototypes, research notes, each with a line on what it taught them and how feedback shaped the next round. Not just final mockups.
6. **The real product.** The shipped thing, or screenshots and screen recordings of what customers actually used. If it never shipped or is private, high-fidelity prototypes or recordings with realistic data; never lorem ipsum. For senior roles, readers will compare against what actually shipped, so it should show how they drove decisions to get it out.
7. **Outcomes, tied back to the problem.** A direct answer to "did it work?", then the evidence: numbers, charts, customer quotes, and how the results shaped what came next.
8. **What they learned.** What worked, what didn't, and how the team regrouped if something failed. Bonus: what they'd try next, or with unlimited time.
9. **Honest credit.** What they did themselves, what the team did, and praise for collaborators. Readers trust a clear "I did this, the team did that" more than "I did everything".

If they worked at an agency and never saw results after handoff, that's fine: the case study should say so plainly, so readers don't assume they skipped the outcome.

Across the whole site, also check: are the strongest one or two case studies first? Is each one short enough to skim, with the story readable from the headings and images alone?

## 3. Report

Give the review in chat, one short block per case study, strongest first:

- **Case study name**: what's working, in one line
- The two or three changes that would help most, each with the line or section it's about

Then ask which to work on, as a question card if you can (list the changes, let them pick several). For each one they choose:

- If it needs facts only they have (an outcome, a constraint, who did what), ask for them in plain text, one at a time.
- Draft the change, show it, and apply it once they're happy. One change per commit, so any can be undone.
- With the dev server running, they can see each change as it lands.

## Don't

- Rewrite their story in your voice, or change what they say happened.
- Invent numbers, quotes or results, or round up vague ones.
- Pad the review: no general portfolio advice, no repeating the checklist back.
