// ChatMessage.tsx - Individual message bubble component
import React from 'react';
import { widgetTheme } from './theme';

export interface Message {
  id: string;
  content: string;
  sender: 'USER' | 'BOT';
  createdAt: string;
}

interface ChatMessageProps {
  message: Message;
}

const linkify = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const urlRegex = /(https?:\/\/[^\s<>\)]+)(?![^<]*>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the URL as a link
    const url = match[0];
    parts.push(
      <a
        key={`link-${key++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'inherit',
          textDecoration: 'underline',
          wordBreak: 'break-all',
        }}
      >
        {url}
      </a>
    );

    lastIndex = match.index + url.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'USER';
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: widgetTheme.spacing.md,
    }}>
      <div style={{
        maxWidth: '75%',
        backgroundColor: isUser 
          ? widgetTheme.colors.message.user.background 
          : widgetTheme.colors.message.bot.background,
        color: isUser 
          ? widgetTheme.colors.message.user.text 
          : widgetTheme.colors.message.bot.text,
        borderRadius: widgetTheme.borderRadius.lg,
        padding: `${widgetTheme.spacing.md} ${widgetTheme.spacing.lg}`,
        fontSize: widgetTheme.typography.fontSize.sm,
        lineHeight: widgetTheme.typography.lineHeight.relaxed,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        boxShadow: widgetTheme.shadows.sm,
        whiteSpace: 'pre-wrap',
      }}>
        {linkify(message.content)}
      </div>
    </div>
  );
};

// Typing indicator component
export const TypingIndicator: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: widgetTheme.spacing.md,
    }}>
      <div style={{
        backgroundColor: widgetTheme.colors.message.bot.background,
        borderRadius: widgetTheme.borderRadius.lg,
        padding: `${widgetTheme.spacing.md} ${widgetTheme.spacing.lg}`,
        boxShadow: widgetTheme.shadows.sm,
        display: 'flex',
        alignItems: 'center',
        gap: widgetTheme.spacing.xs,
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: widgetTheme.borderRadius.full,
          backgroundColor: widgetTheme.colors.status.typing,
          animation: 'typing-dot 1.4s infinite',
          animationDelay: '0s',
        }} />
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: widgetTheme.borderRadius.full,
          backgroundColor: widgetTheme.colors.status.typing,
          animation: 'typing-dot 1.4s infinite',
          animationDelay: '0.2s',
        }} />
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: widgetTheme.borderRadius.full,
          backgroundColor: widgetTheme.colors.status.typing,
          animation: 'typing-dot 1.4s infinite',
          animationDelay: '0.4s',
        }} />
      </div>
    </div>
  );
};

// Add keyframes for typing animation (inject into document)
if (typeof document !== 'undefined') {
  const styleId = 'chat-typing-animation';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes typing-dot {
        0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(style);
  }
}
