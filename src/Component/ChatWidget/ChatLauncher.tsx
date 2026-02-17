// ChatLauncher.tsx - Floating button that opens the chat widget
import React from 'react';
import { widgetTheme } from './theme';

interface ChatLauncherProps {
  isOpen: boolean;
  onClick: () => void;
  assetsPath?: string;
}

export const ChatLauncher: React.FC<ChatLauncherProps> = ({ 
  isOpen, 
  onClick, 
  assetsPath = '/chat-widget' 
}) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: widgetTheme.layout.launcher.bottom,
      right: widgetTheme.layout.launcher.right,
      zIndex: widgetTheme.zIndex.launcher,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: widgetTheme.spacing.sm,
    }}>
      {/* Helper pill - only shown when closed */}
      {!isOpen && (
        <button
          onClick={onClick}
          style={{
            backgroundColor: widgetTheme.colors.background.main,
            color: widgetTheme.colors.text.primary,
            border: `1px solid ${widgetTheme.colors.border.default}`,
            borderRadius: widgetTheme.borderRadius.full,
            padding: `${widgetTheme.spacing.sm} ${widgetTheme.spacing.lg}`,
            fontSize: widgetTheme.typography.fontSize.sm,
            fontWeight: widgetTheme.typography.fontWeight.medium,
            cursor: 'pointer',
            boxShadow: widgetTheme.shadows.lg,
            transition: `all ${widgetTheme.animation.fast}`,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = widgetTheme.shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = widgetTheme.shadows.lg;
          }}
          aria-label="Open chat"
        >
          Need help?
        </button>
      )}
      
      {/* Main launcher button */}
      <button
        onClick={onClick}
        style={{
          width: widgetTheme.layout.launcher.size,
          height: widgetTheme.layout.launcher.size,
          borderRadius: widgetTheme.borderRadius.full,
          backgroundColor: widgetTheme.colors.primary,
          border: 'none',
          cursor: 'pointer',
          boxShadow: widgetTheme.shadows.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${widgetTheme.animation.fast}`,
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = widgetTheme.colors.primaryHover;
          e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.05)' : 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = widgetTheme.colors.primary;
          e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'scale(1)';
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <span style={{
            color: widgetTheme.colors.text.inverse,
            fontSize: widgetTheme.typography.fontSize.xl,
            fontWeight: widgetTheme.typography.fontWeight.bold,
            lineHeight: 1,
          }}>
            ✕
          </span>
        ) : (
          <img 
            src={`${assetsPath}/chat-bubble.svg`} 
            alt="Chat" 
            style={{ width: '28px', height: '28px' }}
          />
        )}
      </button>
    </div>
  );
};
