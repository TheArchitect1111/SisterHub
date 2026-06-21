"use client";

import { ClerkShell } from "@ea/portal-chassis/clerk";
import { SISTERHUB_TENANT } from "@/lib/chassis/sisterhub-portal";

export function SisterHubLoginShell() {
  const brand = SISTERHUB_TENANT.brand;

  return (
    <ClerkShell
      brandColor={brand.colors.primary}
      logoSrc="/sisterhub-mark.svg"
      portalName={`${brand.name}${brand.nameLine2 ?? ""}`}
      tagline="Structure that lets sisterhood thrive."
      mode="sign-in"
    />
  );
}
