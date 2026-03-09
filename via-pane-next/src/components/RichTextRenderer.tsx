import React from 'react';
import Link from 'next/link';

// Helper for bitmask text formatting in Lexical
export const IS_BOLD = 1;
export const IS_ITALIC = 2;
export const IS_STRIKETHROUGH = 4;
export const IS_UNDERLINE = 8;
export const IS_CODE = 16;
export const IS_SUBSCRIPT = 32;
export const IS_SUPERSCRIPT = 64;

interface RichTextRendererProps {
    content: any;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
    if (!content) return null;

    // The root elements are usually in content.root.children if saved from Payload
    const children = content.root?.children || content.children || [];

    return (
        <>
            {children.map((node: any, index: number) => (
                <LexicalNodeRenderer key={index} node={node} />
            ))}
        </>
    );
}

function LexicalNodeRenderer({ node }: { node: any }) {
    if (!node) return null;

    // Raw HTML from seeded or imported data
    if (node.type === 'html' || node.children?.[0]?.type === 'html') {
        const htmlContent = node.children?.[0]?.text || node.text || '';
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }

    // Text nodes
    if (node.type === 'text') {
        let textElement: React.ReactNode = node.text;

        if (node.format & IS_BOLD) textElement = <strong>{textElement}</strong>;
        if (node.format & IS_ITALIC) textElement = <em>{textElement}</em>;
        if (node.format & IS_STRIKETHROUGH) textElement = <s>{textElement}</s>;
        if (node.format & IS_UNDERLINE) textElement = <u>{textElement}</u>;
        if (node.format & IS_CODE) textElement = <code>{textElement}</code>;
        if (node.format & IS_SUBSCRIPT) textElement = <sub>{textElement}</sub>;
        if (node.format & IS_SUPERSCRIPT) textElement = <sup>{textElement}</sup>;

        return <>{textElement}</>;
    }

    // Links
    if (node.type === 'link') {
        const url = node.fields?.url || node.url || '#';
        const newTab = node.fields?.newTab || false;

        return (
            <Link href={url} target={newTab ? '_blank' : '_self'} rel={newTab ? 'noopener noreferrer' : ''}>
                {node.children?.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </Link>
        );
    }

    // Headings
    if (node.type === 'heading') {
        const Tag = node.tag as any;
        return (
            <Tag>
                {node.children?.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </Tag>
        );
    }

    // Lists
    if (node.type === 'list') {
        const Tag = node.listType === 'number' ? 'ol' : 'ul';
        const className = node.listType === 'number' ? 'list-decimal ml-6 mb-4' : 'list-disc ml-6 mb-4';
        return (
            <Tag className={className}>
                {node.children?.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </Tag>
        );
    }

    // List Items
    if (node.type === 'listitem') {
        return (
            <li className="mb-1">
                {node.children?.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </li>
        );
    }

    // Paragraphs
    if (node.type === 'paragraph') {
        // se não há filhos ou o parágrafo é vazio de texto, ignorar ou renderizar quebra
        if (!node.children || node.children.length === 0) return <br />;

        return (
            <p className="mb-4">
                {node.children.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </p>
        );
    }

    // Upload/Media (Imagens integradas no texto)
    if (node.type === 'upload') {
        const media = node.value;
        if (!media) return null;

        // Tentativa de renderizar mídia com suporte ao helper
        const imageUrl = media.url;
        const alt = media.alt || 'Imagem do artigo';

        if (imageUrl) {
            return (
                <div className="my-8">
                    <img src={imageUrl} alt={alt} className="rounded-xl w-full h-auto" />
                </div>
            );
        }
    }

    // Em último caso, tenta renderizar os filhos apenas num fallback
    if (node.children) {
        return (
            <>
                {node.children.map((child: any, i: number) => (
                    <LexicalNodeRenderer key={i} node={child} />
                ))}
            </>
        );
    }

    return null;
}
