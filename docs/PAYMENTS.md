# Payments — Getting Your Stripe & PayPal Keys

This guide explains, step by step, how to obtain the API keys the site needs to
take real payments, where to paste them, and how to test everything.

- **Stripe is fully integrated** and ready to take live payments — you only need
  to add your keys.
- **PayPal is documented here** (how to get its keys) but is **not yet wired into
  the app**. Follow the PayPal section only if/when you want that option built.

> Companion documents (in this `docs/` folder):
> - **Payment-Setup-Simple-Guide.docx** — plain-language, non-technical version.
> - **US-Stripe-PayPal-Account-Setup.docx** — how to open the Stripe/PayPal
>   accounts for a US-based business (requirements & documents).

---

## 1. Where keys go

All keys live in the project's `.env` file (copy `.env.example` to `.env` if you
haven't). The site reads these three Stripe variables:

| Variable | What it is | Example prefix |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Secret API key (server-side) | `sk_test_…` / `sk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | Verifies incoming Stripe webhooks | `whsec_…` |
| `NEXT_PUBLIC_SITE_URL` | Your site's base URL for redirects | `https://yourdomain.com` |

> **Demo mode:** if `STRIPE_SECRET_KEY` is left blank, the site still works —
> registrations are saved to the database but no real charge is made. This is the
> current default. Adding a real secret key switches on real payments
> automatically. **No code changes are needed.**

After editing `.env`, **restart the dev server** (`npm run dev`) — env changes are
only picked up on startup.

---

## 2. Test keys vs. Live keys

Both Stripe and PayPal give you **two sets** of keys:

| Mode | Purpose | Money moves? |
| --- | --- | --- |
| **Test / Sandbox** | Development & QA. Use fake card / fake buyer accounts. | No |
| **Live / Production** | The real public site. | **Yes — real money.** |

**Always develop with test/sandbox keys.** Only put live keys on the real
production server, never in local development or in git.

---

## 3. Stripe — step by step

### 3.1 Create an account
1. Go to <https://dashboard.stripe.com/register> and sign up (or log in).
2. You land on the **Dashboard**.

### 3.2 Get your TEST secret key (for development)
1. Make sure **Test mode** is ON — toggle at the top-right of the dashboard
   (it should say "Test mode").
2. Go to **Developers → API keys** (direct link:
   <https://dashboard.stripe.com/test/apikeys>).
3. You'll see:
   - **Publishable key** — `pk_test_…` (optional for this app).
   - **Secret key** — `sk_test_…`. Click **Reveal test key** and copy it.
4. Paste into `.env`:
   ```env
   STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxx"
   ```

### 3.3 Set up the webhook (so payments get marked "Paid")

The webhook is how Stripe tells your site "this payment succeeded" so the
registration is marked **PAID** in the admin. The app listens at:

```
POST /api/stripe/webhook
```

**A. Local development — use the Stripe CLI (easiest):**
1. Install the CLI: <https://stripe.com/docs/stripe-cli> (or `scoop install stripe`
   on Windows / `brew install stripe/stripe-cli/stripe` on macOS).
2. Log in: `stripe login`
3. Forward events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. The CLI prints a signing secret like `whsec_…`. Copy it into `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxx"
   ```
5. Keep this terminal running while testing. Restart `npm run dev` after editing `.env`.

**B. Production — add an endpoint in the dashboard:**
1. Go to **Developers → Webhooks → Add endpoint**
   (<https://dashboard.stripe.com/webhooks>). Switch off Test mode for the live one.
2. **Endpoint URL:** `https://your-real-domain.com/api/stripe/webhook`
3. **Events to send** — click "Select events" and add:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
4. Click **Add endpoint**, then on the endpoint page click **Reveal** under
   *Signing secret* and copy the `whsec_…` value into your production
   `STRIPE_WEBHOOK_SECRET`.

> If `STRIPE_WEBHOOK_SECRET` is blank, the site still confirms payment on the
> success page (a fallback). The webhook is the reliable, recommended path.

### 3.4 Test the payment flow
1. With test keys set, open the site, register for a seminar, and click
   **Proceed to Secure Payment**.
2. On Stripe's checkout page use a **test card**:
   - Card number: `4242 4242 4242 4242`
   - Expiry: any future date (e.g. `12 / 34`)
   - CVC: any 3 digits · ZIP: any 5 digits
3. Complete payment → you're redirected to the success page, and the
   registration shows **PAID** in `/admin` (once Registrations is re-enabled).
   More test cards: <https://stripe.com/docs/testing>.

### 3.5 Go live
1. Complete Stripe's business activation (**Activate account** in the dashboard —
   business details, bank account).
2. Turn **Test mode OFF**, go to **Developers → API keys**, reveal the
   **live** secret key `sk_live_…`.
3. On your **production** server set:
   ```env
   STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxxxxxxx"
   STRIPE_WEBHOOK_SECRET="whsec_…"   # from the LIVE webhook endpoint (3.3-B)
   NEXT_PUBLIC_SITE_URL="https://your-real-domain.com"
   ```
4. Never commit live keys. Set them in your host's environment-variable settings
   (Vercel / Railway / server), not in a file in git.

---

## 4. PayPal — step by step (getting keys)

> PayPal is **not yet built into the app.** These steps get you the credentials so
> the integration can be added later. Ask to have the PayPal checkout wired up
> when you're ready.

### 4.1 Create a developer account
1. Go to <https://developer.paypal.com/> and log in with your PayPal account
   (or create one).
2. Open the **Dashboard** → **Apps & Credentials**
   (<https://developer.paypal.com/dashboard/applications/sandbox>).

### 4.2 Get SANDBOX keys (for development)
1. At the top, make sure the **Sandbox** tab is selected.
2. Under **REST API apps**, click **Create App**.
3. Give it a name (e.g. `AI Institute – Sandbox`) and click **Create App**.
4. The app page shows:
   - **Client ID** — copy it.
   - **Secret** — click **Show** and copy it.
5. Store them (for the future integration):
   ```env
   PAYPAL_CLIENT_ID="your-sandbox-client-id"
   PAYPAL_CLIENT_SECRET="your-sandbox-secret"
   PAYPAL_ENV="sandbox"
   ```

### 4.3 Sandbox test accounts (fake buyer/seller)
1. Go to **Testing Tools → Sandbox Accounts**
   (<https://developer.paypal.com/dashboard/accounts>).
2. PayPal auto-creates a **Business** (seller) and **Personal** (buyer) test
   account. Use the Personal account's email/password to "pay" in sandbox
   checkout — no real money moves.

### 4.4 Webhooks (for the future integration)
1. On your app's page (Apps & Credentials → your app), scroll to **Webhooks**
   → **Add Webhook**.
2. **Webhook URL:** `https://your-real-domain.com/api/paypal/webhook`
   (this route will be created when PayPal is wired up).
3. Subscribe to at least:
   - `CHECKOUT.ORDER.APPROVED`
   - `PAYMENT.CAPTURE.COMPLETED`
4. Save.

### 4.5 Go live with PayPal
1. In the dashboard switch from **Sandbox** to **Live**.
2. Under **Apps & Credentials → Live**, create (or open) your app and copy the
   **live** Client ID and Secret.
3. Set on production:
   ```env
   PAYPAL_CLIENT_ID="your-live-client-id"
   PAYPAL_CLIENT_SECRET="your-live-secret"
   PAYPAL_ENV="live"
   ```
4. Your PayPal business account must be verified and confirmed to accept live
   payments.

---

## 5. Quick reference / checklist

**Stripe (needed now):**
- [ ] `STRIPE_SECRET_KEY` — `sk_test_…` locally, `sk_live_…` in production
- [ ] `STRIPE_WEBHOOK_SECRET` — from Stripe CLI (local) or dashboard endpoint (prod)
- [ ] `NEXT_PUBLIC_SITE_URL` — correct https domain in production
- [ ] Restart the server after editing `.env`
- [ ] Test with card `4242 4242 4242 4242`

**PayPal (only when the integration is built):**
- [ ] `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV`
- [ ] Sandbox app + sandbox buyer account for testing
- [ ] Live app credentials for production

## 6. Security notes
- **Never commit real keys.** `.env` is git-ignored — keep it that way.
- Secret keys (`sk_…`, PayPal Secret) are **server-only** — never expose them in
  client code. Only values prefixed `NEXT_PUBLIC_` are safe in the browser.
- If a secret key leaks, **roll it** immediately in the provider dashboard.
