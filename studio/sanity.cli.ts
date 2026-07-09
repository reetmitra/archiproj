import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./project";

export default defineCliConfig({
  api: { projectId, dataset },
  // Preset so `sanity deploy` never prompts; change at handover along
  // with project.ts when the studio moves to the professor's account.
  studioHost: "alex-li-site",
  deployment: { appId: "agv6x8f8iv7w3zirud3diagj" },
});
