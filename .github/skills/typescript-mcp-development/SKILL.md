---
name: 'typescript-mcp-server-generator'
description: 'Skill for generating TypeScript MCP server boilerplate and advanced patterns.'
---

# TypeScript MCP Server Generator Skill

## Purpose

Automate and standardize the creation of Model Context Protocol (MCP) servers using the TypeScript SDK.

## Usage

- Use this skill to scaffold new MCP servers, tools, and resources.
- Follows the latest best practices from `.github/instructions/typescript-mcp-server.instructions.md`.

## Workflow

1. Install dependencies: `npm install @modelcontextprotocol/sdk zod@3`
2. Use `McpServer` for high-level, or `Server` for low-level implementations.
3. Register tools/resources/prompts with clear titles and zod schemas.
4. Prefer stateless transports unless session state is required.
5. Test with MCP Inspector (`npx @modelcontextprotocol/inspector`).

## Patterns

- Use zod for all input/output validation.
- Always provide a `title` for UI/LLM clarity.
- Return both `content` and `structuredContent` from tools.
- Use try/catch and return `{ isError: true }` for errors.
- Use `ResourceTemplate` for dynamic URIs.
- Enable CORS and DNS rebinding protection for HTTP servers.

## Example Boilerplate

```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer();

server.registerTool({
    name: 'echo',
    title: 'Echo Tool',
    description: 'Returns the input string.',
    inputSchema: z.object({ text: z.string() }),
    outputSchema: z.object({ result: z.string() }),
    async run({ input }) {
        return { content: input.text, structuredContent: { result: input.text } };
    },
});

server.listen();
```

## References

- See `.github/instructions/typescript-mcp-server.instructions.md` for full details.
