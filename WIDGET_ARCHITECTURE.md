# Eden Chat Widget - Fresh Implementation

## 🎯 Overview
Complete rewrite of the Eden chat widget following **React + Socket.IO best practices** and the middleware specification. Built with:
- **Modular UI components** (separated design tokens and structure)
- **Clean Socket.IO integration** (proper event handling, heartbeat, reconnection)
- **Safe storage** (localStorage with memory fallback for incognito mode)
- **Middleware-compliant** (follows session lifecycle and event specifications)

---

## 📁 Project Structure

```
src/Component/ChatWidget/
├── EdenChatWidget.tsx      # Main widget component (Socket.IO logic)
├── index.ts                # Public exports
├── theme.ts                # Design tokens (colors, spacing, typography)
├── storage.ts              # Safe localStorage wrapper
├── ChatLauncher.tsx        # Floating button component
├── ChatHeader.tsx          # Header with status and actions
├── ChatMessage.tsx         # Message bubble + typing indicator
├── ContactForm.tsx         # Onboarding form overlay
└── ChatInput.tsx           # Message input footer
```

### **Component Breakdown**

| File | Purpose | Responsibilities |
|------|---------|------------------|
| `theme.ts` | Design system | All colors, spacing, typography, shadows, layout dimensions |
| `storage.ts` | Data persistence | Visitor ID, session ID, form completion flags with safe fallback |
| `EdenChatWidget.tsx` | Main logic | Socket.IO connection, event handling, state management |
| `ChatLauncher.tsx` | UI - Launcher | Floating button + "Need help?" pill |
| `ChatHeader.tsx` | UI - Header | Status indicator, title, New Chat + Fullscreen buttons |
| `ChatMessage.tsx` | UI - Messages | Message bubbles (USER/BOT) + typing indicator |
| `ContactForm.tsx` | UI - Form | Onboarding form (name, email, role) |
| `ChatInput.tsx` | UI - Footer | Message input + Send + End Chat buttons |

---

## 🔌 Socket.IO Integration

### **Connection Flow**
1. Widget opens → Connect to middleware with `auth: { visitorId, sessionId? }`
2. Backend emits `session` → Save session ID to storage
3. Backend emits `history` → Render messages or show contact form if empty
4. Form submission → Wait for `session`, then emit `message` with form data
5. User messages → Emit `message` with `{ sessionId, content }`
6. Backend responses → Listen for `message` events and render
7. End chat → Emit `endSession` → Backend emits `sessionClosed` → Clear storage

### **Event Handlers**

| Event | Direction | Payload | Purpose |
|-------|-----------|---------|---------|
| `connect` | ← Server | - | Connection established |
| `disconnect` | ← Server | `reason: string` | Connection lost |
| `connect_error` | ← Server | `error: any` | Connection failed |
| `session` | ← Server | `{ sessionId: string }` | Session created/restored |
| `history` | ← Server | `Message[]` | Load previous messages |
| `message` | ↔ Both | `{ sessionId, content, sender, ... }` | Send/receive messages |
| `status` | ← Server | `{ status: string }` | Session status update |
| `sessionClosed` | ← Server | `{ sessionId: string }` | Session ended by backend |
| `error` | ← Server | `{ message: string }` | Error from backend |
| `heartbeat` | → Server | `{ sessionId: string }` | Keep session alive |
| `endSession` | → Server | `{ sessionId: string }` | End chat explicitly |

### **Heartbeat System**
- **Purpose**: Keep session alive and prevent backend from marking it INACTIVE
- **Frequency**: 25 seconds (configurable via `heartbeatInterval` prop)
- **Behavior**: 
  - Starts on `connect`
  - Stops on `disconnect` or session closed
  - Only emits if socket is connected and session ID exists

---

## 💾 Storage System

### **Safe Wrapper**
- Detects if `localStorage` is available (fails in incognito/third-party contexts)
- Falls back to in-memory storage if blocked
- Logs warnings but never throws errors

### **Storage Keys**
| Key | Purpose | Persistence |
|-----|---------|-------------|
| `pixel_visitor_id` | Unique visitor identifier | Permanent (cross-session) |
| `pixel_session_id` | Current chat session | Until session ends |
| `pixel_form_done_<sessionId>` | Form completion flag | Per session |

### **API**
```typescript
getVisitorId(): string           // Get or create visitor ID
getSessionId(): string | null    // Get current session ID
setSessionId(id: string): void   // Save session ID
clearSessionId(): void           // Remove session ID
isFormDone(sessionId): boolean   // Check if form completed
markFormDone(sessionId): void    // Mark form as done
```

---

## 🎨 Design System (`theme.ts`)

### **Color Palette**
```typescript
colors: {
  primary: '#6366f1',              // Brand indigo
  primaryHover: '#4f46e5',         // Hover state
  background: { main, secondary, overlay },
  text: { primary, secondary, tertiary, inverse },
  message: { user: { bg, text }, bot: { bg, text } },
  border: { default, accent, error },
  status: { online: green, offline: red, typing: gray }
}
```

### **Typography Scale**
```typescript
fontSize: { xs: 12px, sm: 14px, base: 16px, lg: 18px, xl: 20px }
fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 }
lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 }
```

### **Spacing Scale**
```typescript
spacing: { xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px, xxl: 32px }
```

### **Layout Dimensions**
```typescript
launcher: { size: '56px', bottom: '24px', right: '24px' }
window: { width: '400px', height: '600px', borderRadius: '16px' }
fullscreen: { maxWidth: '800px', height: '90vh' }
```

---

## 🚀 Usage

### **Installation**
```bash
npm install socket.io-client
```

### **Integration**
```tsx
import { EdenChatWidget } from './Component/ChatWidget';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <EdenChatWidget
        middlewareUrl="https://pp-chat-backend-850632565452.asia-south1.run.app"
        assetsPath="/chat-widget"
        initialOpen={false}
        heartbeatInterval={25000}
      />
    </div>
  );
}
```

### **Props**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `middlewareUrl` | `string` | ✅ Yes | - | Middleware backend URL |
| `assetsPath` | `string` | No | `'/chat-widget'` | Path to SVG assets |
| `initialOpen` | `boolean` | No | `false` | Start with widget open |
| `heartbeatInterval` | `number` | No | `25000` | Heartbeat frequency (ms) |

### **Required Assets**
Place these SVG files in `/public/chat-widget/`:
- `chat-bubble.svg` - Launcher icon
- `fullscreen.svg` - Fullscreen toggle icon

---

## 🔄 Session Lifecycle

### **Creation**
1. User opens widget
2. Frontend connects with `visitorId` (and `sessionId` if exists)
3. Backend creates new session or restores existing
4. Backend emits `session` event with session ID
5. Frontend saves to `localStorage` as `pixel_session_id`

### **Persistence**
- Session ID stored in `localStorage` (domain-scoped)
- Survives page reloads
- Reused when same browser/domain reconnects
- Falls back to memory in incognito (ephemeral)

### **Reset**
**Explicit (user action):**
- User clicks "End Chat" → emit `endSession`
- Backend marks session CLOSED → emits `sessionClosed`
- Frontend clears storage and reconnects for new session

**Automatic (backend timeout):**
- No activity for `HEARTBEAT_TIMEOUT_SECONDS` (60s) → marked INACTIVE
- No activity for `SESSION_CLOSE_MINUTES` (2 min) → marked CLOSED
- Backend emits `status: CLOSED` or stops accepting messages

---

## 🧪 Testing Checklist

### **Connection**
- [ ] Open widget → see "Connected" status
- [ ] Check console logs for session ID
- [ ] Verify `pixel_session_id` in localStorage

### **Contact Form**
- [ ] Form shows on first open (no history)
- [ ] Submit form → see USER message with form data
- [ ] Form hidden after submission
- [ ] Form completion flag saved: `pixel_form_done_<sessionId>`

### **Messaging**
- [ ] Type message → click Send → see USER message immediately
- [ ] Typing indicator shows after sending
- [ ] BOT response appears after backend processes
- [ ] Typing indicator hides when BOT responds
- [ ] URLs in messages become clickable links

### **Session Persistence**
- [ ] Send message → refresh page → see message history
- [ ] Same session ID after reload (check localStorage)
- [ ] Form doesn't reappear if already completed

### **Heartbeat**
- [ ] Console shows heartbeat logs every 25s
- [ ] Session stays ACTIVE in backend
- [ ] Heartbeat stops when widget closed or disconnected

### **End Chat**
- [ ] Click "End Chat" → session closed
- [ ] Storage cleared (`pixel_session_id` removed)
- [ ] Widget closes
- [ ] Reopen → new session created, form shows

### **New Chat**
- [ ] Click "New Chat" → old session ended
- [ ] Messages cleared
- [ ] Form reappears
- [ ] New session ID assigned

### **Error Handling**
- [ ] Disconnect internet → see "Disconnected" status
- [ ] Reconnect → socket reconnects automatically
- [ ] Backend error → see error message in chat

### **Mobile Behavior**
- [ ] Open on mobile → forced to fullscreen
- [ ] Fullscreen toggle button hidden on mobile
- [ ] Touch interactions work smoothly

### **Incognito Mode**
- [ ] Open in incognito → no localStorage errors
- [ ] Session works but ephemeral (cleared on close)
- [ ] Console shows "using memory fallback" warning

---

## 📊 Console Logs

### **Connection**
```
[EdenWidget] Connecting to middleware... { middlewareUrl, visitorId, sessionId }
[EdenWidget] ✅ Connected to middleware
[EdenWidget] 📋 Session received: <uuid>
[EdenWidget] 📜 History received: N messages
```

### **Heartbeat**
```
[EdenWidget] 💓 Starting heartbeat every 25000 ms
[EdenWidget] 💓 Heartbeat sent
```

### **Messages**
```
[EdenWidget] 📤 Sending message: <content>
[EdenWidget] 💬 Message received: USER <content>
[EdenWidget] 💬 Message received: BOT <content>
```

### **Session Management**
```
[EdenWidget] 🔚 Ending chat session: <sessionId>
[EdenWidget] 🔒 Session closed: <sessionId>
[EdenWidget] 🆕 Starting new chat
```

---

## 🎯 Middleware Compliance

This implementation follows the middleware specification:

✅ **Storage**: Uses `pixel_*` key naming convention  
✅ **Connection**: Sends `visitorId` and `sessionId` in auth  
✅ **Events**: Implements all required emit and listen events  
✅ **Heartbeat**: Sends periodic heartbeat (25s default)  
✅ **Form**: Waits for `session` before sending form message  
✅ **History**: Shows form only if `history.length === 0`  
✅ **Typing**: Shows indicator after USER echo, hides after BOT  
✅ **Session Lifecycle**: Handles CLOSED status and sessionClosed event  
✅ **Reconnection**: Auto-reconnects up to 5 attempts  
✅ **Error Handling**: Catches all error events and displays gracefully  

---

## 🔧 Customization

### **Change Brand Color**
Edit `src/Component/ChatWidget/theme.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  primaryHover: '#YOUR_HOVER_COLOR',
  // ...
}
```

### **Adjust Layout Dimensions**
```typescript
layout: {
  window: {
    width: '450px',    // Wider window
    height: '650px',   // Taller window
  }
}
```

### **Modify Heartbeat Frequency**
```tsx
<EdenChatWidget
  heartbeatInterval={30000}  // 30 seconds
  // ...
/>
```

### **Change Storage Keys**
Edit `src/Component/ChatWidget/storage.ts`:
```typescript
const KEYS = {
  VISITOR_ID: 'your_visitor_id',
  SESSION_ID: 'your_session_id',
  // ...
};
```

---

## 📦 Bundle Size

| Component | Lines | Purpose |
|-----------|-------|---------|
| EdenChatWidget.tsx | ~370 | Main logic + Socket.IO |
| theme.ts | ~130 | Design tokens |
| storage.ts | ~90 | Safe storage wrapper |
| ChatMessage.tsx | ~120 | Message rendering |
| ContactForm.tsx | ~230 | Onboarding form |
| ChatHeader.tsx | ~130 | Header component |
| ChatInput.tsx | ~130 | Input footer |
| ChatLauncher.tsx | ~100 | Floating button |
| **Total** | **~1,300 lines** | **Complete widget** |

---

## 🐛 Troubleshooting

### **"Not connected" error**
- Check `middlewareUrl` prop is correct
- Verify backend is running and accessible
- Check browser console for connection errors
- Ensure CORS is configured on backend

### **Form reappears after submission**
- Check `pixel_form_done_<sessionId>` in localStorage
- Verify `markFormDone()` is called after form submit
- Check if session ID exists when form submitted

### **Heartbeat not working**
- Verify socket is connected (`isConnected === true`)
- Check console for heartbeat logs
- Ensure `heartbeatInterval` is set correctly
- Verify backend accepts `heartbeat` event

### **Messages not showing**
- Check `message` event listener is registered
- Verify message format from backend matches spec
- Look for errors in console
- Check if `sender` field is 'USER' or 'BOT'

### **Session not persisting**
- Check if localStorage is available (not blocked)
- Verify `pixel_session_id` exists in storage
- Check if backend is sending `session` event
- Look for `[EdenWidget] Saved session ID` log

---

## 🚀 Deployment

1. **Build assets**: `npm run build`
2. **Ensure assets**: Copy `chat-bubble.svg` and `fullscreen.svg` to `/public/chat-widget/`
3. **Set middleware URL**: Update `middlewareUrl` prop to production backend
4. **Test in production**: Verify WebSocket connection works (not blocked by CORS/firewall)
5. **Monitor logs**: Check browser console for connection and heartbeat logs

---

## 📝 Migration from Old Widget

The old widget (`EdenChatWidget.tsx`) has been backed up as `EdenChatWidget_old.tsx`. Key differences:

| Old Widget | New Widget |
|------------|------------|
| HTTP fetch with `/api/eden` | Socket.IO with middleware URL |
| Predefined preview responses | Real server responses only |
| Inactivity timers | Heartbeat system |
| Complex preview logic | Simple message flow |
| Mixed concerns | Modular components |
| Inline styles scattered | Centralized theme file |
| Unsafe storage | Safe fallback wrapper |

**To use new widget**: Already integrated in `App.jsx` ✅

---

## 📄 License

Part of the Resilution project.
