# Custom email address

Status: not started. Needs a few clicks in the Cloudflare dashboard, no code beyond updating the
address in a few files.

## Why

The footer, the CV and the About page show a Gmail address. A domain address looks more deliberate,
and I can throw an alias away if it gets scraped by spammers, which I cannot do with Gmail.

## Which address

- `joao@joaoguedes.net` is my pick for the CV and the footer. Short, personal, still professional.
- `hello@joaoguedes.net` is fine too and common, but it reads as a company address. Good as a second
  alias for the site if I want one.
- Avoid `contact@` or `info@`, which read as a business, and anything with numbers.

## Approach

1. **Receiving.** Cloudflare Email Routing (free). It works when the domain's DNS is on Cloudflare,
   adds the MX and SPF records itself, and forwards `joao@joaoguedes.net` to my Gmail. Verify the
   destination address when asked.
2. **Replying as the domain.** In Gmail: Settings, Accounts, Send mail as, add the address, use
   `smtp.gmail.com` port 587 with a Gmail app password (needs 2-step verification on). Replies then
   leave from the domain address.
3. **Reputation.** Add a DMARC record (`v=DMARC1; p=none; rua=mailto:...`) so mail from the domain
   is less likely to land in spam. Start with `p=none`.
4. **Update the site** once it works: `src/data/site.ts` (the socials entry), the CV contact line in
   `src/data/cv` and `src/data/resume.ts`, and the About page if the address is written there.

## Cost

Zero. Email Routing and Gmail's send-as are both free.

## Risks

- Forwarding can be delayed or flagged as spam. Test with a message from another provider.
- If the DNS is not on Cloudflare, Email Routing cannot be used. Then the options are a free forwarding
  service from the registrar, if it has one, or moving only the DNS to Cloudflare, which is also free.
- The address is public on the site, so expect some spam. Use a different alias on the CV than on
  the site if it gets bad, and delete the noisy one.

## Checklist

- [ ] Pick the address.
- [ ] Set up routing and verify the Gmail destination.
- [ ] Set up Send mail as and send a test to another provider.
- [ ] Add the DMARC record.
- [ ] Replace the Gmail address in the site, the CV and the PDF.
