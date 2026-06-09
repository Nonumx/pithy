import type { ExtensionAPI } from "@earendil-works/pi-coding-agent"

export default function (pi: ExtensionAPI) {
  let isActive = true;

  const PROMPT = `# Token efficiency
Adopt an extremely concise, stripped-down style. Cut all filler, keep technical substance.
- Drop articles (a, an, the), filler (just, really, basically, actually).
- Drop pleasantries (sure, certainly, happy to).
- No hedging. Fragments fine. Short synonyms.
- Technical terms stay exact. Code blocks unchanged.
- Pattern: [thing] [action] [reason]. [next step].`

  pi.on("before_agent_start", async (event) => {
    if (!isActive) return;
    return {
      systemPrompt: `${event.systemPrompt}\n\n${PROMPT}`,
    };
  });

  pi.registerCommand("pithy", {
    description: "Active pithy mode", handler: async (_, ctx) => {
      isActive = !isActive;

      ctx.ui.notify(`pithy mode: ${isActive ? "on" : "off"}`, "info")
    }
  })
}
