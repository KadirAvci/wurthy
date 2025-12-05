import { type Topic, RadialFlow } from "@/components/ui/radialflow";

const demoTopics: Topic[] = [
    { id: "chatgpt", name: "ChatGPT", position: { x: 10, y: 10 }, color: "#000000", highlighted: true },
    { id: "deepseek", name: "DeepSeek", position: { x: 10, y: 25 }, color: "#000000", highlighted: true },
    { id: "gemini", name: "Gemini", position: { x: 10, y: 50 }, color: "#000000", highlighted: true },
    { id: "claude", name: "Claude", position: { x: 10, y: 65 }, color: "#000000", highlighted: true },
    { id: "mistral", name: "Mistral", position: { x: 10, y: 80 }, color: "#000000", highlighted: true },
    { id: "grok", name: "Grok", position: { x: 90, y: 10 }, color: "#000000", highlighted: true },
    { id: "llama", name: "LLaMA", position: { x: 90, y: 30 }, color: "#000000", highlighted: true },
    { id: "copilot", name: "Copilot", position: { x: 90, y: 50 }, color: "#000000", highlighted: true },
    { id: "perplexity", name: "Perplexity", position: { x: 90, y: 75 }, color: "#000000", highlighted: true },
    { id: "anthropic", name: "Anthropic", position: { x: 90, y: 100 }, color: "#000000", highlighted: true },
];

export default function SmartData() {
    return (
        <RadialFlow
            topics={demoTopics}
            badgeName={"Wurthy"}
            centralDotColor="#FFFFFF"
        />
    );
}