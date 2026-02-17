// ChatInput.tsx - Message input footer
import React, { useRef, KeyboardEvent } from 'react';
import { widgetTheme } from './theme';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onEndChat: () => void;
  disabled: boolean;
  isSending: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onEndChat,
  disabled,
  isSending,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isSending && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <footer style={{
      backgroundColor: widgetTheme.colors.background.main,
      borderTop: `1px solid ${widgetTheme.colors.border.default}`,
      padding: widgetTheme.spacing.md,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: widgetTheme.spacing.sm,
      }}>
        {/* Message input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={disabled}
          className="eden-input"
          style={{
            flex: 1,
            padding: widgetTheme.spacing.md,
            border: `2px solid ${widgetTheme.colors.border.default}`,
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.sm,
            outline: 'none',
            transition: `all ${widgetTheme.animation.fast}`,
            backgroundColor: disabled ? widgetTheme.colors.background.secondary : widgetTheme.colors.message.user.background,
            color: widgetTheme.colors.text.primary,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
              e.currentTarget.style.borderWidth = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = widgetTheme.colors.border.default;
          }}
        />

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={disabled || isSending || !value.trim()}
          style={{
            padding: `${widgetTheme.spacing.md} ${widgetTheme.spacing.lg}`,
            backgroundColor: (!disabled && !isSending && value.trim()) 
              ? widgetTheme.colors.primary 
              : widgetTheme.colors.border.accent,
            color: widgetTheme.colors.text.inverse,
            border: (!disabled && !isSending && value.trim()) ? `2px solid ${widgetTheme.colors.primary}` : `1px solid ${widgetTheme.colors.border.default}`,
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.sm,
            fontWeight: widgetTheme.typography.fontWeight.medium,
            cursor: (!disabled && !isSending && value.trim()) ? 'pointer' : 'not-allowed',
            transition: `background-color ${widgetTheme.animation.fast}`,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (!disabled && !isSending && value.trim()) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primaryHover;
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !isSending && value.trim()) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primary;
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            }
          }}
        >
          Send
        </button>

        {/* End Chat button */}
        <button
          onClick={onEndChat}
          disabled={disabled}
          style={{
            padding: `${widgetTheme.spacing.md} ${widgetTheme.spacing.lg}`,
            backgroundColor: widgetTheme.colors.background.main,
            color: widgetTheme.colors.text.primary,
            border: `1px solid ${widgetTheme.colors.border.default}`,
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.sm,
            fontWeight: widgetTheme.typography.fontWeight.medium,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: `all ${widgetTheme.animation.fast}`,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.background.secondary;
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.background.main;
              e.currentTarget.style.borderColor = widgetTheme.colors.border.default;
            }
          }}
        >
          End Chat
        </button>
      </div>
    </footer>
  );
};
