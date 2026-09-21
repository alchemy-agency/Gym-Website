import Script from "next/script";

import { GADS_ID, GA4_ID } from "@/lib/tracking";

/**
 * Loads the Google tag once, site-wide. Renders nothing at all when the IDs
 * are not configured, so local development stays clean and no tag fires from
 * a preview deployment that shouldn't be counting conversions.
 */
export function GoogleTag() {
  const primaryId = GADS_ID || GA4_ID;
  if (!primaryId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
        `.trim()}
      </Script>
    </>
  );
}
