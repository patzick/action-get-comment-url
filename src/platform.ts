export type SupportedPlatforms = "vercel" | "netlify" | "storefrontcloud";
export const supportedPlatforms: SupportedPlatforms[] = [
  "vercel",
  "netlify",
  "storefrontcloud",
];

export function validatePlatform(platformName: string) {
  if (!platformName) return;
  const platform = supportedPlatforms.find(
    (platform) => platformName?.toLocaleLowerCase() === platform
  );
  if (!platform) throw new Error(`Unknown platform input: ${platformName}`);
  return platform;
}

export function getPlatformPattern(platform: SupportedPlatforms) {
  switch (platform) {
    case "vercel":
      return {
        pattern: "deployed with Vercel",
        index: 4,
      };
    case "netlify":
      return {
        pattern: "A preview is ready!",
        index: 1,
      };
    case "storefrontcloud":
      return {
        pattern: "successfully deployed",
        index: 1,
      };

    default:
      throw new Error(`Unknown platform input: ${platform}`);
  }
}
