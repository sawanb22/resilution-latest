// ChatHeader.tsx - Header with status, title, and action buttons
import React from 'react';
import { widgetTheme } from './theme';

interface ChatHeaderProps {
  isConnected: boolean;
  isMobile: boolean;
  isFullscreen: boolean;
  onNewChat: () => void;
  onToggleFullscreen: () => void;
  assetsPath?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isConnected,
  isMobile,
  isFullscreen,
  onNewChat,
  onToggleFullscreen,
  assetsPath = '/chat-widget',
}) => {
  return (
    <header style={{
      backgroundColor: widgetTheme.colors.background.main,
      borderBottom: `1px solid ${widgetTheme.colors.border.default}`,
      padding: `${widgetTheme.spacing.md} ${widgetTheme.spacing.lg}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: widgetTheme.spacing.lg,
      }}>
        {/* Left side: Status + Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: widgetTheme.spacing.md,
          minWidth: 0,
          flex: 1,
        }}>
          {/* Status indicator */}
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: widgetTheme.borderRadius.full,
              backgroundColor: isConnected 
                ? widgetTheme.colors.status.online 
                : widgetTheme.colors.status.offline,
              flexShrink: 0,
            }}
            aria-label={isConnected ? 'Connected' : 'Disconnected'}
          />
          
          {/* Title */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: widgetTheme.typography.fontSize.base,
              fontWeight: widgetTheme.typography.fontWeight.semibold,
              color: widgetTheme.colors.text.primary,
              lineHeight: widgetTheme.typography.lineHeight.tight,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              EDEN
            </div>
            <div style={{
              fontSize: widgetTheme.typography.fontSize.xs,
              color: widgetTheme.colors.text.secondary,
              lineHeight: widgetTheme.typography.lineHeight.tight,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {isConnected ? 'Always-on assistant' : 'Connecting...'}
            </div>
          </div>
        </div>
        
        {/* Right side: Action buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: widgetTheme.spacing.sm,
          flexShrink: 0,
        }}>
          {/* New Chat button */}
          <button
            onClick={onNewChat}
            style={{
              backgroundColor: widgetTheme.colors.primary,
              color: widgetTheme.colors.text.inverse,
              border: 'none',
              borderRadius: widgetTheme.borderRadius.md,
              padding: `${widgetTheme.spacing.sm} ${widgetTheme.spacing.md}`,
              fontSize: widgetTheme.typography.fontSize.sm,
              fontWeight: widgetTheme.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: `background-color ${widgetTheme.animation.fast}`,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primary;
            }}
          >
            New Chat
          </button>
          
          {/* Fullscreen toggle - hidden on mobile */}
          {!isMobile && (
            <button
              onClick={onToggleFullscreen}
              style={{
                width: '40px',
                height: '40px',
                border: `1px solid ${widgetTheme.colors.border.default}`,
                borderRadius: widgetTheme.borderRadius.md,
                backgroundColor: widgetTheme.colors.background.main,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all ${widgetTheme.animation.fast}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = widgetTheme.colors.background.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = widgetTheme.colors.background.main;
              }}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <img 
                src={`${assetsPath}/fullscreen.svg`} 
                alt="Fullscreen" 
                style={{ width: '16px', height: '16px' }}
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
