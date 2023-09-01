"use client";

import { Box, Card, CardBody } from "@chakra-ui/react";
import { type CodeBlockBaseProps } from "./types";

import SyntaxHighlighter from "react-syntax-highlighter"; // Uses HLJS. Replace with { Prism as SyntaxHighlighter } for Prism.
import { gruvboxDark, vs } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface CodeBlockProps extends CodeBlockBaseProps {
	/** The code. */
	children: React.ReactNode;

	/** Any additional, arbitrary props. */
	[key: string]: any;
}

/**
 * Creates a syntax-highlighted code block.
 * @privateremarks modified from: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
 */
// TODO - https://stackoverflow.com/questions/64392199/highlight-line-in-react-syntax-highlighter and figure out how to add file name.
const CodeBlock = ({ className, children, colorMode, ...props }: CodeBlockProps) => {
	const language = /lang(uage)?-(\w+)/.exec(className ?? "");
	return (
		<Card width="100%" boxShadow="xl" padding="8" margin="8">
			<CardBody>
				<Box>
					<SyntaxHighlighter
						language={language ? language[2] : ""}
						style={colorMode === "dark" ? gruvboxDark : vs}
						PreTag="div"
						{...props}
						wrapLongLines
					>
						{String(children).replace(/\n$/, "")}
					</SyntaxHighlighter>
				</Box>
			</CardBody>
		</Card>
	);
};

export { CodeBlock as default, type CodeBlockProps };
