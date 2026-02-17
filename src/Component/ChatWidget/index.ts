// ChatWidget/index.ts - Main export
export { default as EdenChatWidget } from './EdenChatWidget';
// Apply theme variables on import
import './setupTheme'
import './widget-styles.css'
export { widgetTheme } from './theme';
export type { WidgetTheme } from './theme';
export type { Message } from './ChatMessage';
