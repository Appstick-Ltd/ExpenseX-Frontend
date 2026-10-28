# ExpenseX AI — Product Knowledge Base
**Purpose:** Reusable context document for onboarding another AI assistant, developer, marketer, support agent, or product collaborator.

**Last updated:** 28 October 2026  
**Product website:** https://expensexai.com/  
**Known product name:** ExpenseX AI  
**Positioning/tagline used:** “Your AI Money Assistant”  
**Important status note:** The user confirmed on 26 October 2026 that ExpenseX AI is already published/live on Google Play. The user also wants marketing copy to mention both Google Play and the Apple App Store where applicable. Verify current App Store availability before making a factual public claim.

---

## 1. Instructions for an AI using this knowledge base

1. Treat this file as project context, not as proof that every feature listed is currently implemented.
2. Distinguish **confirmed by the user**, **previously discussed/proposed**, and **needs verification**.
3. Never invent product capabilities, metrics, supported banks, payment providers, privacy guarantees, integrations, or store status.
4. For financial data, preserve the original transaction currency and amount. Do not silently treat all amounts as the app's display currency.
5. When parsing transaction SMS or email, distinguish transaction amount from available balance, fees, VAT, cashback, transfer amount, and installment/loan amounts.
6. Do not infer that an SMS permission is policy-approved merely because the app has an expense-tracking use case. Google Play approval is subject to review and the app must meet the current policy.
7. Marketing must not say “Coming Soon” unless the user explicitly asks for a teaser for a genuinely unreleased feature/product. The product itself was confirmed live on Google Play in October 2026.
8. Use clear, professional English or Bangla depending on the user’s request. The user commonly communicates in Bangla/Banglish and often wants polished English for public-facing content.
9. Ask a concise clarification when an implementation detail is necessary and not known. Do not present old proposals as current implementation.
10. Never promise that a Play Store or App Store submission will be approved.

---

## 2. Product overview

ExpenseX AI is a personal finance and money-management app intended to help users record, organize, and understand income and expenses with AI assistance.

### Product positioning
- Product: **ExpenseX AI**
- Descriptive positioning: **AI Money Assistant**
- Previously considered Play Store title: “ExpenseX AI: Money Manager”
- Website: https://expensexai.com/
- Main problem: People often struggle to record everyday spending consistently and understand where their money goes.
- Product promise: Make tracking income, expenses, budgets, and financial activity easier through AI-assisted input and analysis.

### Target users (reasonable positioning, not a verified demographic study)
- People who want to track personal income and expenses.
- Users who want to record transactions from receipts or natural-language/voice input.
- Users who want spending summaries, budgets, and savings-goal support.
- Users who receive financial transaction alerts by SMS and want supported transactions captured automatically, subject to device/platform and store-policy limitations.

### Product goals
- Reduce manual expense-entry effort.
- Help users keep income and expense records organized.
- Convert receipts or bills into structured transaction data.
- Support voice-based transaction entry.
- Provide useful spending insights and budgeting assistance.
- Help users work toward savings goals.

### Feature certainty
The product has been described across planning, implementation, and marketing discussions. Before asserting that any specific feature is live, verify it in the current app/build:
- Expense/income tracking: core product function.
- AI-assisted receipt/image OCR: discussed and prompt/schema designed.
- Voice input / speech-to-text: discussed and marketed as a feature; verify current implementation.
- SMS transaction detection: the user has declared `READ_SMS` and `RECEIVE_SMS` in Google Play Console; actual behavior must be verified in the current app.
- Email transaction parsing: discussed as a requirement alongside SMS; verify implementation.
- Budgets, savings goals, spending insights, conversational AI: part of product concept and marketing; verify exact live scope.
- Super-admin dashboard: requested as a design/project need; not evidence that a production dashboard exists.

---

## 3. Main feature areas

### 3.1 Income and expense tracking
The app is intended to help users record:
- Income/earnings.
- Expenses/spending.
- Transaction amount.
- Transaction date.
- Category.
- Payment method, where available.
- Merchant/payee or transaction title, where available.
- Optional supporting receipt or source message, depending on implementation.

AI should not fabricate missing transaction values. If the source is ambiguous, return a low confidence value or ask the user to confirm.

### 3.2 Receipt, bill, and invoice scanning (OCR/AI extraction)
A detailed extraction prompt/schema was previously developed. The discussed output fields include:
- `title`
- `categoryName`
- `mode` — `expense` or `earning`
- `amount`
- `totalAmount`
- `dueAmount`
- `transactionDate`
- `customerName`
- `customerPhone`
- `paymentMethod`
- `confidence`

The previous prompt concept also supported:
- Multiple receipts / multiple extracted items in an array.
- A user asking a question about the document/image (previously described as a “Query” capability).
- Validation of arithmetic where possible, including subtotal, tax/VAT, discounts, and total.
- Compact output and raw JSON only when the app expects machine-readable output.
- Missing dates should be handled carefully; a previous optimization proposal was to omit `nowIso` from the model prompt and fill a missing date on the Flutter side. This is a proposal, not a verified final implementation.

#### OCR extraction rules for the next AI
- Do not assume the largest number is always the transaction amount.
- Prefer the explicit grand total/amount paid for a completed purchase.
- Keep due amount separate from total amount.
- Do not classify a bill's total as paid if the document says unpaid/due.
- Identify tax/VAT, discounts, tips, delivery charges, and service fees separately if the schema supports them.
- Do not invent a date, merchant, phone number, or payment method.
- If the document has several totals (subtotal, VAT, discount, paid, due), interpret their labels and arithmetic together.
- Do not make up a category if evidence is insufficient; use the app's fallback category if one is defined.
- Confidence should reflect source clarity, not the model's general certainty.

### 3.3 Categories previously discussed
These category names appeared in a previous OCR schema/prompt:
- Food & Dining
- Groceries
- Shopping
- Transportation
- Utilities
- Healthcare
- Entertainment
- Education
- Travel
- Personal Care
- Salary
- Investment
- Freelance
- Other

This is a previously discussed list; confirm it against the current app's category IDs/names before returning a category to an API or saving it to the database. Expense and income categories may need separate validation.

### 3.4 Voice-based transaction entry
Voice was discussed as a product feature and promotional differentiator. The goal is for a user to speak a transaction or money-related request rather than type it.

Potential flow discussed:
1. Capture audio in the app.
2. Convert speech to text using a speech-to-text model/service.
3. Interpret the transcript and extract structured transaction data.
4. Validate fields and show the result for confirmation if necessary.
5. Save the transaction only after required validation/confirmation.

Technologies discussed:
- Whisper / `whisper.cpp`.
- Gemini Flash-family models (various model versions were considered in earlier cost discussions; check current provider model names/prices before implementation).

A previous architecture idea was a two-stage flow:
- Mobile app: image/audio to text or OCR/transcription.
- Backend: send text to a model for structured JSON extraction, then validate and store it.
This was a proposal, not proof of current architecture.

Security note: Do not embed privileged provider API keys in the mobile app. Prefer a backend or an appropriately secured proxy and enforce user-specific limits.

### 3.5 SMS transaction tracking (Android)
The user’s intended feature: detect financial transaction messages and use them to create income/expense records automatically or help users record them.

Current Play Console context from 28 October 2026:
- Declared permissions:
  - `android.permission.READ_SMS`
  - `android.permission.RECEIVE_SMS`
- Earlier Google Play review rejected the SMS/Call Log permission declaration with these concerns:
  1. “Requested permissions do not match core functionality of the app.”
  2. “Unable to verify core functionality of app.”
  3. Store listing did not match the declared use case.
  4. Reviewer asked for an updated Permissions Declaration Form and instructions/video to verify the functionality.
  5. Google mentioned SMS-based financial transactions, including 5-digit financial SMS messages, OTP verification for financial transactions, and fraud detection as examples in the rejection text.
- The user later changed the selected core functionality to **“SMS based money management”** and unchecked **“SMS-based financial transactions and related activity where access is restricted to financial SMS transactions.”**
- Review instructions entered in the form (approximately 480/500 characters):
  “ExpenseX AI is a personal finance app that helps users track income, expenses, and budgets. With user consent, READ_SMS accesses relevant financial transaction messages, and RECEIVE_SMS detects incoming transaction alerts to support automatic expense tracking. To review, complete onboarding, enable SMS transaction tracking, grant the requested permissions, and use a supported transaction SMS to verify transaction detection and extraction. The app is not a default SMS handler.”
- A YouTube Shorts link was entered in the video field, appearing as `https://youtube.com/shorts/jCv1ab6ntOU` in the screenshot. Verify the exact URL and accessibility before relying on it.
- All four declaration checkboxes were selected. Only submit declarations that are accurate for the actual app.

#### SMS policy cautions
- Selecting “SMS based money management” does not guarantee approval.
- The feature must exist and be testable in the submitted app.
- The app must clearly disclose SMS access and obtain consent as required.
- The reviewer must be able to reach and test the feature; provide a real, accessible demo video if requested.
- Do not claim the app uses SMS “only” for a purpose unless that is technically true.
- If the feature does not qualify under current Play policy, remove restricted SMS permissions and redesign the flow rather than attempting to bypass policy.
- Recheck the current official Google Play SMS and Call Log Permissions policy before resubmission.

### 3.6 Email transaction parsing
The user explicitly discussed transaction parsing from **both SMS and email** in the context of currency-related handling and financial transactions.
Intended concept:
- Detect a financial transaction notification from an email.
- Extract the actual transaction amount, currency, date, merchant/payee, and transaction type.
- Avoid confusing transaction amount with account balance or other figures in the email.
- Convert amounts for display only when appropriate, without destroying the original amount/currency.

Implementation details, supported email providers, account permissions, and whether this feature is live are not confirmed. Do not state that the app can read a user’s entire mailbox unless that is actually implemented and disclosed.

---

## 4. Currency handling — critical correctness requirement

A previous detailed discussion focused on a bug/edge case:
- The app’s display currency might be INR (rupees), BDT (Bangladeshi taka), USD, or another currency.
- A user may pay in a different currency, e.g. a USD 5 transaction while the app’s selected currency is INR.
- The transaction SMS or email may report the purchase currency, account currency, conversion amount, or balance.
- The app must not blindly treat every number as the selected display currency.

### Required conceptual data model
For each transaction, preserve at minimum:
- Original transaction amount.
- Original transaction currency code (ISO 4217, e.g. USD, INR, BDT).
- User/account display currency at the time of entry, if relevant.
- Converted amount in the reporting/display currency, if conversion is supported.
- Exchange rate used.
- Exchange-rate date/time or source, if available.
- Fees or bank conversion charges, separately if the source gives them.
- Source channel: manual, receipt/OCR, SMS, email, voice, etc., if the app tracks provenance.

These are recommended data requirements derived from the currency bug discussion, not a claim that all these fields already exist in the database.

### Currency invariants
1. Never silently change the original amount or currency when the user changes their preferred display currency.
2. A display-currency change should affect presentation and aggregated reports; it should not rewrite the historical transaction's original currency.
3. If a source message explicitly states both the transaction amount and account balance, choose the transaction amount for the transaction record and do not record the balance as spending.
4. If a bank message reports “USD 5.00” but the user's app currency is INR, preserve USD 5.00 as the source amount. If the app supports conversion, calculate and store/display its INR equivalent separately using an identified rate.
5. Do not assume a bank’s settlement amount equals the original purchase amount. A message can include original currency, converted amount, foreign transaction fee, and account balance.
6. If the currency symbol is ambiguous (for example `$`), infer currency only from reliable context. If it cannot be resolved safely, request clarification or mark it uncertain.
7. Use ISO currency codes internally rather than relying only on symbols like `$`, `৳`, or `₹`.
8. Do not convert the same transaction twice. Track whether an amount is original or already converted.
9. For refunds, reversals, chargebacks, and failed/pending transactions, classify the transaction state and sign correctly; do not automatically treat every bank alert as a completed expense.
10. When the user switches display currency, recalculate display values from original values using the intended rate policy; do not repeatedly convert the previous converted value.

### SMS/email parsing edge cases to cover
- Purchase in a foreign currency.
- Card settlement amount differs from purchase amount.
- Available balance appears before/after the transaction amount.
- Transfer sent vs transfer received.
- Cash withdrawal vs card purchase.
- Credit-card payment vs purchase on the credit card (avoid double-counting).
- Bank fees, ATM fees, foreign transaction fees.
- VAT/tax and tips.
- Refunds, reversals, chargebacks.
- Pending vs posted transaction.
- Failed/declined transaction.
- Multiple transactions in one message.
- Monthly statement containing many transactions.
- Duplicate SMS and email notifications for the same transaction.
- Same transaction notified by SMS and email.
- SMS with Bengali/English/mixed language.
- Dates that cross timezone or midnight boundaries.
- Thousands separators and decimal formats (`1,234.56`, `1.234,56`, `৳১,২৩৪.৫০`).
- Amounts written in words or with currency codes.
- Bank message includes masked card/account number (do not expose/store unnecessarily).
- Balance-only alert without an actual transaction.
- OTP/security message containing numbers that must never become a transaction.
- Merchant names that are shortened or unclear.
- SMS sender IDs that differ between banks.
- Email subject/body/HTML and quoted email threads.
- Currency changes in app settings after historical transactions have been saved.

### Deduplication
If both SMS and email report the same transaction, the app should avoid creating two expenses. A possible matching strategy uses user ID, amount, currency, merchant, timestamp window, transaction/reference ID and source channel. Do not rely on amount alone. This is a recommended design, not a verified implementation.

---

## 5. AI extraction output and validation

When an AI is asked to parse an image, voice transcript, SMS, or email, it should:
1. Identify the source type.
2. Extract only values actually supported by the source.
3. Normalize date/time and currency without losing original data.
4. Determine income vs expense vs transfer/refund/fee/unknown as supported by the product schema.
5. Identify category from the app’s valid category list.
6. Return structured JSON matching the exact schema expected by the app.
7. Include confidence or ambiguity flags if the schema supports them.
8. Avoid prose around the JSON when the caller requires raw JSON.
9. Validate totals and arithmetic where possible.
10. Leave unknown fields null/empty according to the API contract rather than inventing data.

Never assume the exact current schema; retrieve the latest source code/API contract before changing production prompts.

---

## 6. AI provider, usage, and cost planning discussed

Prior conversations compared Gemini Flash-family models and local speech/OCR options. Model version labels and prices may have changed; verify current provider documentation before using these figures.

### Historical planning scenario (not a current quote)
A prior plan considered:
- Subscription price: **US$4.99/month**.
- Allowance concept: 250 image/OCR requests and 250 voice requests per month, up to 2 minutes each, or about 500 AI operations total.
- An earlier estimate for a Gemini Flash-Lite model scenario was roughly **US$0.90/user/month** in maximum AI cost under the assumptions used, leaving around **US$3.35** after an assumed 15% store fee and the estimated AI cost.
- A more text-focused hybrid was estimated around **US$0.21/user** in one scenario, while multimodal use was estimated around **US$0.90/user**.
- These were rough historical estimates from September 2026, not guaranteed prices, not a financial forecast, and not necessarily inclusive of taxes, refunds, infrastructure, storage, or all store fees.
- Local Whisper.cpp was discussed, but accuracy and device performance were concerns.
- A two-stage AI process can incur costs in both stages.

### Cost-control recommendations previously discussed
- Enforce per-user quotas server-side.
- Limit image size/audio duration and token output.
- Return minimal JSON rather than verbose explanations for extraction tasks.
- Use local processing only when accuracy is acceptable and privacy/security requirements are met.
- Monitor actual token/image/audio usage by model and feature.
- Do not expose API keys in the client.
- Use model fallbacks only after evaluating accuracy, latency, and cost.

---

## 7. Subscription, in-app products, and credits

Pricing and product IDs previously discussed:
- Monthly subscription: **US$4.99**
- Quarterly: **US$11.99**
- Half-yearly: **US$24.99**
- Yearly: **US$39.99**

Google Play Console consumable AI-credit product IDs discussed:
- `credits_100` → 100 credits
- `credits_500` → 500 credits
- `credits_1000` → 1,000 credits

These are historical product plans; confirm current product status, prices, entitlements, credit rules, and store configuration before telling users that they are live.

Important implementation rules:
- Validate purchases server-side where possible.
- Do not trust client-submitted credit balances.
- Make credit deduction atomic to avoid duplicate deductions or race conditions.
- Define what an “AI operation” costs in credits and show this to users clearly.
- Restore/manage subscriptions according to each store’s rules.
- Keep Google Play Billing and Apple In-App Purchase rules in mind for digital features/subscriptions.
- Regional pricing and taxes vary; do not assume USD price is the final local price.

---

## 8. Admin dashboard concept

The user requested a super-admin dashboard design and preferred it to be professional, attractive, and simple rather than cluttered.

Previously proposed areas:
- Users and account management.
- Subscription/revenue overview.
- AI usage and consumption.
- Credit management.
- Notifications.
- Support/help requests.
- App versions/releases.
- Reports/analytics.
- Settings.
- Service health/system status.

This is a design scope, not confirmation that these modules currently exist. The user prefers a clean, polished dashboard with clear hierarchy and limited visual clutter.

---

## 9. Technical architecture and developer context

### Technologies/topics previously mentioned
- Flutter / Dart mobile app development.
- Supabase was discussed in other app contexts and may be relevant to backend/data storage; confirm whether ExpenseX AI currently uses it.
- Gemini models were discussed for AI parsing and multimodal work.
- Whisper / whisper.cpp was discussed for speech-to-text.
- Three.js and typewriter effects were discussed for the landing page concept.
- The user has worked with Flutter SDK, Android SDK, iOS/macOS development, Play Console, App Store Connect, and related publishing workflows.

### Proposed architecture patterns (verify before treating as implemented)
- Mobile client captures input and presents permission/disclosure UI.
- A parser/extraction layer normalizes SMS, email, voice transcript, or OCR text.
- A backend validates user ownership, quotas, transaction data, AI usage and credit balance.
- Database stores normalized transaction records and original currency/source metadata.
- Analytics/reporting derives totals using each transaction’s correct currency treatment.
- API keys and privileged logic stay on the backend.
- Logs should avoid retaining unnecessary raw SMS/email or sensitive financial details.

### Security and privacy principles
- Request only permissions that are necessary and policy-compliant.
- Explain why sensitive permissions are needed before requesting them.
- Obtain explicit consent where required.
- Minimize collection and retention of SMS/email contents.
- Do not send raw messages to a third-party model without a disclosed, justified data flow and appropriate safeguards.
- Protect financial records with user-level access controls.
- Never log OTPs, full account numbers, or unnecessary message contents.
- Ensure users can understand and control imported transactions.
- Privacy policy and in-app disclosures must accurately match the actual data flow.

---

## 10. Store publishing and compliance history

### Google Play
- User confirmed on 26 October 2026 that ExpenseX AI was already live on Google Play.
- Earlier Play Store name suggestion: “ExpenseX AI: Money Manager.”
- SMS/Call Log permission review failed more than once by 28 October 2026.
- Rejection reasons included mismatch between the declared use case and app core functionality, inability to verify the functionality, store-listing mismatch, and need for clearer review instructions/video.
- Current declared permissions shown in Play Console: `READ_SMS` and `RECEIVE_SMS`.
- Current selected declaration shown in screenshots: `SMS based money management`.
- Current review text says the app helps users track income, expenses and budgets, and uses SMS with consent to support automatic expense tracking.
- Video field was filled with a YouTube Shorts URL appearing to be `https://youtube.com/shorts/jCv1ab6ntOU`; verify.
- No approval outcome for this latest declaration is known.

### Apple App Store
- App Store Connect was discussed in connection with metadata rejection because it referenced Google Play; the instruction was to remove Google Play references from Apple-facing metadata.
- App Store review required demo account credentials in a separate review context.
- The user asked for promotional messaging to say the app is available on both Google Play and the App Store, but current App Store live status must be checked before asserting it.

### Payments policy context
- User previously encountered Google Play Billing policy issues with another app/project (Shopstick), not necessarily ExpenseX AI. Do not confuse the two products.
- For ExpenseX AI digital subscriptions or credits, check current Google Play Billing and Apple IAP requirements before proposing payment implementation.

---

## 11. Marketing and brand communication

### Product message
ExpenseX AI helps users understand and manage their money with AI-assisted tracking. A core marketing point is the ability to record transactions more conveniently, including voice-based input if verified as live.

### Voice feature messaging
The user specifically pointed out that an earlier promo draft omitted the voice feature. Future promotional copy should mention voice input when relevant and accurate.

### Store availability messaging
The user asked for short, professional wording that covers both Google Play and the Apple App Store. Possible concise line, only when both are currently available:
“Available on Google Play and the App Store.”
Do not say “Coming Soon” for the product itself, because the user confirmed it was already live on Google Play on 26 October 2026.

### Promo tone preferences
- Professional, polished, and concise.
- For videos: polite, slightly slower voiceover, storytelling style rather than robotic narration.
- Explain the problem (money tracking is stressful/manual), show how ExpenseX AI helps, and end with a clear download/action message.
- For a product already live, use an install/download CTA rather than a “Coming Soon” CTA.

### Promotional formats discussed
- Google Flow video prompts.
- Short-form social copy for TikTok and X/Twitter.
- Promotional video using product logo and app screens/splash screen.
- Product/editor brief for a video editor.
- Store listing content and ASO.

---

## 12. Website and visual identity

- Website: https://expensexai.com/
- Product logo and splash-screen assets have been used/discussed for promotional material.
- The user has supplied app screenshots and a logo for a Google Play/App Store feature graphic.
- Do not invent exact brand colors, fonts, or logo geometry unless taken from the supplied assets or brand guide; no confirmed ExpenseX AI brand hex code is available in this knowledge base.
- Shopstick’s teal brand color and MotoCare’s orange brand color belong to separate products and must not be incorrectly assigned to ExpenseX AI.

---

## 13. Recent user requests relevant to continuity

- 26 October 2026: User said ExpenseX AI is already published; remove “Coming Soon” wording from promotional materials.
- 27 October 2026: User asked to improve promotional copy so it includes voice functionality and says the app is available on both Google Play and the App Store, in short professional English.
- 27 October 2026: User requested a simple, professional, attractive super-admin dashboard design; disliked a cluttered/haphazard version.
- 28 October 2026: User shared Google Play SMS/Call Log permission rejection screenshots and the declaration form. They changed the selected core functionality to “SMS based money management,” provided review instructions, and added a YouTube Shorts video link. Latest approval status is unknown.
- Prior currency discussions: User wanted a detailed, robust specification for currency switching and transaction parsing across both SMS and email so that changing app display currency does not corrupt original transaction values.

---

## 14. Known unknowns — do not hallucinate

The following must be checked with the user, current source code, product console, or official documentation:
- Current app version/build and exact live feature set.
- Whether Apple App Store publication is complete and public.
- Whether SMS tracking fully works on the current Android build.
- Whether SMS/email parsing is fully implemented or still in development.
- Exact SMS providers/banks supported and parsing rules.
- Whether the app stores data in Supabase or another backend.
- Exact database schema and transaction API contract.
- Current OCR prompt/schema in production.
- Current AI provider/model IDs and live prices.
- Actual number of users, revenue, retention, model accuracy, and operating costs.
- Current subscription entitlements and in-app product status.
- Exact privacy-policy URL and data retention practices.
- Whether the YouTube review video URL is correct and accessible.
- Whether the latest Google Play SMS permission declaration was approved or rejected.

---

## 15. Recommended handoff prompt for another AI

You are assisting with **ExpenseX AI**, an AI-assisted personal finance app. Use the attached knowledge base as project context. The product helps users track income, expenses and budgets, and has discussed features for receipt/OCR extraction, voice-based entry, SMS transaction tracking and email transaction parsing. Treat each feature’s live status as unverified unless this knowledge base or the user confirms it.

Prioritize:
1. Financial correctness, especially original transaction currency versus display currency.
2. Reliable parsing of SMS, email, receipts and voice transcripts without inventing missing data.
3. Privacy, security, consent and Google Play/App Store policy compliance.
4. Clear, professional UX and marketing.
5. Cost-aware AI design and server-side enforcement of quotas/credits.
6. Continuity with the current product and store-review history.

When answering:
- Separate facts, proposals and assumptions.
- Ask only necessary clarifying questions.
- Never promise app-store approval.
- Never recommend disguising a permission’s actual use or bypassing policy.
- Do not confuse ExpenseX AI with the user’s other products, Shopstick POS or MotoCare.
- Do not use “Coming Soon” for ExpenseX AI itself unless the user specifically describes an unreleased feature.
- Check current official documentation for time-sensitive model pricing, store policies and platform requirements.

---

## 16. Core Product Team (Confirmed 28 October 2026 — Expanded to Seven Members)

**Company:** Appstick, Khulna, Bangladesh.  
**Team Composition:** Seven core members.  
**Section Heading & Intro:**
> ## Meet the Team
> ExpenseX AI is built by a seven-member product team at Appstick in Khulna, Bangladesh — covering company leadership, backend, frontend, mobile, web and product design. Our engineering and design team brings 2.5 to 6 years of production-level experience building and shipping real software.

**Strict Rules:**
- Exact years per person as confirmed: Sabbir 6, Motiur 5, Tonmay 4, Dani 3, Shiam 3, Asif 2.5.
- No years figure is to be shown for the Founder & CEO (his bio presents role and leadership only).
- Name spelling must match the person's LinkedIn profile (note: "Md. Sabbir Ahmmed" — keep the spelling exactly as the member uses it).
- No invented employers, degrees, titles, or projects.
- Order on the page: Riaz → Sabbir → Motiur → Tonmay → Dani → Shiam → Asif (leadership and team leads first, then engineers, then design).

1. **Md. Riaz Mahmud — Founder & CEO**  
   Md. Riaz Mahmud is the Founder and CEO of Appstick. He leads the vision, product strategy and roadmap of ExpenseX AI, and oversees the company's business direction and partnerships, working directly with the engineering and design team to take the product from idea to release.
2. **Md. Sabbir Ahmmed — Senior Software Engineer (Lead Backend)** (6 years)  
   Md. Sabbir Ahmmed is a Senior Software Engineer at Appstick with 6 years of production-level experience in backend development. At ExpenseX AI, he leads the backend engineering — designing and building the server-side systems and APIs that power the app's data and AI-assisted features.
3. **Motiur Rahman — Software Engineer (Lead Frontend)** (5 years)  
   Motiur Rahman is a Software Engineer at Appstick with 5 years of production-level experience in frontend development. At ExpenseX AI, he leads the frontend development, building polished, responsive user interfaces for the product.
4. **Tonmay Sen — Software Engineer (Mobile Application: Android & iOS)** (4 years)  
   Tonmay Sen is a Software Engineer at Appstick with 4 years of production-level experience in mobile application development. At ExpenseX AI, he builds and maintains the Android and iOS applications, turning product requirements into stable, user-ready mobile experiences.
5. **Dani Gain — Software Engineer (Backend)** (3 years)  
   Dani Gain is a Backend Software Engineer at Appstick with 3 years of production-level experience in server-side development. At ExpenseX AI, he builds and maintains the backend services and APIs that power the app's data and AI-assisted features.
6. **Sk Shiam Ali — Software Engineer (Website Frontend)** (3 years)  
   Sk Shiam Ali is a Frontend Software Engineer at Appstick with 3 years of production-level experience in web development. At ExpenseX AI, he builds and maintains the product website, focusing on responsive, fast and accessible interfaces.
7. **Asif Uddin — UI/UX Designer** (2.5 years)  
   Asif Uddin is a UI/UX Designer at Appstick with 2.5 years of production-level experience in interface and experience design. At ExpenseX AI, he designs the app and website interfaces, keeping financial workflows simple, clear and easy to use.

